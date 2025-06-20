import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { StripeResolver } from './stripe.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanModule } from '../plan/plan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    PlanModule,
  ],
  providers: [StripeService, StripeResolver],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}