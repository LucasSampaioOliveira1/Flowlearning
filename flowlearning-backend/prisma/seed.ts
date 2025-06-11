import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Criar Conquistas
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'First Steps',
        description: 'Complete sua primeira lição',
        icon: '🎯',
        type: 'lessons',
        target: 1,
        xpReward: 50,
        gemsReward: 10,
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Week Warrior',
        description: 'Mantenha uma sequência de 7 dias',
        icon: '🔥',
        type: 'streak',
        target: 7,
        xpReward: 200,
        gemsReward: 50,
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'Perfect Score',
        description: 'Acerte 100% em uma lição',
        icon: '⭐',
        type: 'perfect_score',
        target: 1,
        xpReward: 100,
        gemsReward: 25,
      },
    }),
  ]);

  // Criar Unidades
  const unit1 = await prisma.unit.create({
    data: {
      title: 'Basic English',
      description: 'Learn the fundamentals of English',
      order: 1,
      color: '#3B82F6',
      icon: '📚',
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      title: 'Common Phrases',
      description: 'Essential phrases for daily conversation',
      order: 2,
      color: '#10B981',
      icon: '💬',
    },
  });

  // Criar Lições para Unit 1
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Greetings',
      description: 'Learn how to greet people in English',
      content: 'In this lesson, you will learn basic greetings like Hello, Good morning, How are you?',
      order: 1,
      xpReward: 15,
      difficulty: 'easy',
      type: 'vocabulary',
      duration: 5,
      unitId: unit1.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Numbers 1-10',
      description: 'Learn to count from 1 to 10',
      content: 'Practice numbers: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten',
      order: 2,
      xpReward: 20,
      difficulty: 'easy',
      type: 'vocabulary',
      duration: 7,
      unitId: unit1.id,
    },
  });

  // Criar Quizzes para Lesson 1
  await Promise.all([
    prisma.quiz.create({
      data: {
        question: 'How do you say "Hello" in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctAnswer: 'Hello',
        explanation: 'Hello is the most common greeting in English.',
        type: 'multiple_choice',
        order: 1,
        points: 1,
        lessonId: lesson1.id,
      },
    }),
    prisma.quiz.create({
      data: {
        question: 'Complete: Good _____ (morning greeting)',
        options: ['morning', 'night', 'evening', 'afternoon'],
        correctAnswer: 'morning',
        explanation: 'Good morning is used to greet someone in the morning.',
        type: 'multiple_choice',
        order: 2,
        points: 1,
        lessonId: lesson1.id,
      },
    }),
    prisma.quiz.create({
      data: {
        question: 'Fill in the blank: How ___ you?',
        options: ['are', 'is', 'am', 'be'],
        correctAnswer: 'are',
        explanation: 'How are you? is the correct form to ask about someone\'s wellbeing.',
        type: 'fill_blank',
        order: 3,
        points: 1,
        lessonId: lesson1.id,
      },
    }),
  ]);

  // Criar Quizzes para Lesson 2
  await Promise.all([
    prisma.quiz.create({
      data: {
        question: 'What comes after "three"?',
        options: ['four', 'five', 'two', 'six'],
        correctAnswer: 'four',
        explanation: 'The sequence is: one, two, three, four, five...',
        type: 'multiple_choice',
        order: 1,
        points: 1,
        lessonId: lesson2.id,
      },
    }),
    prisma.quiz.create({
      data: {
        question: 'How do you write the number 7?',
        options: ['seven', 'eight', 'six', 'nine'],
        correctAnswer: 'seven',
        explanation: 'The number 7 is written as "seven" in English.',
        type: 'multiple_choice',
        order: 2,
        points: 1,
        lessonId: lesson2.id,
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('📚 Created units:', unit1.title, unit2.title);
  console.log('📖 Created lessons:', lesson1.title, lesson2.title);
  console.log('🏆 Created achievements:', achievements.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });