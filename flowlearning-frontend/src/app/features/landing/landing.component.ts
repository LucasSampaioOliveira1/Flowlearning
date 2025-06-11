import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <!-- Partículas flutuantes de fundo -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-particles">
          <div class="particle particle-1">✨</div>
          <div class="particle particle-2">🌟</div>
          <div class="particle particle-3">💫</div>
          <div class="particle particle-4">⭐</div>
          <div class="particle particle-5">🔮</div>
          <div class="particle particle-6">💎</div>
        </div>
      </div>

      <!-- Header Navigation -->
      <header class="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex items-center space-x-3">
              <div class="text-4xl animate-bounce">🦉</div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                FlowLearning
              </h1>
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex space-x-8">
              <a href="#features" class="text-white/80 hover:text-white transition-colors cursor-pointer">
                Recursos
              </a>
              <a href="#how-it-works" class="text-white/80 hover:text-white transition-colors cursor-pointer">
                Como Funciona
              </a>
              <a href="#pricing" class="text-white/80 hover:text-white transition-colors cursor-pointer">
                Preços
              </a>
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
                mat-raised-button
                class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="relative">
        <!-- Hero -->
        <section class="relative pt-20 pb-32">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- Hero Text -->
              <div class="text-center lg:text-left">
                <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Aprenda 
                  <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                    Jogando
                  </span>
                  <br>
                  Como Nunca Antes! 🎮
                </h1>
                
                <p class="text-xl text-white/80 mb-8 leading-relaxed">
                  Transforme seus estudos em uma aventura épica com nossa plataforma gamificada. 
                  Ganhe XP, desbloqueie conquistas e se torne um mestre do conhecimento!
                </p>

                <!-- Hero Stats -->
                <div class="flex flex-col sm:flex-row gap-6 mb-8">
                  <div class="flex items-center justify-center lg:justify-start space-x-2">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-2xl">🏆</span>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white">10K+</div>
                      <div class="text-white/60">Estudantes Ativos</div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-center lg:justify-start space-x-2">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span class="text-2xl">📚</span>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-white">500+</div>
                      <div class="text-white/60">Lições Disponíveis</div>
                    </div>
                  </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <button 
                    (click)="goToRegister()"
                    class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                    🚀 Começar Aventura Grátis
                  </button>
                  
                  <button 
                    (click)="scrollToDemo()"
                    class="border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition-all duration-300">
                    📺 Ver Demonstração
                  </button>
                </div>
              </div>

              <!-- Hero Visual -->
              <div class="relative">
                <!-- Coruja Principal Gigante -->
                <div class="relative flex justify-center">
                  <div class="relative">
                    <!-- Círculo de energia -->
                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-full animate-spin-slow blur-xl"></div>
                    
                    <!-- Coruja -->
                    <div class="relative text-9xl animate-float filter drop-shadow-2xl">
                      🦉
                    </div>

                    <!-- Elementos flutuantes ao redor -->
                    <div class="absolute -top-4 -right-4 text-3xl animate-bounce">⭐</div>
                    <div class="absolute -bottom-4 -left-4 text-3xl animate-bounce" style="animation-delay: 0.5s">💎</div>
                    <div class="absolute top-1/2 -left-8 text-2xl animate-bounce" style="animation-delay: 1s">🏆</div>
                    <div class="absolute top-1/2 -right-8 text-2xl animate-bounce" style="animation-delay: 1.5s">🔥</div>
                  </div>
                </div>

                <!-- XP Bar Flutuante -->
                <div class="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-white font-bold">Level 5</span>
                    <span class="text-white/80">1,250 XP</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-4">
                    <div class="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                  <div class="flex items-center justify-between mt-3 text-sm text-white/60">
                    <span>Next: Level 6</span>
                    <span>250 XP restantes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-white/5 backdrop-blur-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl lg:text-6xl font-bold text-white mb-6">
                Por que escolher o 
                <span class="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  FlowLearning?
                </span>
              </h2>
              <p class="text-xl text-white/80 max-w-3xl mx-auto">
                Revolucionamos a forma como você aprende com gamificação avançada e tecnologia de ponta
              </p>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Feature 1 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">🎮</div>
                <h3 class="text-2xl font-bold text-white mb-4">Gamificação Real</h3>
                <p class="text-white/80">
                  Ganhe XP, suba de level, desbloqueie conquistas e compete com amigos em uma experiência verdadeiramente gamificada.
                </p>
              </div>

              <!-- Feature 2 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">🧠</div>
                <h3 class="text-2xl font-bold text-white mb-4">IA Adaptativa</h3>
                <p class="text-white/80">
                  Nossa inteligência artificial personaliza o conteúdo baseado no seu ritmo e estilo de aprendizado.
                </p>
              </div>

              <!-- Feature 3 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">🏆</div>
                <h3 class="text-2xl font-bold text-white mb-4">Sistema de Conquistas</h3>
                <p class="text-white/80">
                  Desbloqueie badges especiais, títulos únicos e recompensas exclusivas conforme progride.
                </p>
              </div>

              <!-- Feature 4 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">👥</div>
                <h3 class="text-2xl font-bold text-white mb-4">Comunidade Ativa</h3>
                <p class="text-white/80">
                  Conecte-se com outros estudantes, forme grupos de estudo e participe de desafios em equipe.
                </p>
              </div>

              <!-- Feature 5 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">📊</div>
                <h3 class="text-2xl font-bold text-white mb-4">Analytics Detalhados</h3>
                <p class="text-white/80">
                  Acompanhe seu progresso com relatórios detalhados, estatísticas e insights personalizados.
                </p>
              </div>

              <!-- Feature 6 -->
              <div class="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div class="text-5xl mb-6 group-hover:animate-bounce">💎</div>
                <h3 class="text-2xl font-bold text-white mb-4">Recompensas Reais</h3>
                <p class="text-white/80">
                  Troque suas moedas virtuais por prêmios reais, certificados e benefícios exclusivos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Final -->
        <section class="py-20">
          <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div class="bg-gradient-to-r from-yellow-400/20 via-pink-500/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/30">
              <div class="text-6xl mb-6 animate-bounce">🚀</div>
              <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
                Pronto para começar sua jornada?
              </h2>
              <p class="text-xl text-white/80 mb-8">
                Junte-se a milhares de estudantes que já transformaram seus estudos em diversão!
              </p>
              <button 
                (click)="goToRegister()"
                class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-6 px-12 rounded-full text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse">
                🎯 Começar Agora - É Grátis!
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-spin-slow {
      animation: spin-slow 8s linear infinite;
    }

    .floating-particles {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .particle {
      position: absolute;
      font-size: 2rem;
      opacity: 0.6;
      animation: float 6s ease-in-out infinite;
    }

    .particle-1 { top: 10%; left: 10%; animation-delay: 0s; }
    .particle-2 { top: 20%; right: 20%; animation-delay: 1s; }
    .particle-3 { top: 40%; left: 5%; animation-delay: 2s; }
    .particle-4 { top: 60%; right: 10%; animation-delay: 3s; }
    .particle-5 { top: 80%; left: 15%; animation-delay: 4s; }
    .particle-6 { top: 70%; right: 25%; animation-delay: 5s; }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }

    /* Glassmorphism effect */
    .backdrop-blur-md {
      backdrop-filter: blur(16px);
    }
  `]
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  scrollToDemo() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }
}