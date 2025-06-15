import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  styles: [`
    .check-icon {
      font-size: 12px !important;
      width: 12px !important;
      height: 12px !important;
      line-height: 12px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  `],
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
          <div class="text-6xl mb-6 animate-bounce">💎</div>
          <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">
            Escolha seu
            <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Plano Perfeito
            </span>
          </h1>
          <p class="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Comece grátis e evolua conforme sua jornada de aprendizado avança. 
            Cada plano foi pensado para diferentes níveis de dedicação! 🚀
          </p>
          
          <!-- Toggle anual/mensal -->
          <div class="flex items-center justify-center space-x-4 mb-12">
            <span class="text-white/60" [class.text-white]="!isAnnual">Mensal</span>
            <button 
              (click)="toggleBilling()"
              class="relative w-16 h-8 bg-white/20 rounded-full border border-white/30 transition-all"
              [class.bg-purple-500]="isAnnual">
              <div class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform"
                   [class.translate-x-8]="isAnnual"></div>
            </button>
            <span class="text-white/60" [class.text-white]="isAnnual">
              Anual 
              <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-1">-20%</span>
            </span>
          </div>
        </div>
      </section>

      <!-- Planos -->
      <section class="pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 gap-8">
            
            <!-- Plano DESCOBRIDOR (Gratuito) -->
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div class="text-center mb-8">
                <div class="text-5xl mb-4">🆓</div>
                <h3 class="text-2xl font-bold text-white mb-2">DESCOBRIDOR</h3>
                <p class="text-white/60 mb-6">Perfeito para começar sua jornada</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-4xl font-bold text-white">R$ 0</span>
                  <span class="text-white/60 ml-2">/mês</span>
                </div>
                <p class="text-green-400 text-sm">✨ Para sempre grátis</p>
              </div>

              <!-- Features -->
              <div class="space-y-4 mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80">2 unidades de conteúdo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80">50 XP máximo por dia</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80">3 vidas (hearts)</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80">Ranking da comunidade</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80">Progresso básico</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('free')"
                class="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 border border-white/30">
                Começar Grátis
              </button>
            </div>

            <!-- Plano EXPLORADOR (Mais Popular) -->
            <div class="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400 hover:border-purple-300 transition-all duration-300 transform scale-105">
              <!-- Badge "Mais Popular" -->
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                  ⭐ MAIS POPULAR
                </div>
              </div>

              <div class="text-center mb-8 mt-4">
                <div class="text-5xl mb-4">⭐</div>
                <h3 class="text-2xl font-bold text-white mb-2">EXPLORADOR</h3>
                <p class="text-white/60 mb-6">Ideal para estudantes dedicados</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-4xl font-bold text-white">
                    R$ {{ isAnnual ? '8' : '10' }}
                  </span>
                  <span class="text-white/60 ml-2">/mês</span>
                </div>
                <p class="text-purple-400 text-sm" *ngIf="isAnnual">💰 Economize R$ 24/ano</p>
                <p class="text-white/60 text-sm" *ngIf="!isAnnual">Ou R$ 96/ano</p>
              </div>

              <!-- Features -->
              <div class="space-y-4 mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">Acesso completo a todas unidades</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">XP ilimitado por dia</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">5 vidas + reposição automática</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">Streak freeze (3x/mês)</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">Relatórios de progresso</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">Conquistas exclusivas</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white">Suporte prioritário</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('explorer')"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                Escolher Explorador
              </button>
            </div>

            <!-- Plano MESTRE -->
            <div class="relative bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300">
              <div class="text-center mb-8">
                <div class="text-5xl mb-4">🔥</div>
                <h3 class="text-2xl font-bold text-white mb-2">MESTRE</h3>
                <p class="text-white/60 mb-6">Para verdadeiros especialistas</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-4xl font-bold text-white">
                    R$ {{ isAnnual ? '20' : '25' }}
                  </span>
                  <span class="text-white/60 ml-2">/mês</span>
                </div>
                <p class="text-yellow-400 text-sm" *ngIf="isAnnual">💰 Economize R$ 60/ano</p>
                <p class="text-white/60 text-sm" *ngIf="!isAnnual">Ou R$ 240/ano</p>
              </div>

              <!-- Features -->
              <div class="space-y-4 mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Tudo do Explorador +</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">IA Personalizada</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Vidas infinitas</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Streak freeze ilimitado</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Conteúdo exclusivo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Certificados oficiais</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Relatórios de Performance com IA</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <mat-icon class="check-icon text-black">check</mat-icon>
                  </div>
                  <span class="text-white">Badge especial no perfil</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('master')"
                class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                Escolher Mestre
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-20 bg-white/5 backdrop-blur-sm">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-4">
              Perguntas Frequentes 🤔
            </h2>
            <p class="text-white/60">
              Tire suas dúvidas sobre nossos planos
            </p>
          </div>

          <div class="space-y-6">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 class="text-lg font-bold text-white mb-2">Posso cancelar a qualquer momento?</h3>
              <p class="text-white/70">Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.</p>
            </div>

            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 class="text-lg font-bold text-white mb-2">O que acontece com meu progresso se eu cancelar?</h3>
              <p class="text-white/70">Seu progresso será mantido e você voltará ao plano gratuito automaticamente.</p>
            </div>

            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 class="text-lg font-bold text-white mb-2">Posso trocar de plano depois?</h3>
              <p class="text-white/70">Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
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
              Pronto para começar?
            </h2>
            <p class="text-xl text-white/80 mb-8">
              Junte-se a milhares de estudantes que já transformaram seus estudos!
            </p>
            <button 
              (click)="goToRegister()"
              class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-6 px-12 rounded-full text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
              🎯 Começar Jornada Grátis
            </button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class PricingComponent {
  isAnnual = false;

  constructor(private router: Router) {}

  toggleBilling() {
    this.isAnnual = !this.isAnnual;
  }

  selectPlan(plan: string) {
    if (plan === 'free') {
      this.router.navigate(['/register']);
    } else {
      // Aqui vamos implementar a integração com pagamento
      console.log(`Selecionado plano: ${plan}`);
      this.router.navigate(['/checkout'], { queryParams: { plan, annual: this.isAnnual } });
    }
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
}