import { Controller, Post, Body, Headers, RawBodyRequest, Req, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  // Criar checkout session
  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: { 
    userId: number; 
    planType: 'EXPLORER' | 'MASTER';
    billingCycle: 'monthly' | 'yearly';
  }) {
    const { userId, planType, billingCycle } = body;
    return await this.stripeService.createCheckoutSession(userId, planType, billingCycle);
  }

  // Webhook do Stripe
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    if (!req.rawBody) {
      throw new Error('Raw body is required for webhook');
    }
    return await this.stripeService.handleWebhook(signature, req.rawBody);
  }

  // Cancelar subscription
  @Post('cancel-subscription')
  async cancelSubscription(@Body() body: { userId: number }) {
    return await this.stripeService.cancelSubscription(body.userId);
  }

  // Buscar subscription do usuário
  @Get('subscription/:userId')
  async getUserSubscription(@Param('userId') userId: string) {
    return await this.stripeService.getUserSubscription(parseInt(userId));
  }

  // Endpoint para testar os Price IDs
  @Get('test-prices')
  async testPrices() {
    return {
      explorerMonthly: process.env.STRIPE_EXPLORER_MONTHLY_PRICE_ID,
      explorerYearly: process.env.STRIPE_EXPLORER_YEARLY_PRICE_ID,
      masterMonthly: process.env.STRIPE_MASTER_MONTHLY_PRICE_ID,
      masterYearly: process.env.STRIPE_MASTER_YEARLY_PRICE_ID,
    };
  }
}