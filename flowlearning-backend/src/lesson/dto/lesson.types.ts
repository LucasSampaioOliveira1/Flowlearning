import { ObjectType, Field, Int, Float, InputType } from '@nestjs/graphql';

// ========================================
// FORWARD DECLARATIONS (resolve circular references)
// ========================================

@ObjectType()
export class Unit {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  order: number;

  @Field()
  color: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  isActive: boolean;

  @Field()
  isLocked: boolean;

  @Field(() => Date)
  createdAt: Date;

  // Forward reference - será resolvido em runtime
  @Field(() => [Lesson])
  lessons: Lesson[];
}

@ObjectType()
export class UserProgress {
  @Field(() => Int)
  id: number;

  @Field()
  status: string;

  @Field(() => Int)
  correctAnswers: number;

  @Field(() => Int)
  wrongAnswers: number;

  @Field(() => Int)
  xpEarned: number;

  @Field(() => Float)
  scorePercentage: number;

  @Field(() => Int)
  timeSpent: number;

  @Field(() => Int)
  attempts: number;

  @Field(() => Date, { nullable: true })
  completedAt?: Date;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class Quiz {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field()
  type: string;

  @Field(() => [String])
  options: string[];

  @Field({ nullable: true })
  explanation?: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  points: number;

  @Field({ nullable: true })
  audioUrl?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field(() => Int)
  lessonId: number;
}

@ObjectType()
export class Lesson {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  content: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  xpReward: number;

  @Field()
  difficulty: string;

  @Field()
  type: string;

  @Field(() => Int)
  duration: number;

  @Field()
  isActive: boolean;

  @Field()
  isCompleted: boolean;

  @Field(() => Float)
  scorePercentage: number;

  @Field(() => Int)
  unitId: number;

  // Forward references - serão resolvidos em runtime
  @Field(() => Unit)
  unit: Unit;

  @Field(() => [Quiz], { nullable: true })
  quizzes?: Quiz[];

  @Field(() => UserProgress, { nullable: true })
  userProgress?: UserProgress;
}

// ========================================
// RESULT AND INPUT TYPES
// ========================================

@ObjectType()
export class LessonResult {
  @Field()
  status: string;

  @Field(() => Int)
  scorePercentage: number;

  @Field(() => Int)
  xpEarned: number;

  @Field(() => Int)
  correctAnswers: number;

  @Field(() => Int)
  totalQuizzes: number;

  @Field(() => Int)
  earnedPoints: number;

  @Field(() => Int)
  totalPoints: number;

  @Field()
  isNewRecord: boolean;
}

@InputType()
export class CompleteQuizInput {
  @Field(() => Int)
  quizId: number;

  @Field()
  userAnswer: string;
}

@InputType()
export class CompleteLessonInput {
  @Field(() => Int)
  lessonId: number;

  @Field(() => [CompleteQuizInput])
  answers: CompleteQuizInput[];
}