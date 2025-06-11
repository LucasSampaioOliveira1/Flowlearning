import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginInput, RegisterInput, AuthResponse } from './dto/auth.types';
import { User } from './dto/user.types'; // ← Usar o User completo

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@Context() context) {
    const userId = context.req.user.id;
    return this.authService.getUserById(userId);
  }
}