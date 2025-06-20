import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StripeService } from './stripe.service';

@Resolver()
export class StripeResolver {
  constructor(private stripeService: StripeService) {}

  @Mutation(() => String)
  async createCheckoutSession(
    @Args('userId') userId: number,
    @Args('planType') planType: string,
    @Args('billingCycle') billingCycle: string,
  ): Promise<string> {
    const validPlanTypes = ['EXPLORER', 'MASTER'];
    const validBillingCycles = ['monthly', 'yearly'];

    if (!validPlanTypes.includes(planType)) {
      throw new Error('Tipo de plano inválido. Use: EXPLORER ou MASTER');
    }

    if (!validBillingCycles.includes(billingCycle)) {
      throw new Error('Ciclo de cobrança inválido. Use: monthly ou yearly');
    }

    const result = await this.stripeService.createCheckoutSession(
      userId,
      planType as 'EXPLORER' | 'MASTER',
      billingCycle as 'monthly' | 'yearly'
    );

    if (!result.url) {
      throw new Error('Falha ao criar sessão de checkout no Stripe');
    }

    return result.url;
  }

  @Query(() => String)
  async testStripeConnection(): Promise<string> {
    return 'Stripe conectado com sucesso! ✅';
  }

  @Query(() => String)
  async getStripeConfig(): Promise<string> {
    const config = {
      explorerMonthly: process.env.STRIPE_EXPLORER_MONTHLY_PRICE_ID ? '✅' : '❌',
      explorerYearly: process.env.STRIPE_EXPLORER_YEARLY_PRICE_ID ? '✅' : '❌',
      masterMonthly: process.env.STRIPE_MASTER_MONTHLY_PRICE_ID ? '✅' : '❌',
      masterYearly: process.env.STRIPE_MASTER_YEARLY_PRICE_ID ? '✅' : '❌',
    };

    return `Price IDs configurados: 
Explorer Mensal: ${config.explorerMonthly}
Explorer Anual: ${config.explorerYearly}
Master Mensal: ${config.masterMonthly}
Master Anual: ${config.masterYearly}`;
  }

  @Mutation(() => String)
  async createCheckoutSessionDetailed(
    @Args('userId') userId: number,
    @Args('planType') planType: string,
    @Args('billingCycle') billingCycle: string,
  ): Promise<string> {
    const validPlanTypes = ['EXPLORER', 'MASTER'];
    const validBillingCycles = ['monthly', 'yearly'];

    if (!validPlanTypes.includes(planType)) {
      throw new Error('Tipo de plano inválido. Use: EXPLORER ou MASTER');
    }

    if (!validBillingCycles.includes(billingCycle)) {
      throw new Error('Ciclo de cobrança inválido. Use: monthly ou yearly');
    }

    try {
      const result = await this.stripeService.createCheckoutSession(
        userId,
        planType as 'EXPLORER' | 'MASTER',
        billingCycle as 'monthly' | 'yearly'
      );

      if (!result.url) {
        throw new Error('URL do checkout não foi gerada');
      }

      return JSON.stringify({
        success: true,
        url: result.url,
        sessionId: result.sessionId,
        priceId: result.priceId,
        planType: result.planType,
        billingCycle: result.billingCycle,
        message: 'Checkout criado com sucesso! Copie a URL para acessar.'
      }, null, 2);

    } catch (error) {
      return JSON.stringify({
        success: false,
        error: error.message,
        message: 'Falha ao criar checkout'
      }, null, 2);
    }
  }
}