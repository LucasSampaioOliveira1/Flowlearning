import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { PlanService } from '../plan/plan.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private planService: PlanService,
  ) {
    const stripeKey = configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }
    
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16', // Versão compatível
    });
  }

  // Helper para obter Price ID baseado no plano e ciclo
  private getPriceId(planType: 'EXPLORER' | 'MASTER', billingCycle: 'monthly' | 'yearly'): string {
    const priceMap = {
      'EXPLORER': {
        'monthly': this.configService.get('STRIPE_EXPLORER_MONTHLY_PRICE_ID'),
        'yearly': this.configService.get('STRIPE_EXPLORER_YEARLY_PRICE_ID'),
      },
      'MASTER': {
        'monthly': this.configService.get('STRIPE_MASTER_MONTHLY_PRICE_ID'),
        'yearly': this.configService.get('STRIPE_MASTER_YEARLY_PRICE_ID'),
      }
    };

    return priceMap[planType][billingCycle];
  }

  // Criar sessão de checkout
  async createCheckoutSession(
    userId: number, 
    planType: 'EXPLORER' | 'MASTER',
    billingCycle: 'monthly' | 'yearly'
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const priceId = this.getPriceId(planType, billingCycle);
    
    if (!priceId) {
      throw new Error('Price ID não encontrado para este plano');
    }

    // Criar ou obter customer no Stripe
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId.toString(),
        },
      });
      
      customerId = customer.id;
      
      // Salvar customer ID no banco
      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
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
      success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/pricing`,
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
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
        
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
        
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
        
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }

  // Checkout completado
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    if (!session.metadata) {
      console.error('Missing metadata in checkout session');
      return;
    }

    const userId = parseInt(session.metadata.userId);
    const planType = session.metadata.planType as 'EXPLORER' | 'MASTER';
    const billingCycle = session.metadata.billingCycle as 'monthly' | 'yearly';
    
    if (!userId || !planType) {
      console.error('Missing metadata in checkout session');
      return;
    }

    // Buscar a subscription criada
    const subscription = await this.stripe.subscriptions.retrieve(session.subscription as string);
    
    // Calcular data de expiração baseada no ciclo
    const expiryDate = new Date(subscription.current_period_end * 1000);

    // Atualizar plano do usuário
    await this.planService.upgradePlan(userId, planType, expiryDate);

    // Salvar subscription no banco
    await this.prisma.subscription.create({
      data: {
        stripeSubscriptionId: subscription.id,
        plan: planType,
        status: 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        userId,
      },
    });

    console.log(`✅ Usuário ${userId} upgraded para ${planType} (${billingCycle})`);
  }

  // Pagamento bem-sucedido (renovação)
  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscription = await this.stripe.subscriptions.retrieve(invoice.subscription as string);
    
    const dbSubscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
      include: { user: true },
    });

    if (dbSubscription) {
      // Atualizar período da subscription
      await this.prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          status: 'ACTIVE',
        },
      });

      // Renovar plano do usuário
      const expiryDate = new Date(subscription.current_period_end * 1000);
      await this.planService.upgradePlan(dbSubscription.userId, dbSubscription.plan, expiryDate);

      console.log(`✅ Subscription ${subscription.id} renovada`);
    }
  }

  // Subscription atualizada
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const dbSubscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (dbSubscription) {
      await this.prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status: subscription.status.toUpperCase() as any,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });

      console.log(`✅ Subscription ${subscription.id} atualizada`);
    }
  }

  // Subscription cancelada
  private async handleSubscriptionCanceled(subscription: Stripe.Subscription) {
    const dbSubscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (dbSubscription) {
      // Voltar usuário para FREE
      await this.planService.upgradePlan(dbSubscription.userId, 'FREE');
      
      // Atualizar status da subscription
      await this.prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status: 'CANCELED',
        },
      });

      console.log(`❌ Subscription ${subscription.id} cancelada - usuário voltou para FREE`);
    }
  }

  // Cancelar subscription
  async cancelSubscription(userId: number) {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
    });

    if (!subscription) {
      throw new Error('Subscription ativa não encontrada');
    }

    // Cancelar no Stripe (no final do período)
    await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Atualizar no banco
    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.stripeSubscriptionId },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    return { message: 'Subscription será cancelada no final do período' };
  }

  // Buscar subscription ativa do usuário
  async getUserSubscription(userId: number) {
    return await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
    });
  }
}