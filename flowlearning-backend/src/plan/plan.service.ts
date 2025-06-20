import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlanType } from '@prisma/client';

@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  // Verificar se usuário tem acesso a uma feature
  async hasAccess(userId: number, feature: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return false;

    // Verificar se o plano ainda está válido
    if (user.plan !== 'FREE' && user.planExpiry && user.planExpiry < new Date()) {
      // Plano expirado, voltar para FREE
      await this.prisma.user.update({
        where: { id: userId },
        data: { plan: 'FREE', planExpiry: null }
      });
      user.plan = 'FREE';
    }

    const planFeature = await this.prisma.planFeature.findUnique({
      where: {
        plan_feature: {
          plan: user.plan,
          feature: feature
        }
      }
    });

    return planFeature ? planFeature.value === 'true' : false;
  }

  // Obter limite de uma feature por plano
  async getFeatureLimit(userId: number, feature: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return 0;

    const planFeature = await this.prisma.planFeature.findUnique({
      where: {
        plan_feature: {
          plan: user.plan,
          feature: feature
        }
      }
    });

    if (!planFeature) return 0;
    
    if (planFeature.value === 'unlimited') return -1; // -1 = ilimitado
    
    return parseInt(planFeature.value) || 0;
  }

  // Verificar acesso a unidade
  async canAccessUnit(userId: number, unitId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
    });

    if (!user || !unit) return false;

    // Verificar hierarquia de planos
    const planHierarchy = {
      'FREE': 0,
      'EXPLORER': 1,
      'MASTER': 2
    };

    return planHierarchy[user.plan] >= planHierarchy[unit.requiredPlan];
  }

  // Verificar limite diário de XP
  async canEarnXP(userId: number, xpAmount: number): Promise<boolean> {
    const dailyXpLimit = await this.getFeatureLimit(userId, 'max_daily_xp');
    
    if (dailyXpLimit === -1) return true; // Ilimitado
    
    // Calcular XP ganho hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayXP = await this.prisma.userProgress.aggregate({
      where: {
        userId: userId,
        completedAt: {
          gte: today
        }
      },
      _sum: {
        xpEarned: true
      }
    });

    const currentDailyXP = todayXP._sum.xpEarned || 0;
    
    return (currentDailyXP + xpAmount) <= dailyXpLimit;
  }

  // Atualizar plano do usuário
  async upgradePlan(userId: number, newPlan: PlanType, expiryDate?: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        plan: newPlan,
        planExpiry: expiryDate,
        hearts: newPlan === 'MASTER' ? 999 : newPlan === 'EXPLORER' ? 5 : 3
      }
    });
  }

  // Listar todos os usuários (para testes)
  async getAllUsersWithPlans() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        planExpiry: true,
        hearts: true,
        totalXp: true,
      }
    });
  }

  // Debug - listar todas as unidades
  async getAllUnits() {
    return await this.prisma.unit.findMany({
      select: {
        id: true,
        title: true,
        requiredPlan: true,
        order: true,
        isActive: true
      },
      orderBy: {
        order: 'asc'
      }
    });
  }

  // Debug - verificar user e unit específicos
  async debugUserUnit(userId: number, unitId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        plan: true,
        planExpiry: true
      }
    });

    const unit = await this.prisma.unit.findUnique({
      where: { id: unitId },
      select: {
        id: true,
        title: true,
        requiredPlan: true,
        order: true,
        isActive: true
      }
    });

    return {
      user,
      unit,
      exists: {
        user: !!user,
        unit: !!unit
      }
    };
  }
}