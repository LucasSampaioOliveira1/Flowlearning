import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center">
        
        <!-- Success Animation -->
        <div class="text-8xl mb-8 animate-bounce">🎉</div>
        
        <!-- Success Message -->
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Pagamento Confirmado!
        </h1>
        
        <p class="text-xl text-white/80 mb-8">
          Parabéns! Sua assinatura foi processada com sucesso. 
          Agora você tem acesso a todos os recursos do seu plano!
        </p>

        <!-- Features Unlocked -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <h3 class="text-xl font-bold text-white mb-4">✨ Recursos Desbloqueados</h3>
          <div class="grid md:grid-cols-2 gap-4 text-left">
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <mat-icon class="text-white text-sm">check</mat-icon>
              </div>
              <span class="text-white/80">Mais unidades de conteúdo</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <mat-icon class="text-white text-sm">check</mat-icon>
              </div>
              <span class="text-white/80">XP aumentado</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <mat-icon class="text-white text-sm">check</mat-icon>
              </div>
              <span class="text-white/80">Mais vidas (hearts)</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                <mat-icon class="text-white text-sm">check</mat-icon>
              </div>
              <span class="text-white/80">Experiência sem anúncios</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            (click)="goToDashboard()"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🚀 Continuar Aprendendo
          </button>
          
          <button 
            (click)="goToProfile()"
            class="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
            👤 Ver Meu Perfil
          </button>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 text-white/60 text-sm">
          <p>📧 Você receberá um email de confirmação em breve</p>
          <p class="mt-2">💬 Precisa de ajuda? Entre em contato conosco!</p>
        </div>

      </div>
    </div>
  `
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Capturar session_id do Stripe se disponível
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'] || null;
    });

    // Opcional: Fazer refresh dos dados do usuário
    // para garantir que o plano foi atualizado
    this.refreshUserData();
  }

  private refreshUserData() {
    // Você pode implementar um método no AuthService para 
    // recarregar os dados do usuário e atualizar o plano
    // this.authService.refreshCurrentUser();
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}