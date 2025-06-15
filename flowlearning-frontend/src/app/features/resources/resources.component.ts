import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      <!-- Header -->
      <header class="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <!-- Logo -->
            <button (click)="goHome()" class="flex items-center space-x-3 group">
              <div class="text-3xl group-hover:animate-bounce transition-transform">🦉</div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FlowLearning
              </h1>
            </button>

            <!-- Navigation -->
            <nav class="hidden md:flex items-center space-x-8">
              <button class="text-white font-medium border-b-2 border-purple-400">
                Recursos
              </button>
              <button (click)="goToHowItWorks()" class="text-white/70 hover:text-white transition-colors">
                Como Funciona
              </button>
              <button (click)="goToPricing()" class="text-white/70 hover:text-white transition-colors">
                Preços
              </button>
            </nav>

            <!-- Auth Buttons -->
            <div class="flex items-center space-x-4">
              <button 
                (click)="goToLogin()"
                class="text-white/80 hover:text-white transition-colors font-medium">
                Entrar
              </button>
              <button 
                (click)="goToRegister()"
                class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative pt-20 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-6xl mb-6 animate-bounce">⚡</div>
          <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">
            Recursos
            <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Poderosos
            </span>
          </h1>
          <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Descubra todas as ferramentas e tecnologias avançadas que tornam o FlowLearning 
            a plataforma de aprendizado mais inovadora do mercado! 🚀
          </p>
        </div>
      </section>

      <!-- Recursos Principais -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🎯 Recursos que Fazem a Diferença
            </h2>
            <p class="text-white/60 text-lg">
              Cada funcionalidade foi pensada para maximizar seu aprendizado
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 mb-20">
            <!-- Recurso 1: Sistema de Gamificação -->
            <div class="group">
              <div class="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 hover:border-green-400 transition-all duration-300">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl">
                    🎮
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white">Sistema de Gamificação Completo</h3>
                    <p class="text-green-400">Transforme estudos em diversão</p>
                  </div>
                </div>
                
                <div class="space-y-4 mb-6">
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span class="text-white/80">Sistema de XP e Levels progressivos</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span class="text-white/80">Conquistas e badges desbloqueáveis</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span class="text-white/80">Sistema de streak e motivação diária</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span class="text-white/80">Ranking global e competições</span>
                  </div>
                </div>

                <!-- Mock Gamification UI -->
                <div class="bg-white/10 rounded-xl p-4">
                  <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center space-x-2">
                      <span class="text-2xl">🦉</span>
                      <span class="text-white font-bold">Level 15</span>
                    </div>
                    <span class="text-yellow-400">👑 Mestre</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-3 mb-2">
                    <div class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full w-4/5"></div>
                  </div>
                  <div class="flex justify-between text-sm text-white/70">
                    <span>3,200 XP</span>
                    <span>800 XP para Level 16</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recurso 2: IA Adaptativa -->
            <div class="group">
              <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 hover:border-purple-400 transition-all duration-300">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                    🤖
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-white">Inteligência Artificial Adaptativa</h3>
                    <p class="text-purple-400">Personalização em tempo real</p>
                  </div>
                </div>
                
                <div class="space-y-4 mb-6">
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span class="text-white/80">Análise de padrões de aprendizado</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span class="text-white/80">Ajuste automático de dificuldade</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span class="text-white/80">Recomendações personalizadas</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span class="text-white/80">Predição de dificuldades futuras</span>
                  </div>
                </div>

                <!-- Mock AI Analysis -->
                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-3">🧠 Análise IA - Hoje</h4>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-white/70 text-sm">Gramática</span>
                      <span class="text-green-400 text-sm">Forte ✨</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70 text-sm">Vocabulário</span>
                      <span class="text-yellow-400 text-sm">Melhorando 📈</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-white/70 text-sm">Pronúncia</span>
                      <span class="text-orange-400 text-sm">Foco 🎯</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mais Recursos -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Sistema de Vidas -->
            <div class="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border border-red-400/30 text-center hover:border-red-400 transition-all">
              <div class="text-5xl mb-4">💖</div>
              <h3 class="text-lg font-bold text-white mb-2">Sistema de Vidas</h3>
              <p class="text-white/70 text-sm mb-4">Gerencie seus erros estrategicamente</p>
              <div class="flex justify-center space-x-1">
                <span class="text-2xl">💖</span>
                <span class="text-2xl">💖</span>
                <span class="text-2xl">💖</span>
                <span class="text-2xl opacity-30">💖</span>
                <span class="text-2xl opacity-30">💖</span>
              </div>
            </div>

            <!-- Streak System -->
            <div class="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-3xl p-6 border border-orange-400/30 text-center hover:border-orange-400 transition-all">
              <div class="text-5xl mb-4">🔥</div>
              <h3 class="text-lg font-bold text-white mb-2">Sistema de Streak</h3>
              <p class="text-white/70 text-sm mb-4">Mantenha a consistência diária</p>
              <div class="bg-white/10 rounded-xl p-3">
                <div class="text-2xl font-bold text-orange-400">25</div>
                <div class="text-xs text-white/60">dias consecutivos</div>
              </div>
            </div>

            <!-- Gems & Rewards -->
            <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-3xl p-6 border border-blue-400/30 text-center hover:border-blue-400 transition-all">
              <div class="text-5xl mb-4">💎</div>
              <h3 class="text-lg font-bold text-white mb-2">Gems & Recompensas</h3>
              <p class="text-white/70 text-sm mb-4">Ganhe moedas virtuais</p>
              <div class="bg-white/10 rounded-xl p-3">
                <div class="text-2xl font-bold text-blue-400">1,247</div>
                <div class="text-xs text-white/60">gems coletadas</div>
              </div>
            </div>

            <!-- Certificados -->
            <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-6 border border-yellow-400/30 text-center hover:border-yellow-400 transition-all">
              <div class="text-5xl mb-4">🏆</div>
              <h3 class="text-lg font-bold text-white mb-2">Certificados</h3>
              <p class="text-white/70 text-sm mb-4">Comprove seu progresso</p>
              <div class="bg-white/10 rounded-xl p-3">
                <div class="text-2xl font-bold text-yellow-400">3</div>
                <div class="text-xs text-white/60">certificados earned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Antes vs Depois -->
      <section class="py-20 bg-white/5 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🔄 Antes vs Depois do FlowLearning
            </h2>
            <p class="text-white/60 text-lg">
              Veja a transformação no seu processo de aprendizado
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12">
            <!-- Antes -->
            <div class="bg-gradient-to-br from-gray-600/20 to-gray-800/20 backdrop-blur-md rounded-3xl p-8 border border-gray-500/30">
              <div class="text-center mb-6">
                <div class="text-5xl mb-4">😴</div>
                <h3 class="text-2xl font-bold text-white">Método Tradicional</h3>
                <p class="text-gray-400">Aprendizado monótono e desmotivador</p>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-red-400">❌</span>
                  <span class="text-white/70">Estudar sem motivação clara</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-red-400">❌</span>
                  <span class="text-white/70">Progresso difícil de acompanhar</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-red-400">❌</span>
                  <span class="text-white/70">Falta de feedback instantâneo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-red-400">❌</span>
                  <span class="text-white/70">Abandono após poucas semanas</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-red-400">❌</span>
                  <span class="text-white/70">Conteúdo genérico para todos</span>
                </div>
              </div>

              <div class="mt-6 bg-gray-500/20 rounded-xl p-4 text-center">
                <div class="text-3xl mb-2">📉</div>
                <p class="text-gray-300 text-sm">Taxa de abandono: 80%</p>
              </div>
            </div>

            <!-- Depois -->
            <div class="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 transform hover:scale-105 transition-all">
              <div class="text-center mb-6">
                <div class="text-5xl mb-4">🚀</div>
                <h3 class="text-2xl font-bold text-white">Com FlowLearning</h3>
                <p class="text-green-400">Aprendizado envolvente e eficaz</p>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">✅</span>
                  <span class="text-white">Motivação constante com gamificação</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">✅</span>
                  <span class="text-white">Progresso visual e recompensas</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">✅</span>
                  <span class="text-white">Feedback instantâneo com IA</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">✅</span>
                  <span class="text-white">Engajamento de longo prazo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <span class="text-green-400">✅</span>
                  <span class="text-white">Conteúdo personalizado por IA</span>
                </div>
              </div>

              <div class="mt-6 bg-green-500/20 rounded-xl p-4 text-center">
                <div class="text-3xl mb-2">📈</div>
                <p class="text-green-300 text-sm">Taxa de retenção: 95%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stack Tecnológico -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🛠️ Tecnologias de Ponta
            </h2>
            <p class="text-white/60 text-lg">
              Construído com as melhores ferramentas do mercado
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Frontend -->
            <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-3xl p-6 border border-blue-400/30 text-center">
              <div class="text-4xl mb-4">⚡</div>
              <h3 class="text-lg font-bold text-white mb-3">Frontend</h3>
              <div class="space-y-2 text-sm text-white/70">
                <p>Angular 17</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
                <p>Material Design</p>
              </div>
            </div>

            <!-- Backend -->
            <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-3xl p-6 border border-green-400/30 text-center">
              <div class="text-4xl mb-4">🔧</div>
              <h3 class="text-lg font-bold text-white mb-3">Backend</h3>
              <div class="space-y-2 text-sm text-white/70">
                <p>NestJS</p>
                <p>GraphQL</p>
                <p>Prisma ORM</p>
                <p>JWT Auth</p>
              </div>
            </div>

            <!-- Database -->
            <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border border-purple-400/30 text-center">
              <div class="text-4xl mb-4">🗄️</div>
              <h3 class="text-lg font-bold text-white mb-3">Database</h3>
              <div class="space-y-2 text-sm text-white/70">
                <p>PostgreSQL</p>
                <p>Redis Cache</p>
                <p>Backup Automático</p>
                <p>Escalabilidade</p>
              </div>
            </div>

            <!-- AI & Analytics -->
            <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-6 border border-yellow-400/30 text-center">
              <div class="text-4xl mb-4">🤖</div>
              <h3 class="text-lg font-bold text-white mb-3">IA & Analytics</h3>
              <div class="space-y-2 text-sm text-white/70">
                <p>Machine Learning</p>
                <p>Processamento NLP</p>
                <p>Analytics Avançado</p>
                <p>Relatórios IA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Demonstração Interativa -->
      <section class="py-20 bg-white/5 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              📱 Interface Intuitiva
            </h2>
            <p class="text-white/60 text-lg">
              Design moderno e experiência do usuário excepcional
            </p>
          </div>

          <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- Mock Dashboard -->
              <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-white font-bold text-lg">Seu Dashboard</h3>
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                <div class="space-y-4">
                  <!-- Progress Cards -->
                  <div class="grid grid-cols-3 gap-4">
                    <div class="bg-purple-500/20 rounded-xl p-3 text-center">
                      <div class="text-2xl mb-1">🏆</div>
                      <div class="text-white font-bold text-sm">Level 15</div>
                    </div>
                    <div class="bg-blue-500/20 rounded-xl p-3 text-center">
                      <div class="text-2xl mb-1">🔥</div>
                      <div class="text-white font-bold text-sm">25 dias</div>
                    </div>
                    <div class="bg-green-500/20 rounded-xl p-3 text-center">
                      <div class="text-2xl mb-1">💎</div>
                      <div class="text-white font-bold text-sm">1,247</div>
                    </div>
                  </div>

                  <!-- Learning Path -->
                  <div class="bg-white/5 rounded-xl p-4">
                    <h4 class="text-white font-medium mb-3">Trilha de Aprendizado</h4>
                    <div class="space-y-2">
                      <div class="flex items-center space-x-3">
                        <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span class="text-xs text-white">✓</span>
                        </div>
                        <span class="text-white/80 text-sm">Basic English</span>
                        <span class="text-green-400 text-xs">Completo</span>
                      </div>
                      <div class="flex items-center space-x-3">
                        <div class="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                        <span class="text-white text-sm">Common Phrases</span>
                        <span class="text-blue-400 text-xs">Em progresso</span>
                      </div>
                      <div class="flex items-center space-x-3">
                        <div class="w-6 h-6 bg-gray-500 rounded-full opacity-50"></div>
                        <span class="text-white/50 text-sm">Advanced Grammar</span>
                        <span class="text-gray-400 text-xs">Bloqueado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Features List -->
              <div>
                <h3 class="text-3xl font-bold text-white mb-6">
                  🎨 Design que Encanta
                </h3>
                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white">📱</span>
                    </div>
                    <div>
                      <h4 class="text-white font-bold mb-2">Interface Responsiva</h4>
                      <p class="text-white/70">
                        Perfeito em qualquer dispositivo - desktop, tablet ou mobile. 
                        Design adaptativo que se ajusta à sua tela.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white">⚡</span>
                    </div>
                    <div>
                      <h4 class="text-white font-bold mb-2">Performance Otimizada</h4>
                      <p class="text-white/70">
                        Carregamento ultra-rápido e navegação fluida. 
                        Tecnologia de ponta para a melhor experiência.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white">🎯</span>
                    </div>
                    <div>
                      <h4 class="text-white font-bold mb-2">Foco no Usuário</h4>
                      <p class="text-white/70">
                        Cada elemento foi pensado para facilitar seu aprendizado. 
                        UX intuitiva e acessível para todos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="py-20">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/30">
            <div class="text-6xl mb-6 animate-bounce">🚀</div>
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Experimente Todos os Recursos!
            </h2>
            <p class="text-xl text-white/80 mb-8">
              Comece gratuitamente e descubra como nossos recursos podem transformar 
              seu aprendizado de forma única e divertida!
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                (click)="goToRegister()"
                class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                🎯 Começar Agora - Grátis
              </button>
              
              <button 
                (click)="goToHowItWorks()"
                class="border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition-all duration-300">
                📖 Como Funciona
              </button>
            </div>

            <p class="text-white/60 text-sm mt-6">
              ✨ Acesso instantâneo • Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ResourcesComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToPricing() {
    this.router.navigate(['/pricing']);
  }

  goToHowItWorks() {
    this.router.navigate(['/how-it-works']);
  }
}