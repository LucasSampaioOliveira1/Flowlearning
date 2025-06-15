import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
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

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-8">
              <button (click)="goToResources()" class="text-white/70 hover:text-white transition-colors">
                Recursos
              </button>
              <button class="text-white font-medium border-b-2 border-purple-400">
                Como Funciona
              </button>
              <button (click)="goToPricing()" class="text-white/70 hover:text-white transition-colors">
                Preços
              </button>
            </nav>

            <!-- Desktop Auth Buttons -->
            <div class="hidden md:flex items-center space-x-4">
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

            <!-- Mobile Menu Button -->
            <button 
              (click)="toggleMenu()"
              class="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
              <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>

          <!-- Mobile Menu -->
          <div class="md:hidden" [class.hidden]="!isMenuOpen">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl mt-4 p-6 border border-white/20 space-y-4">
              <!-- Mobile Navigation Links -->
              <button 
                (click)="goToResources(); closeMobileMenu()"
                class="block w-full text-left text-white/80 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/10">
                📋 Recursos
              </button>
              
              <button 
                class="block w-full text-left text-white font-medium py-3 px-4 rounded-xl bg-purple-500/20 border border-purple-400/50">
                ❓ Como Funciona
              </button>
              
              <button 
                (click)="goToPricing(); closeMobileMenu()"
                class="block w-full text-left text-white/80 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/10">
                💰 Preços
              </button>

              <!-- Mobile Auth Buttons -->
              <div class="pt-4 border-t border-white/20 space-y-3">
                <button 
                  (click)="goToLogin(); closeMobileMenu()"
                  class="block w-full text-center text-white/80 hover:text-white transition-colors py-3 px-4 rounded-xl border border-white/30 hover:bg-white/10">
                  Entrar
                </button>
                
                <button 
                  (click)="goToRegister(); closeMobileMenu()"
                  class="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transition-all">
                  🚀 Começar Grátis
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="relative pt-20 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-6xl mb-6">🎮</div>
          <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">
            Como Funciona o
            <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              FlowLearning?
            </span>
          </h1>
          <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Descubra como transformamos aprendizado em diversão através de gamificação avançada, 
            progressão inteligente e uma experiência completamente imersiva! 🚀
          </p>
        </div>
      </section>

      <!-- Como Começar - Passo a Passo -->
      <section class="py-20 bg-white/5 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🎯 Como Começar sua Jornada
            </h2>
            <p class="text-white/60 text-lg">
              Em apenas 3 passos simples você estará pronto para aprender!
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Passo 1 -->
            <div class="relative">
              <div class="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30 text-center">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    1
                  </div>
                </div>
                <div class="text-6xl mb-6 mt-4">📝</div>
                <h3 class="text-2xl font-bold text-white mb-4">Crie sua Conta</h3>
                <p class="text-white/70 mb-6">
                  Cadastre-se gratuitamente em menos de 30 segundos. 
                  Escolha seu avatar e defina seus objetivos de aprendizado.
                </p>
                <div class="bg-white/10 rounded-2xl p-4">
                  <p class="text-sm text-white/80">
                    ✨ <strong>100% Gratuito</strong> - Sem cartão de crédito
                  </p>
                </div>
              </div>
            </div>

            <!-- Passo 2 -->
            <div class="relative">
              <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 text-center">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                </div>
                <div class="text-6xl mb-6 mt-4">🗺️</div>
                <h3 class="text-2xl font-bold text-white mb-4">Explore o Mapa</h3>
                <p class="text-white/70 mb-6">
                  Navegue pelo mapa interativo de aprendizado. 
                  Cada unidade desbloqueada revela novos desafios e conquistas.
                </p>
                <div class="bg-white/10 rounded-2xl p-4">
                  <p class="text-sm text-white/80">
                    🎮 <strong>Progressão Visual</strong> - Como um videogame
                  </p>
                </div>
              </div>
            </div>

            <!-- Passo 3 -->
            <div class="relative">
              <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30 text-center">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    3
                  </div>
                </div>
                <div class="text-6xl mb-6 mt-4">🏆</div>
                <h3 class="text-2xl font-bold text-white mb-4">Ganhe Recompensas</h3>
                <p class="text-white/70 mb-6">
                  Complete lições, ganhe XP, suba de level e desbloqueie conquistas. 
                  Sua dedicação é recompensada!
                </p>
                <div class="bg-white/10 rounded-2xl p-4">
                  <p class="text-sm text-white/80">
                    💎 <strong>Sistema de Recompensas</strong> - Sempre motivado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sistema de Gamificação -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🎮 Sistema de Gamificação Completo
            </h2>
            <p class="text-white/60 text-lg">
              Cada elemento foi pensado para manter você engajado e motivado!
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <!-- Explicação XP e Levels -->
            <div>
              <h3 class="text-3xl font-bold text-white mb-6">
                📈 Sistema de XP e Levels
              </h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold">+5</span>
                  </div>
                  <div>
                    <p class="text-white font-medium">Lição Completa</p>
                    <p class="text-white/60 text-sm">Ganhe 5-15 XP por lição concluída</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold">+10</span>
                  </div>
                  <div>
                    <p class="text-white font-medium">Sequência Perfeita</p>
                    <p class="text-white/60 text-sm">Acerte todas as questões sem erro</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold">+20</span>
                  </div>
                  <div>
                    <p class="text-white font-medium">Streak Diário</p>
                    <p class="text-white/60 text-sm">Mantenha sua sequência de dias</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mock da Interface XP -->
            <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div class="text-center mb-6">
                <div class="text-4xl mb-2">🦉</div>
                <h4 class="text-xl font-bold text-white">Seu Progresso</h4>
              </div>
              
              <div class="space-y-4">
                <!-- Level Progress -->
                <div class="bg-white/10 rounded-xl p-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-white font-medium">Level 5</span>
                    <span class="text-white/70">1,250 XP</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-3">
                    <div class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full w-3/4"></div>
                  </div>
                  <p class="text-xs text-white/60 mt-1">250 XP para o próximo level</p>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-red-500/20 rounded-xl p-3 text-center">
                    <div class="text-2xl mb-1">💖</div>
                    <div class="text-white font-bold">5</div>
                    <div class="text-xs text-white/70">Vidas</div>
                  </div>
                  <div class="bg-purple-500/20 rounded-xl p-3 text-center">
                    <div class="text-2xl mb-1">💎</div>
                    <div class="text-white font-bold">127</div>
                    <div class="text-xs text-white/70">Gems</div>
                  </div>
                  <div class="bg-orange-500/20 rounded-xl p-3 text-center">
                    <div class="text-2xl mb-1">🔥</div>
                    <div class="text-white font-bold">15</div>
                    <div class="text-xs text-white/70">Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sistema de Vidas -->
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Mock do Sistema de Vidas -->
            <div class="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30">
              <div class="text-center mb-6">
                <h4 class="text-2xl font-bold text-white mb-2">💖 Sistema de Vidas</h4>
                <p class="text-white/70">Gerencie suas tentativas estrategicamente</p>
              </div>

              <div class="space-y-4">
                <div class="flex items-center justify-between bg-white/10 rounded-xl p-4">
                  <div class="flex items-center space-x-3">
                    <div class="flex space-x-1">
                      <span class="text-2xl">💖</span>
                      <span class="text-2xl">💖</span>
                      <span class="text-2xl">💖</span>
                      <span class="text-2xl opacity-30">💖</span>
                      <span class="text-2xl opacity-30">💖</span>
                    </div>
                    <span class="text-white font-medium">3/5 Vidas</span>
                  </div>
                </div>
                
                <div class="bg-white/5 rounded-xl p-4">
                  <p class="text-white/80 text-sm mb-2">⏰ Próxima vida em: <strong>8 minutos</strong></p>
                  <div class="w-full bg-white/20 rounded-full h-2">
                    <div class="bg-red-400 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>

                <div class="text-center">
                  <button class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-medium">
                    💎 Restaurar Vidas (5 Gems)
                  </button>
                </div>
              </div>
            </div>

            <!-- Explicação do Sistema -->
            <div>
              <h3 class="text-3xl font-bold text-white mb-6">
                💖 Gerencie suas Vidas
              </h3>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">💖</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Sistema Estratégico</h4>
                    <p class="text-white/70">
                      Você perde uma vida a cada erro. Isso torna cada resposta mais significativa 
                      e incentiva o foco durante o aprendizado.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">⏰</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Regeneração Automática</h4>
                    <p class="text-white/70">
                      As vidas se regeneram automaticamente ao longo do tempo, 
                      ou você pode usar gems para recuperá-las instantaneamente.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">⭐</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Planos Premium</h4>
                    <p class="text-white/70">
                      Assinantes têm mais vidas, regeneração mais rápida e 
                      até vidas ilimitadas no plano Mestre!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mapa de Progressão -->
      <section class="py-20 bg-white/5 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              🗺️ Mapa de Aprendizado Interativo
            </h2>
            <p class="text-white/60 text-lg">
              Sua jornada visualizada como um mapa de aventura!
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Mock do Mapa -->
            <div class="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 border border-blue-400/30">
              <h4 class="text-xl font-bold text-white text-center mb-6">Sua Jornada de Inglês</h4>
              
              <div class="relative space-y-8">
                <!-- Path -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                  <path 
                    d="M 50 50 Q 150 100 250 150 T 250 250 T 150 350"
                    stroke="rgba(255,255,255,0.3)" 
                    stroke-width="4" 
                    fill="none"
                    stroke-dasharray="10,5">
                  </path>
                </svg>

                <!-- Units -->
                <div class="relative z-10 space-y-8">
                  <!-- Unit 1 - Completed -->
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-white">
                      <span class="text-2xl">📚</span>
                    </div>
                    <div>
                      <h5 class="text-white font-bold">Basic English</h5>
                      <p class="text-green-400 text-sm">✅ Completo - 100% XP</p>
                    </div>
                    <div class="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span class="text-sm">⭐</span>
                    </div>
                  </div>

                  <!-- Unit 2 - In Progress -->
                  <div class="flex items-center space-x-4 ml-8">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-white animate-pulse">
                      <span class="text-2xl">💬</span>
                    </div>
                    <div>
                      <h5 class="text-white font-bold">Common Phrases</h5>
                      <p class="text-blue-400 text-sm">🔓 Em progresso - 60% XP</p>
                    </div>
                  </div>

                  <!-- Unit 3 - Locked -->
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center border-4 border-white opacity-50">
                      <span class="text-2xl">📖</span>
                    </div>
                    <div>
                      <h5 class="text-white/50 font-bold">Advanced Grammar</h5>
                      <p class="text-gray-400 text-sm">🔒 Bloqueado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Explicação -->
            <div>
              <h3 class="text-3xl font-bold text-white mb-6">
                📍 Progressão Não-Linear
              </h3>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Desbloqueio Inteligente</h4>
                    <p class="text-white/70">
                      Complete unidades para desbloquear as próximas. Cada conquista 
                      abre novos caminhos no mapa de aprendizado.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Múltiplos Caminhos</h4>
                    <p class="text-white/70">
                      Escolha sua própria jornada! Alguns tópicos podem ser acessados 
                      através de diferentes rotas de aprendizado.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span class="text-white text-sm">🏆</span>
                  </div>
                  <div>
                    <h4 class="text-white font-medium mb-2">Conquistas Especiais</h4>
                    <p class="text-white/70">
                      Algumas unidades têm desafios especiais que desbloqueiam 
                      conteúdo bônus e recompensas exclusivas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Diferenças dos Planos -->
      <section class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              💎 O que Muda entre os Planos?
            </h2>
            <p class="text-white/60 text-lg">
              Veja as diferenças práticas na sua experiência de aprendizado
            </p>
          </div>

          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Descobridor -->
            <div class="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border border-green-400/30">
              <div class="text-center mb-6">
                <div class="text-4xl mb-3">🆓</div>
                <h3 class="text-xl font-bold text-white">DESCOBRIDOR</h3>
                <p class="text-green-400 font-medium">Grátis para sempre</p>
              </div>

              <div class="space-y-4">
                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">📚 Conteúdo Limitado</h4>
                  <p class="text-white/70 text-sm">Acesso às 2 primeiras unidades para experimentar a plataforma</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">⚡ 50 XP por dia</h4>
                  <p class="text-white/70 text-sm">Limite diário para manter o engajamento saudável</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">💖 3 Vidas básicas</h4>
                  <p class="text-white/70 text-sm">Regeneração padrão de vidas ao longo do tempo</p>
                </div>
              </div>
            </div>

            <!-- Explorador -->
            <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400 transform scale-105">
              <div class="text-center mb-6">
                <div class="text-4xl mb-3">⭐</div>
                <h3 class="text-xl font-bold text-white">EXPLORADOR</h3>
                <p class="text-purple-400 font-medium">R$ 10/mês - Mais Popular</p>
              </div>

              <div class="space-y-4">
                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">🌍 Acesso Total</h4>
                  <p class="text-white/70 text-sm">Todas as unidades, lições e conteúdos disponíveis</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">🚀 XP Ilimitado</h4>
                  <p class="text-white/70 text-sm">Estude quanto quiser, sem limites diários</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">💖 5 Vidas + Recarga</h4>
                  <p class="text-white/70 text-sm">Mais vidas e regeneração 2x mais rápida</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">🛡️ Streak Freeze</h4>
                  <p class="text-white/70 text-sm">Proteja sua sequência até 3x por mês</p>
                </div>
              </div>
            </div>

            <!-- Mestre -->
            <div class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30">
              <div class="text-center mb-6">
                <div class="text-4xl mb-3">🔥</div>
                <h3 class="text-xl font-bold text-white">MESTRE</h3>
                <p class="text-yellow-400 font-medium">R$ 25/mês - Premium</p>
              </div>

              <div class="space-y-4">
                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">🤖 IA Personalizada</h4>
                  <p class="text-white/70 text-sm">Conteúdo adaptado ao seu ritmo e dificuldades</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">♾️ Vidas Infinitas</h4>
                  <p class="text-white/70 text-sm">Estude sem se preocupar com vidas ou pausas</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">📊 Relatórios IA</h4>
                  <p class="text-white/70 text-sm">Análises detalhadas do seu progresso semanalmente</p>
                </div>

                <div class="bg-white/10 rounded-xl p-4">
                  <h4 class="text-white font-medium mb-2">🏆 Conteúdo Exclusivo</h4>
                  <p class="text-white/70 text-sm">Lições especiais e certificados oficiais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/30">
            <div class="text-6xl mb-6">🎯</div>
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para Começar?
            </h2>
            <p class="text-xl text-white/80 mb-8">
              Agora que você sabe como funciona, que tal experimentar na prática? 
              Comece gratuitamente e sinta a diferença!
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                (click)="goToRegister()"
                class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                🚀 Começar Jornada Grátis
              </button>
              
              <button 
                (click)="goToPricing()"
                class="border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white/10 transition-all duration-300">
                💎 Ver Planos Premium
              </button>
            </div>

            <p class="text-white/60 text-sm mt-6">
              ✨ Sem cartão de crédito • Cancele quando quiser • Suporte 24/7
            </p>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HowItWorksComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
  }

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

  goToResources() {
    this.router.navigate(['/resources']);
  }
}