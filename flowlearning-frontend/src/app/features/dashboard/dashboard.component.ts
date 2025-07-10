import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <!-- Header aprimorado -->
      <header class="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo e mascote -->
            <div class="flex items-center space-x-3">
              <div class="text-3xl animate-bounce">🦉</div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FlowLearning
              </h1>
            </div>

            <!-- Stats do usuário -->
            <div class="flex items-center space-x-4">
              <!-- Plan Badge -->
              <div [class]="getPlanBadgeClasses()" class="px-3 py-1 rounded-full flex items-center space-x-1">
                <span class="text-lg">{{getPlanBadgeInfo().icon}}</span>
                <span class="font-bold text-sm">{{getPlanBadgeInfo().name}}</span>
              </div>

              <!-- Hearts -->
              <div class="flex items-center space-x-1 bg-red-100 px-3 py-1 rounded-full">
                <span class="text-red-500 text-xl">💖</span>
                <span class="font-bold text-red-600">{{currentUser?.hearts || 5}}</span>
              </div>

              <!-- Gems -->
              <div class="flex items-center space-x-1 bg-purple-100 px-3 py-1 rounded-full">
                <span class="text-purple-500 text-xl">💎</span>
                <span class="font-bold text-purple-600">{{currentUser?.gems || 0}}</span>
              </div>

              <!-- Streak -->
              <div class="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
                <span class="text-orange-500 text-xl">🔥</span>
                <span class="font-bold text-orange-600">{{currentUser?.streak || 0}}</span>
              </div>

              <!-- Menu do usuário (versão simples) -->
              <div class="relative">
                <button 
                  (click)="toggleUserMenu()" 
                  class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <span class="text-gray-600 text-xl">👤</span>
                </button>
                
                <!-- Dropdown menu -->
                <div *ngIf="showUserMenu" class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  <div class="px-4 py-3 border-b">
                    <p class="font-semibold text-gray-800">{{currentUser?.name}}</p>
                    <p class="text-sm text-gray-600">Level {{currentUser?.currentLevel || 1}}</p>
                    <p class="text-xs text-purple-600">{{getPlanBadgeInfo().name}}</p>
                  </div>
                  
                  <button 
                    (click)="goToPricing()" 
                    class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                    <span class="text-yellow-500">⭐</span>
                    <span>Upgrade Plano</span>
                  </button>
                  
                  <button 
                    (click)="logout()" 
                    class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600">
                    <span>🚪</span>
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Barra de XP aprimorada -->
          <div class="pb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-white/80">XP: {{currentUser?.totalXp || 0}}</span>
              <span class="text-sm font-medium text-white/80">Level {{currentUser?.currentLevel || 1}}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                [style.width.%]="getXpProgress()">
              </div>
            </div>
          </div>

          <!-- Plan Status -->
          <div *ngIf="currentUser?.plan !== 'FREE'" class="mt-2">
            <div class="text-xs text-white/70">
              <span *ngIf="isPlanActive()">
                Plano ativo até: {{getPlanExpiryFormatted()}}
              </span>
              <span *ngIf="!isPlanActive()" class="text-red-400">
                Plano expirado - Volte para o gratuito ou renove
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Conteúdo principal - Mapa de lições -->
      <main class="max-w-4xl mx-auto py-8 px-4">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Sua Jornada de Aprendizado 🗺️
          </h2>
          <p class="text-xl text-white/90 drop-shadow">
            Continue progredindo pelo mapa de conhecimento!
          </p>
        </div>

        <!-- Mapa de unidades (estilo Duolingo) -->
        <div class="relative">
          <!-- Caminho conectando as unidades -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
            <path 
              d="M 200 100 Q 300 150 400 200 T 600 300 T 400 400 T 600 500 T 400 600"
              stroke="rgba(255,255,255,0.3)" 
              stroke-width="8" 
              fill="none"
              stroke-dasharray="20,10"
              class="animate-pulse">
            </path>
          </svg>

          <!-- Unidades do curso -->
          <div class="relative z-10 space-y-16">
            <!-- Unidade 1 - Basic English -->
            <div class="flex justify-center">
              <div class="text-center group cursor-pointer" (click)="openUnit(1)">
                <div class="relative">
                  <!-- Círculo da unidade -->
                  <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 border-4 border-white">
                    <span class="text-3xl">📚</span>
                  </div>
                  <!-- Badge de completude -->
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <span class="text-lg">⭐</span>
                  </div>
                </div>
                <h3 class="text-white font-bold mt-2 drop-shadow">Basic English</h3>
                <p class="text-white/80 text-sm">Concluído ✅</p>
              </div>
            </div>

            <!-- Unidade 2 - Common Phrases -->
            <div class="flex justify-end pr-20">
              <div class="text-center group cursor-pointer" (click)="openUnit(2)">
                <div class="relative">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 border-4 border-white">
                    <span class="text-3xl">💬</span>
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center border-2 border-white">
                    <span class="text-lg">🔓</span>
                  </div>
                </div>
                <h3 class="text-white font-bold mt-2 drop-shadow">Common Phrases</h3>
                <p class="text-white/80 text-sm">Disponível 🚀</p>
              </div>
            </div>

            <!-- Unidade 3 - Advanced Grammar -->
            <div class="flex justify-start pl-20">
              <div class="text-center group">
                <div class="relative">
                  <div class="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white opacity-50">
                    <span class="text-3xl">📖</span>
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span class="text-lg">🔒</span>
                  </div>
                </div>
                <h3 class="text-white/50 font-bold mt-2">Advanced Grammar</h3>
                <p class="text-white/40 text-sm">Bloqueado</p>
              </div>
            </div>

            <!-- Unidade 4 - Conversation -->
            <div class="flex justify-center">
              <div class="text-center group">
                <div class="relative">
                  <div class="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white opacity-50">
                    <span class="text-3xl">🗣️</span>
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span class="text-lg">🔒</span>
                  </div>
                </div>
                <h3 class="text-white/50 font-bold mt-2">Conversation</h3>
                <p class="text-white/40 text-sm">Bloqueado</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div class="text-center mt-12">
          <button 
            class="bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Continuar Estudando 🎯
          </button>
        </div>
      </main>
    </div>

    <!-- Overlay para fechar menu -->
    <div *ngIf="showUserMenu" (click)="closeUserMenu()" class="fixed inset-0 z-40"></div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  goToPricing() {
    this.showUserMenu = false;
    this.router.navigate(['/pricing']);
  }

  logout() {
    this.authService.logout();
  }

  openUnit(unitNumber: number) {
    console.log(`Abrindo unidade ${unitNumber}`);
  }

  getXpProgress(): number {
    const user = this.currentUser;
    if (!user) return 0;
    
    const currentLevel = user.currentLevel || 1;
    const xpForCurrentLevel = (currentLevel - 1) * 100;
    const xpForNextLevel = currentLevel * 100;
    const currentXp = user.totalXp || 0;
    
    const progressInLevel = currentXp - xpForCurrentLevel;
    const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
    
    return Math.max(0, Math.min(100, (progressInLevel / xpNeededForLevel) * 100));
  }

  getPlanBadgeInfo() {
    return this.authService.getPlanBadgeInfo();
  }

  getPlanBadgeClasses(): string {
    const info = this.getPlanBadgeInfo();
    return `${info.color} ${info.textColor}`;
  }

  isPlanActive(): boolean {
    return this.authService.isPlanActive();
  }

  getPlanExpiryFormatted(): string {
    if (!this.currentUser?.planExpiry) return '';
    
    const date = new Date(this.currentUser.planExpiry);
    return date.toLocaleDateString('pt-BR');
  }
}