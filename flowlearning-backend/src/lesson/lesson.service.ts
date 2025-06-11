import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getAllUnits(userId: number) {
    // Buscar todas as unidades com progresso do usuário
    const units = await this.prisma.unit.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            progress: {
              where: { userId },
            },
          },
        },
      },
    });

    // Determinar quais unidades estão desbloqueadas
    return units.map((unit, index) => {
      const isLocked = index > 0 && !this.isPreviousUnitCompleted(units[index - 1]);
      return {
        ...unit,
        isLocked,
        lessons: unit.lessons.map(lesson => ({
          ...lesson,
          isCompleted: lesson.progress.some(p => p.status === 'COMPLETED' || p.status === 'PERFECT'), // ← Adicionar PERFECT
          scorePercentage: lesson.progress.length > 0 ? lesson.progress[0].scorePercentage : 0,
        })),
      };
    });
  }

  async getLessonById(lessonId: number, userId: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        unit: true,
        quizzes: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            question: true,
            options: true,
            type: true,
            order: true,
            points: true,
            explanation: true,
            audioUrl: true,
            imageUrl: true,
            // NÃO incluir correctAnswer por segurança
          },
        },
        progress: {
          where: { userId },
        },
      },
    });

    if (!lesson) {
      throw new Error('Lição não encontrada');
    }

    return {
      ...lesson,
      isCompleted: lesson.progress.some(p => p.status === 'COMPLETED'),
      userProgress: lesson.progress.length > 0 ? lesson.progress[0] : null,
    };
  }

  async completeLesson(userId: number, lessonId: number, answers: any[]) {
    // Verificar se a lição existe
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { 
        quizzes: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!lesson) {
      throw new Error('Lição não encontrada');
    }

    // Calcular pontuação dos quizzes
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    for (const answer of answers) {
      const quiz = lesson.quizzes.find(q => q.id === answer.quizId);
      if (quiz) {
        totalPoints += quiz.points;
        if (quiz.correctAnswer === answer.userAnswer) {
          correctAnswers++;
          earnedPoints += quiz.points;
        }
      }
    }

    const totalQuizzes = lesson.quizzes.length;
    const wrongAnswers = totalQuizzes - correctAnswers;
    const scorePercentage = totalQuizzes > 0 ? (correctAnswers / totalQuizzes) * 100 : 100;
    
    // XP baseado na pontuação e dificuldade
    const difficultyMultiplier = this.getDifficultyMultiplier(lesson.difficulty);
    const xpEarned = Math.round((scorePercentage / 100) * lesson.xpReward * difficultyMultiplier);
    
    const status = scorePercentage === 100 ? 'PERFECT' : 
                   scorePercentage >= 80 ? 'COMPLETED' : 'IN_PROGRESS';

    // Verificar se já completou esta lição
    const existingProgress = await this.prisma.userProgress.findUnique({
      where: { 
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    let progressResult;

    if (existingProgress) {
      // Atualizar apenas se a nova pontuação for melhor
      if (scorePercentage > existingProgress.scorePercentage) {
        progressResult = await this.prisma.userProgress.update({
          where: { id: existingProgress.id },
          data: {
            status,
            correctAnswers,
            wrongAnswers,
            scorePercentage,
            xpEarned,
            attempts: existingProgress.attempts + 1,
            completedAt: status === 'COMPLETED' || status === 'PERFECT' ? new Date() : null,
          },
        });

        // Atualizar XP total do usuário
        const xpDifference = xpEarned - existingProgress.xpEarned;
        if (xpDifference > 0) {
          await this.updateUserXP(userId, xpDifference);
        }
      } else {
        // Apenas aumentar tentativas
        progressResult = await this.prisma.userProgress.update({
          where: { id: existingProgress.id },
          data: {
            attempts: existingProgress.attempts + 1,
          },
        });
      }
    } else {
      // Criar novo progresso
      progressResult = await this.prisma.userProgress.create({
        data: {
          userId,
          lessonId,
          status,
          correctAnswers,
          wrongAnswers,
          scorePercentage,
          xpEarned,
          attempts: 1,
          completedAt: status === 'COMPLETED' || status === 'PERFECT' ? new Date() : null,
        },
      });

      // Atualizar XP total do usuário
      await this.updateUserXP(userId, xpEarned);

      // Verificar conquistas
      await this.checkAchievements(userId, lessonId, scorePercentage);
    }

    return {
      status,
      scorePercentage: Math.round(scorePercentage),
      xpEarned,
      correctAnswers,
      totalQuizzes,
      earnedPoints,
      totalPoints,
      isNewRecord: !existingProgress || scorePercentage > (existingProgress?.scorePercentage || 0),
    };
  }

  private async updateUserXP(userId: number, xpToAdd: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newTotalXp = user.totalXp + xpToAdd;
    const newLevel = this.calculateLevel(newTotalXp);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: newTotalXp,
        currentLevel: newLevel,
        lastLoginAt: new Date(),
      },
    });

    return { newTotalXp, newLevel, levelUp: newLevel > user.currentLevel };
  }

  private calculateLevel(totalXp: number): number {
    // Fórmula: Level = floor(sqrt(totalXp / 100)) + 1
    return Math.floor(Math.sqrt(totalXp / 100)) + 1;
  }

  private getDifficultyMultiplier(difficulty: string): number {
    switch (difficulty) {
      case 'easy': return 1.0;
      case 'medium': return 1.2;
      case 'hard': return 1.5;
      default: return 1.0;
    }
  }

  private isPreviousUnitCompleted(unit: any): boolean {
    return unit.lessons.every(lesson => 
      lesson.progress.some(p => p.status === 'COMPLETED' || p.status === 'PERFECT')
    );
  }

  private async checkAchievements(userId: number, lessonId: number, scorePercentage: number) {
    // First Steps - primeira lição
    const completedLessons = await this.prisma.userProgress.count({
      where: { 
        userId, 
        status: { in: ['COMPLETED', 'PERFECT'] },
      },
    });

    if (completedLessons === 1) {
      await this.unlockAchievement(userId, 'First Steps');
    }

    // Perfect Score - 100% na lição
    if (scorePercentage === 100) {
      await this.unlockAchievement(userId, 'Perfect Score');
    }
  }

  private async unlockAchievement(userId: number, achievementName: string) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { name: achievementName },
    });

    if (!achievement) return;

    // Verificar se já foi desbloqueada
    const existing = await this.prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId: achievement.id,
        },
      },
    });

    if (!existing) {
      await this.prisma.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id,
          progress: achievement.target,
        },
      });

      // Dar recompensa
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          totalXp: { increment: achievement.xpReward },
          gems: { increment: achievement.gemsReward },
        },
      });
    }
  }
}