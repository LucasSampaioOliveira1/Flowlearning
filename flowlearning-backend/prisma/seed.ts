import { PrismaClient, PlanType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpar dados existentes (ordem importante por causa das foreign keys)
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.dailyLogin.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.planFeature.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Dados anteriores limpos');

  // Criar features dos planos
  console.log('⚙️ Criando features dos planos...');
  const planFeatures = [
    // Plano FREE
    { plan: 'FREE', feature: 'max_daily_xp', value: '50' },
    { plan: 'FREE', feature: 'hearts_count', value: '3' },
    { plan: 'FREE', feature: 'access_all_units', value: 'false' },
    { plan: 'FREE', feature: 'streak_freeze', value: '0' },
    { plan: 'FREE', feature: 'priority_support', value: 'false' },

    // Plano EXPLORER
    { plan: 'EXPLORER', feature: 'max_daily_xp', value: 'unlimited' },
    { plan: 'EXPLORER', feature: 'hearts_count', value: '5' },
    { plan: 'EXPLORER', feature: 'access_all_units', value: 'true' },
    { plan: 'EXPLORER', feature: 'streak_freeze', value: '3' },
    { plan: 'EXPLORER', feature: 'priority_support', value: 'true' },
    { plan: 'EXPLORER', feature: 'progress_reports', value: 'true' },

    // Plano MASTER
    { plan: 'MASTER', feature: 'max_daily_xp', value: 'unlimited' },
    { plan: 'MASTER', feature: 'hearts_count', value: 'unlimited' },
    { plan: 'MASTER', feature: 'access_all_units', value: 'true' },
    { plan: 'MASTER', feature: 'streak_freeze', value: 'unlimited' },
    { plan: 'MASTER', feature: 'priority_support', value: 'true' },
    { plan: 'MASTER', feature: 'progress_reports', value: 'true' },
    { plan: 'MASTER', feature: 'ai_personalization', value: 'true' },
    { plan: 'MASTER', feature: 'exclusive_content', value: 'true' },
    { plan: 'MASTER', feature: 'certificates', value: 'true' },
  ];

  for (const feature of planFeatures) {
    await prisma.planFeature.create({
      data: {
        plan: feature.plan as PlanType,
        feature: feature.feature,
        value: feature.value,
      },
    });
  }

  console.log('✅ Features dos planos criadas');

  // Criar usuários de exemplo
  console.log('👥 Criando usuários de exemplo...');
  const freeUser = await prisma.user.create({
    data: {
      email: 'free@flowlearning.com',
      password: '$2b$10$YourHashedPasswordHere',
      name: 'Usuário Free',
      plan: 'FREE',
      hearts: 3,
    },
  });

  const explorerUser = await prisma.user.create({
    data: {
      email: 'explorer@flowlearning.com',
      password: '$2b$10$YourHashedPasswordHere',
      name: 'Usuário Explorer',
      plan: 'EXPLORER',
      hearts: 5,
      planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    },
  });

  const masterUser = await prisma.user.create({
    data: {
      email: 'master@flowlearning.com',
      password: '$2b$10$YourHashedPasswordHere',
      name: 'Usuário Master',
      plan: 'MASTER',
      hearts: 999,
      planExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    },
  });

  console.log('✅ Usuários criados');

  // Criar Unidades com diferentes níveis de acesso
  console.log('📚 Criando unidades...');
  const unit1 = await prisma.unit.create({
    data: {
      title: 'Basic English',
      description: 'Learn the fundamentals of English',
      order: 1,
      color: '#3B82F6',
      icon: '📚',
      requiredPlan: 'FREE',
    },
  });

  const unit2 = await prisma.unit.create({
    data: {
      title: 'Common Phrases',
      description: 'Essential phrases for daily conversation',
      order: 2,
      color: '#10B981',
      icon: '💬',
      requiredPlan: 'FREE',
    },
  });

  const unit3 = await prisma.unit.create({
    data: {
      title: 'Advanced Grammar',
      description: 'Master complex grammar structures',
      order: 3,
      color: '#8B5CF6',
      icon: '📖',
      requiredPlan: 'EXPLORER',
    },
  });

  const unit4 = await prisma.unit.create({
    data: {
      title: 'Business English',
      description: 'Professional English for business',
      order: 4,
      color: '#F59E0B',
      icon: '💼',
      requiredPlan: 'MASTER',
    },
  });

  console.log('✅ Unidades criadas');

  // Criar lições de exemplo
  console.log('📝 Criando lições...');
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Greetings',
      description: 'Learn how to greet people in English',
      content: 'In this lesson, you will learn basic greetings like Hello, Good morning, How are you?',
      order: 1,
      xpReward: 15,
      unitId: unit1.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Introductions',
      description: 'Learn how to introduce yourself',
      content: 'Learn to say your name, age, and where you are from',
      order: 2,
      xpReward: 15,
      unitId: unit1.id,
    },
  });

  console.log('✅ Lições criadas');

  // Criar quizzes de exemplo
  console.log('❓ Criando quizzes...');
  await prisma.quiz.create({
    data: {
      question: 'How do you say "Hello" in English?',
      options: JSON.stringify(['Hello', 'Goodbye', 'Thank you', 'Please']),
      correctAnswer: 'Hello',
      explanation: 'Hello is the most common greeting in English',
      type: 'multiple_choice',
      order: 1,
      points: 1,
      lessonId: lesson1.id,
    },
  });

  await prisma.quiz.create({
    data: {
      question: 'What is the response to "How are you?"',
      options: JSON.stringify(['I am fine', 'Hello', 'Goodbye', 'What?']),
      correctAnswer: 'I am fine',
      explanation: '"I am fine" is a common response to "How are you?"',
      type: 'multiple_choice',
      order: 2,
      points: 1,
      lessonId: lesson1.id,
    },
  });

  console.log('✅ Quizzes criados');

  // Criar conquistas
  console.log('🏆 Criando conquistas...');
  await prisma.achievement.create({
    data: {
      name: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      type: 'lessons',
      target: 1,
      xpReward: 50,
      gemsReward: 10,
      requiredPlan: 'FREE',
    },
  });

  await prisma.achievement.create({
    data: {
      name: 'Premium Explorer',
      description: 'Upgrade to Explorer plan',
      icon: '⭐',
      type: 'plan_upgrade',
      target: 1,
      xpReward: 100,
      gemsReward: 50,
      requiredPlan: 'EXPLORER',
    },
  });

  await prisma.achievement.create({
    data: {
      name: 'Master Learner',
      description: 'Upgrade to Master plan',
      icon: '🔥',
      type: 'plan_upgrade',
      target: 1,
      xpReward: 200,
      gemsReward: 100,
      requiredPlan: 'MASTER',
    },
  });

  console.log('✅ Conquistas criadas');

  console.log('🎉 Seed completado com sucesso!');
  console.log('');
  console.log('📊 Dados criados:');
  console.log('👥 3 usuários de exemplo (free, explorer, master)');
  console.log('📚 4 unidades com diferentes níveis de acesso');
  console.log('📝 2 lições na primeira unidade');
  console.log('❓ 2 quizzes na primeira lição');
  console.log('🏆 3 conquistas');
  console.log('⚙️ 21 features de planos configuradas');
  console.log('');
  console.log('🔐 Usuários para teste:');
  console.log('📧 free@flowlearning.com (Plano FREE)');
  console.log('📧 explorer@flowlearning.com (Plano EXPLORER)');
  console.log('📧 master@flowlearning.com (Plano MASTER)');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });