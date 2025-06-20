import { Controller, Get, Param } from '@nestjs/common';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) {}

  // Endpoint para testar acesso a features
  @Get('test-access/:userId/:feature')
  async testAccess(
    @Param('userId') userId: string,
    @Param('feature') feature: string
  ) {
    const hasAccess = await this.planService.hasAccess(parseInt(userId), feature);
    const limit = await this.planService.getFeatureLimit(parseInt(userId), feature);
    
    return {
      userId: parseInt(userId),
      feature,
      hasAccess,
      limit: limit === -1 ? 'unlimited' : limit,
    };
  }

  // Endpoint para testar acesso a unidades
  @Get('test-unit-access/:userId/:unitId')
  async testUnitAccess(
    @Param('userId') userId: string,
    @Param('unitId') unitId: string
  ) {
    const canAccess = await this.planService.canAccessUnit(parseInt(userId), parseInt(unitId));
    
    return {
      userId: parseInt(userId),
      unitId: parseInt(unitId),
      canAccess,
    };
  }

  // Endpoint para verificar limite de XP
  @Get('test-xp/:userId/:xpAmount')
  async testXPLimit(
    @Param('userId') userId: string,
    @Param('xpAmount') xpAmount: string
  ) {
    const canEarn = await this.planService.canEarnXP(parseInt(userId), parseInt(xpAmount));
    
    return {
      userId: parseInt(userId),
      xpAmount: parseInt(xpAmount),
      canEarn,
    };
  }

  // Endpoint para listar todos os usuários e seus planos
  @Get('users')
  async listUsers() {
    return await this.planService.getAllUsersWithPlans();
  }

  // Endpoint para debug - listar todas as unidades
  @Get('debug/units')
  async debugUnits() {
    const units = await this.planService.getAllUnits();
    return units;
  }

  // Endpoint para debug - verificar user e unit específicos
  @Get('debug/user-unit/:userId/:unitId')
  async debugUserUnit(
    @Param('userId') userId: string,
    @Param('unitId') unitId: string
  ) {
    return await this.planService.debugUserUnit(parseInt(userId), parseInt(unitId));
  }
}