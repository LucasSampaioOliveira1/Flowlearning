import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { 
  Unit, 
  Lesson, 
  CompleteLessonInput, 
  LessonResult 
} from './dto/lesson.types';

@Resolver()
@UseGuards(GqlAuthGuard)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => [Unit])
  async getUnits(@Context() context) {
    const userId = context.req.user.id;
    return this.lessonService.getAllUnits(userId);
  }

  @Query(() => Lesson)
  async getLesson(
    @Args('lessonId', { type: () => Int }) lessonId: number,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.lessonService.getLessonById(lessonId, userId);
  }

  @Mutation(() => LessonResult)
  async completeLesson(
    @Args('input') input: CompleteLessonInput,
    @Context() context,
  ) {
    const userId = context.req.user.id;
    return this.lessonService.completeLesson(
      userId,
      input.lessonId,
      input.answers,
    );
  }
}