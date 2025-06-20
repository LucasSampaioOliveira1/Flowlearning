import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PlanService } from '../plan/plan.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PlanAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private planService: PlanService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.get<string>('feature', context.getHandler());
    
    if (!requiredFeature) {
      return true; // Se não tem restrição, libera acesso
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const hasAccess = await this.planService.hasAccess(user.id, requiredFeature);

    if (!hasAccess) {
      throw new ForbiddenException(`Recurso disponível apenas para planos premium`);
    }

    return true;
  }
}

// Decorator para marcar features que precisam de plano específico
export const RequireFeature = (feature: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('feature', feature, descriptor.value);
  };
};