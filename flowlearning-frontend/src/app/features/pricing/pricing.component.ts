import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StripeService } from '../../core/services/stripe.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
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
          <div class="flex justify-between items-center h-16 md:h-20">
            <!-- Logo -->
            <button (click)="goHome()" class="flex items-center space-x-3 group">
              <div class="text-2xl md:text-3xl group-hover:animate-bounce transition-transform">🦉</div>
              <h1 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FlowLearning
              </h1>
            </button>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-8">
              <button (click)="goToResources()" class="text-white/70 hover:text-white transition-colors">
                Recursos
              </button>
              <button (click)="goToHowItWorks()" class="text-white/70 hover:text-white transition-colors">
                Como Funciona
              </button>
              <button class="text-white font-medium border-b-2 border-purple-400">
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
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
              <mat-icon>{{ isMobileMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>

          <!-- Mobile Menu -->
          <div class="md:hidden" [class.hidden]="!isMobileMenuOpen">
            <div class="bg-white/10 backdrop-blur-md rounded-2xl mt-4 p-6 border border-white/20 space-y-4">
              <!-- Mobile Navigation Links -->
              <button 
                (click)="goToResources(); closeMobileMenu()"
                class="block w-full text-left text-white/80 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/10">
                📋 Recursos
              </button>
              
              <button 
                (click)="goToHowItWorks(); closeMobileMenu()"
                class="block w-full text-left text-white/80 hover:text-white transition-colors py-3 px-4 rounded-xl hover:bg-white/10">
                ❓ Como Funciona
              </button>
              
              <button class="block w-full text-left text-white font-medium py-3 px-4 rounded-xl bg-purple-500/20 border border-purple-400/50">
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
      <section class="relative pt-10 md:pt-20 pb-12 md:pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-5xl md:text-6xl mb-6 animate-bounce">💎</div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Escolha seu
            <span class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Plano Perfeito
            </span>
          </h1>
          <p class="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Comece grátis e evolua conforme sua jornada de aprendizado avança. 
            Cada plano foi pensado para diferentes níveis de dedicação! 🚀
          </p>
          
          <!-- Toggle anual/mensal -->
          <div class="flex items-center justify-center space-x-4 mb-8 md:mb-12">
            <span class="text-white/60 text-sm md:text-base" [class.text-white]="!isAnnual">Mensal</span>
            <button 
              (click)="toggleBilling()"
              class="relative w-14 h-7 md:w-16 md:h-8 bg-white/20 rounded-full border border-white/30 transition-all"
              [class.bg-purple-500]="isAnnual">
              <div class="absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full transition-transform"
                   [class.translate-x-7]="isAnnual"
                   [class.md:translate-x-8]="isAnnual"></div>
            </button>
            <span class="text-white/60 text-sm md:text-base" [class.text-white]="isAnnual">
              Anual 
              <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-1">-20%</span>
            </span>
          </div>
        </div>
      </section>

      <!-- Planos -->
      <section class="pb-16 md:pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-3 gap-6 md:gap-8">
            
            <!-- Plano DESCOBRIDOR (Gratuito) -->
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div class="text-center mb-6 md:mb-8">
                <div class="text-4xl md:text-5xl mb-4">🆓</div>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-2">DESCOBRIDOR</h3>
                <p class="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Perfeito para começar sua jornada</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-3xl md:text-4xl font-bold text-white">R$ 0</span>
                  <span class="text-white/60 ml-2 text-sm md:text-base">/mês</span>
                </div>
                <p class="text-green-400 text-sm">✨ Para sempre grátis</p>
              </div>

              <!-- Features -->
              <div class="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">2 unidades de conteúdo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">50 XP máximo por dia</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">3 vidas (hearts)</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Ranking da comunidade</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Progresso básico</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('free')"
                [disabled]="isProcessingPayment"
                class="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 md:py-4 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isProcessingPayment ? 'Processando...' : '✨ Começar Grátis' }}
              </button>
            </div>

            <!-- Plano EXPLORADOR -->
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 scale-105 lg:scale-110">
              <!-- Badge Mais Popular -->
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  🔥 MAIS POPULAR
                </div>
              </div>

              <div class="text-center mb-6 md:mb-8 mt-4">
                <div class="text-4xl md:text-5xl mb-4">🚀</div>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-2">EXPLORADOR</h3>
                <p class="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Para quem quer acelerar os estudos</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-3xl md:text-4xl font-bold text-white">
                    R$ {{ getExplorerPrice() }}
                  </span>
                  <span class="text-white/60 ml-2 text-sm md:text-base">{{ isAnnual ? '/ano' : '/mês' }}</span>
                </div>
                <p class="text-purple-400 text-sm" *ngIf="isAnnual">💰 Economize R$ {{ getExplorerSavings() }} por ano</p>
                <p class="text-purple-400 text-sm" *ngIf="!isAnnual">🎯 Comece sua evolução</p>
              </div>

              <!-- Features -->
              <div class="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">5 unidades de conteúdo</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">150 XP máximo por dia</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">5 vidas (hearts)</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Sem anúncios</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Relatórios detalhados</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('explorer')"
                [disabled]="isProcessingPayment"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 md:py-4 px-6 rounded-xl hover:from-purple-400 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                <mat-spinner *ngIf="isProcessingPayment && currentPlan === 'explorer'" diameter="20" class="mr-2"></mat-spinner>
                {{ (isProcessingPayment && currentPlan === 'explorer') ? 'Redirecionando...' : '🚀 Escolher Explorador' }}
              </button>
            </div>

            <!-- Plano MESTRE -->
            <div class="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 hover:border-yellow-400 transition-all duration-300">
              <div class="text-center mb-6 md:mb-8">
                <div class="text-4xl md:text-5xl mb-4">👑</div>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-2">MESTRE</h3>
                <p class="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Para estudantes dedicados</p>
                <div class="flex items-center justify-center mb-4">
                  <span class="text-3xl md:text-4xl font-bold text-white">
                    R$ {{ getMasterPrice() }}
                  </span>
                  <span class="text-white/60 ml-2 text-sm md:text-base">{{ isAnnual ? '/ano' : '/mês' }}</span>
                </div>
                <p class="text-yellow-400 text-sm" *ngIf="isAnnual">👑 Economize R$ {{ getMasterSavings() }} por ano</p>
                <p class="text-yellow-400 text-sm" *ngIf="!isAnnual">⚡ Máxima performance</p>
              </div>

              <!-- Features -->
              <div class="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Todas as unidades</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">XP ilimitado</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Vidas ilimitadas</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Suporte prioritário</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <mat-icon class="check-icon text-white">check</mat-icon>
                  </div>
                  <span class="text-white/80 text-sm md:text-base">Acesso antecipado</span>
                </div>
              </div>

              <button 
                (click)="selectPlan('master')"
                [disabled]="isProcessingPayment"
                class="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 md:py-4 px-6 rounded-xl hover:from-yellow-400 hover:to-orange-500 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                <mat-spinner *ngIf="isProcessingPayment && currentPlan === 'master'" diameter="20" class="mr-2"></mat-spinner>
                {{ (isProcessingPayment && currentPlan === 'master') ? 'Redirecionando...' : '👑 Escolher Mestre' }}
              </button>
            </div>

          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 md:py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="text-4xl md:text-5xl mb-6">🎯</div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p class="text-lg md:text-xl text-white/80 mb-8">
            Junte-se a milhares de estudantes que já transformaram seus estudos!
          </p>
          <button 
            (click)="goToRegister()"
            class="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-full text-lg md:text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
            🎯 Começar Jornada Grátis
          </button>
        </div>
      </section>
    </div>
  `
})
export class PricingComponent {
  isAnnual = false;
  isMobileMenuOpen = false;
  isProcessingPayment = false;
  currentPlan: string | null = null;

  // Preços definidos
  private readonly EXPLORER_MONTHLY = 10;
  private readonly EXPLORER_YEARLY = 96;
  private readonly MASTER_MONTHLY = 25;
  private readonly MASTER_YEARLY = 240;

  constructor(
    private router: Router,
    private stripeService: StripeService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggleBilling() {
    this.isAnnual = !this.isAnnual;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Métodos para calcular preços
  getExplorerPrice(): string {
    if (this.isAnnual) {
      return this.EXPLORER_YEARLY.toString(); // R$ 96 (valor total anual)
    }
    return this.EXPLORER_MONTHLY.toString(); // R$ 10/mês
  }

  getMasterPrice(): string {
    if (this.isAnnual) {
      return this.MASTER_YEARLY.toString(); // R$ 240 (valor total anual)
    }
    return this.MASTER_MONTHLY.toString(); // R$ 25/mês
  }

  getExplorerSavings(): string {
    const yearlyTotal = this.EXPLORER_MONTHLY * 12; // 10 * 12 = 120
    const savings = yearlyTotal - this.EXPLORER_YEARLY; // 120 - 96 = 24
    return savings.toString();
  }

  getMasterSavings(): string {
    const yearlyTotal = this.MASTER_MONTHLY * 12; // 25 * 12 = 300
    const savings = yearlyTotal - this.MASTER_YEARLY; // 300 - 240 = 60
    return savings.toString();
  }

  selectPlan(plan: string) {
    if (plan === 'free') {
      this.router.navigate(['/register']);
      return;
    }

    // Verificar se o usuário está logado
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.snackBar.open('Você precisa estar logado para assinar um plano', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/login'], { 
        queryParams: { 
          returnUrl: '/pricing',
          plan: plan.toUpperCase(),
          billing: this.isAnnual ? 'yearly' : 'monthly'
        } 
      });
      return;
    }

    this.processPayment(plan.toUpperCase() as 'EXPLORER' | 'MASTER');
  }

  private processPayment(planType: 'EXPLORER' | 'MASTER') {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.snackBar.open('Erro: usuário não encontrado', 'Fechar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isProcessingPayment = true;
    this.currentPlan = planType.toLowerCase();

    const billingCycle = this.isAnnual ? 'yearly' : 'monthly';

    this.stripeService.createCheckoutSession(currentUser.id, planType, billingCycle)
      .subscribe({
        next: (checkoutUrl) => {
          this.snackBar.open('Redirecionando para o pagamento...', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          
          // Redirecionar após um pequeno delay para melhor UX
          setTimeout(() => {
            this.stripeService.redirectToCheckout(checkoutUrl);
          }, 1000);
        },
        error: (error) => {
          console.error('Erro ao criar sessão de checkout:', error);
          this.snackBar.open(
            error.message || 'Erro ao processar pagamento. Tente novamente.', 
            'Fechar', 
            {
              duration: 5000,
              panelClass: ['error-snackbar']
            }
          );
          this.isProcessingPayment = false;
          this.currentPlan = null;
        }
      });
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

  goToResources() {
    this.router.navigate(['/resources']);
  }

  goToHowItWorks() {
    this.router.navigate(['/how-it-works']);
  }
}