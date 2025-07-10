import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancelled',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center">
        
        <!-- Cancelled Icon -->
        <div class="text-8xl mb-8">😔</div>
        
        <!-- Cancelled Message -->
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Pagamento Cancelado
        </h1>
        
        <p class="text-xl text-white/80 mb-8">
          Não se preocupe! Você pode tentar novamente quando quiser. 
          Seus dados estão seguros e nenhuma cobrança foi feita.
        </p>

        <!-- Reassurance -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <h3 class="text-xl font-bold text-white mb-4">💡 Não tem problema!</h3>
          <div class="text-white/80 space-y-2">
            <p>✅ Nenhuma cobrança foi realizada</p>
            <p>✅ Seus dados estão seguros</p>
            <p>✅ Você pode continuar usando o plano gratuito</p>
            <p>✅ Pode tentar assinar novamente a qualquer momento</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            (click)="goToPricing()"
            class="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-400 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
            💎 Ver Planos Novamente
          </button>
          
          <button 
            (click)="goToDashboard()"
            class="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
            🏠 Voltar ao Dashboard
          </button>
        </div>

        <!-- Help Info -->
        <div class="mt-8 text-white/60 text-sm">
          <p>💬 Precisa de ajuda ou tem dúvidas sobre os planos?</p>
          <p class="mt-2">Entre em contato conosco - estamos aqui para ajudar! 😊</p>
        </div>

      </div>
    </div>
  `
})
export class PaymentCancelledComponent {

  constructor(private router: Router) {}

  goToPricing() {
    this.router.navigate(['/pricing']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}