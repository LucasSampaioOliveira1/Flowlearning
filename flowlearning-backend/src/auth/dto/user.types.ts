import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Int)
  totalXp: number;

  @Field(() => Int)
  currentLevel: number;

  @Field(() => Int)
  streak: number;

  @Field(() => Int)
  hearts: number;

  @Field(() => Int)
  gems: number;

  @Field()
  isActive: boolean;

  @Field(() => Date, { nullable: true })
  lastLoginAt?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}