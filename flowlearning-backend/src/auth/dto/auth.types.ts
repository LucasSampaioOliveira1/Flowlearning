import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthUser {  // ← Mudança aqui: de User para AuthUser
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
  @Field(() => AuthUser)  // ← Mudança aqui: usar AuthUser
  user: AuthUser;

  @Field()
  token: string;
}

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}