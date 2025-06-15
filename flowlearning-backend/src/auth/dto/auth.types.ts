import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthUser {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Int)
  totalXp: number;

  @Field(() => Int)
  currentLevel: number;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class AuthResponse {
  @Field(() => AuthUser)
  user: AuthUser;

  @Field()
  token: string;
}

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}