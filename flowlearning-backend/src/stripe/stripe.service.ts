import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { UserPlan } from '@prisma/client';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY não está configurado no .env');
    }
    
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });
  }

  // Criar sessão de checkout para assinatura
  async createCheckoutSession(
    userId: number,
    planType: 'EXPLORER' | 'MASTER',
    billingCycle: 'monthly' | 'yearly'
  ) {
    this.logger.log(`Criando sessão de checkout - User: ${userId}, Plan: ${planType}, Cycle: ${billingCycle}`);

    // Obter price ID baseado no plano e ciclo
    const priceId = this.getPriceId(planType, billingCycle);
    this.logger.log(`Price ID obtido: ${priceId}`);

    // Buscar usuário no banco
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Criar ou buscar customer no Stripe
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      this.logger.log(`Criando customer no Stripe para usuário ${userId}`);
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId.toString(),
        },
      });
      
      customerId = customer.id;

      // Atualizar usuário com customer ID
      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId }
      });
    }

    // Criar sessão de checkout
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get('FRONTEND_URL')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/payment-cancelled`,
      metadata: {
        userId: userId.toString(),
        planType,
        billingCycle,
      },
      subscription_data: {
        metadata: {
          userId: userId.toString(),
          planType,
          billingCycle,
        },
      },
    });

    return {
      sessionId: session.id,
      url: session.url,
      priceId,
      planType,
      billingCycle
    };
  }

  // Processar webhook do Stripe
  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET não configurado');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    this.logger.log(`Webhook recebido: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionCancelled(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        this.logger.log(`Evento não tratado: ${event.type}`);
    }

    return { received: true };
  }

  // Processar checkout completado
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    this.logger.log(`Processando checkout completado: ${session.id}`);

    const userId = parseInt(session.metadata?.userId || '0');
    const planType = session.metadata?.planType as UserPlan;
    const billingCycle = session.metadata?.billingCycle;

    if (!userId || !planType) {
      this.logger.error('Metadata do checkout incompleto');
      return;
    }

    // Calcular data de expiração
    const now = new Date();
    const planExpiry = new Date(now);
    if (billingCycle === 'yearly') {
      planExpiry.setFullYear(planExpiry.getFullYear() + 1);
    } else {
      planExpiry.setMonth(planExpiry.getMonth() + 1);
    }

    // Atualizar usuário
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: planType,
        planExpiry: planExpiry,
      }
    });

    // Criar registro de assinatura
    if (session.subscription) {
      await this.prisma.subscription.create({
        data: {
          userId: userId,
          stripeSubscriptionId: session.subscription as string,
          stripePriceId: session.display_items?.[0]?.price?.id || '',
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: planExpiry,
        }
      });
    }

    this.logger.log(`Usuário ${userId} atualizado para plano ${planType}`);
  }

  // Processar assinatura atualizada
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    this.logger.log(`Processando assinatura atualizada: ${subscription.id}`);

    const userId = parseInt(subscription.metadata?.userId || '0');
    
    if (!userId) {
      this.logger.error('userId não encontrado na assinatura');
      return;
    }

    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status.toUpperCase() as any,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    });
  }

  // Processar assinatura cancelada
  private async handleSubscriptionCancelled(subscription: Stripe.Subscription) {
    this.logger.log(`Processando cancelamento: ${subscription.id}`);

    const userId = parseInt(subscription.metadata?.userId || '0');
    
    if (!userId) {
      this.logger.error('userId não encontrado na assinatura');
      return;
    }

    // Atualizar usuário para plano FREE
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: UserPlan.FREE,
        planExpiry: null,
      }
    });

    // Atualizar assinatura
    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'CANCELLED',
      }
    });

    this.logger.log(`Usuário ${userId} retornado ao plano FREE`);
  }

  // Processar falha no pagamento
  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    this.logger.log(`Processando falha no pagamento: ${invoice.id}`);
    
    if (invoice.subscription) {
      await this.prisma.subscription.update({
        where: { stripeSubscriptionId: invoice.subscription as string },
        data: {
          status: 'PAST_DUE',
        }
      });
    }
  }

  // Obter price ID baseado no plano
  private getPriceId(planType: 'EXPLORER' | 'MASTER', billingCycle: 'monthly' | 'yearly'): string {
    const envKey = `STRIPE_${planType}_${billingCycle.toUpperCase()}_PRICE_ID`;
    const priceId = this.configService.get<string>(envKey);
    
    if (!priceId) {
      throw new Error(`Price ID não configurado para ${planType} ${billingCycle}: ${envKey}`);
    }
    
    return priceId;
  }

  // Método para cancelar assinatura
  async cancelSubscription(userId: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: 'ACTIVE'
      }
    });

    if (!subscription) {
      throw new Error('Assinatura ativa não encontrada');
    }

    await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });

    return { message: 'Assinatura será cancelada no final do período atual' };
  }

  // Obter detalhes da assinatura
  async getSubscriptionDetails(userId: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: 'ACTIVE'
      }
    });

    if (!subscription) {
      return null;
    }

    const stripeSubscription = await this.stripe.subscriptions.retrieve(
      subscription.stripeSubscriptionId
    );

    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    };
  }
}