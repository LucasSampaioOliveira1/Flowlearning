import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatRippleModule
  ],
  template: `
    <!-- Background com gradiente cyberpunk -->
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      <!-- Elementos de fundo animados -->
      <div class="absolute inset-0">
        <!-- Grid pattern -->
        <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,<svg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><g fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;><g fill=&quot;%23a855f7&quot; fill-opacity=&quot;0.05&quot;><circle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/></g></g></svg>')"></div>
        
        <!-- Floating orbs -->
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>

      <!-- Navbar minimalista -->
      <nav class="relative z-50 p-6">
        <div class="flex items-center justify-between max-w-6xl mx-auto">
          <button (click)="goToHome()" class="flex items-center space-x-3 group">
            <div class="text-2xl group-hover:animate-bounce transition-transform">🦉</div>
            <span class="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FlowLearning
            </span>
          </button>
          
          <button (click)="goToRegister()" 
                  class="text-white/80 hover:text-white transition-colors text-sm">
            Não tem conta? <span class="text-purple-400 font-semibold">Cadastre-se</span>
          </button>
        </div>
      </nav>

      <!-- Conteúdo principal -->
      <div class="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div class="w-full max-w-md">
          
          <!-- Card principal com glassmorphism -->
          <div class="glass-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            
            <!-- Header do card -->
            <div class="text-center mb-8">
              <!-- Coruja interativa -->
              <div class="relative inline-block mb-6">
                <div class="owl-container" [class.owl-happy]="loginForm.valid" [class.owl-thinking]="isLoading">
                  <div class="text-6xl transition-all duration-500 transform hover:scale-110">
                    {{ getOwlEmoji() }}
                  </div>
                  <!-- Aura da coruja -->
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              
              <h1 class="text-3xl font-bold text-white mb-2">
                Bem-vindo de volta! 👋
              </h1>
              <p class="text-white/70 text-sm">
                Entre na sua conta para continuar sua jornada de aprendizado
              </p>
            </div>

            <!-- Formulário moderno -->
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Campo Email -->
              <div class="form-group">
                <div class="relative">
                  <input 
                    type="email" 
                    formControlName="email"
                    class="modern-input peer"
                    placeholder=" "
                    [class.input-error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
                    [class.input-success]="loginForm.get('email')?.valid && loginForm.get('email')?.value">
                  
                  <label class="modern-label">
                    <mat-icon class="mr-2 text-sm">email</mat-icon>
                    Email
                  </label>
                  
                  <!-- Status indicator -->
                  <div class="absolute right-3 top-4 text-xl">
                    <span *ngIf="loginForm.get('email')?.valid && loginForm.get('email')?.value" class="text-green-400">✓</span>
                    <span *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="text-red-400">✗</span>
                  </div>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="loginForm.get('email')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Email é obrigatório
                  </span>
                  <span *ngIf="loginForm.get('email')?.hasError('email')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Email inválido
                  </span>
                </div>
              </div>

              <!-- Campo Senha -->
              <div class="form-group">
                <div class="relative">
                  <input 
                    [type]="hidePassword ? 'password' : 'text'"
                    formControlName="password"
                    class="modern-input peer pr-12"
                    placeholder=" "
                    [class.input-error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                    [class.input-success]="loginForm.get('password')?.valid && loginForm.get('password')?.value">
                  
                  <label class="modern-label">
                    <mat-icon class="mr-2 text-sm">lock</mat-icon>
                    Senha
                  </label>
                  
                  <!-- Toggle password visibility -->
                  <button 
                    type="button"
                    (click)="hidePassword = !hidePassword"
                    class="absolute right-3 top-4 text-white/60 hover:text-white transition-colors">
                    <mat-icon class="text-sm">{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="loginForm.get('password')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Senha é obrigatória
                  </span>
                </div>
              </div>

              <!-- Forgot password -->
              <div class="text-right">
                <button type="button" class="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                  Esqueceu a senha?
                </button>
              </div>

              <!-- Botão de login -->
              <button 
                type="submit" 
                [disabled]="loginForm.invalid || isLoading"
                class="modern-button w-full"
                matRipple
                [matRippleColor]="'rgba(255,255,255,0.3)'">
                
                <span *ngIf="!isLoading" class="flex items-center justify-center space-x-2">
                  <span>Entrar</span>
                  <mat-icon class="text-sm">arrow_forward</mat-icon>
                </span>
                
                <span *ngIf="isLoading" class="flex items-center justify-center space-x-2">
                  <div class="loading-spinner"></div>
                  <span>Entrando...</span>
                </span>
              </button>
            </form>

            <!-- Divider -->
            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white/20"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-transparent text-white/60">ou</span>
              </div>
            </div>

            <!-- Social login buttons -->
            <div class="space-y-3">
              <button class="social-button w-full" type="button">
                <div class="flex items-center justify-center space-x-3">
                  <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span class="text-xs text-black font-bold">G</span>
                  </div>
                  <span>Continuar com Google</span>
                </div>
              </button>
              
              <button class="social-button w-full" type="button">
                <div class="flex items-center justify-center space-x-3">
                  <div class="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span class="text-xs text-white font-bold">f</span>
                  </div>
                  <span>Continuar com Facebook</span>
                </div>
              </button>
            </div>

            <!-- Link para cadastro -->
            <div class="text-center mt-8 pt-6 border-t border-white/10">
              <p class="text-white/70 text-sm">
                Novo no FlowLearning?
                <button (click)="goToRegister()" 
                        class="text-purple-400 hover:text-purple-300 font-semibold ml-1 transition-colors">
                  Criar conta gratuita
                </button>
              </p>
            </div>
          </div>

          <!-- Footer info -->
          <div class="text-center mt-6">
            <p class="text-white/50 text-xs">
              Ao entrar, você concorda com nossos 
              <a href="#" class="text-purple-400 hover:underline">Termos</a> e 
              <a href="#" class="text-purple-400 hover:underline">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Glassmorphism Card */
    .glass-card {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 8px 32px 0 rgba(31, 38, 135, 0.37),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    }

    /* Floating Orbs */
    .floating-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
      animation: float 6s ease-in-out infinite;
    }
    
    .orb-1 {
      width: 200px;
      height: 200px;
      background: linear-gradient(45deg, #a855f7, #ec4899);
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }
    
    .orb-2 {
      width: 300px;
      height: 300px;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      top: 60%;
      right: 10%;
      animation-delay: 2s;
    }
    
    .orb-3 {
      width: 150px;
      height: 150px;
      background: linear-gradient(45deg, #06b6d4, #a855f7);
      bottom: 20%;
      left: 60%;
      animation-delay: 4s;
    }

    /* Modern Input */
    .modern-input {
      width: 100%;
      padding: 16px 16px 16px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-size: 16px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .modern-input:focus {
      outline: none;
      border-color: #a855f7;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
    }

    .modern-input.input-error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .modern-input.input-success {
      border-color: #10b981;
    }

    /* Modern Label */
    .modern-label {
      position: absolute;
      left: 16px;
      top: 16px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      transition: all 0.3s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    .modern-input:focus + .modern-label,
    .modern-input:not(:placeholder-shown) + .modern-label {
      top: -8px;
      left: 12px;
      font-size: 12px;
      color: #a855f7;
      background: rgba(0, 0, 0, 0.8);
      padding: 0 8px;
      border-radius: 6px;
    }

    /* Modern Button */
    .modern-button {
      background: linear-gradient(135deg, #a855f7, #ec4899);
      border: none;
      border-radius: 12px;
      padding: 16px 24px;
      color: white;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .modern-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
    }

    .modern-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Social Button */
    .social-button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 12px 16px;
      color: white;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .social-button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    /* Error Message */
    .error-message {
      color: #ef4444;
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    /* Loading Spinner */
    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    /* Owl States */
    .owl-container {
      transition: all 0.5s ease;
    }

    .owl-happy {
      filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
    }

    .owl-thinking {
      animation: think 2s ease-in-out infinite;
    }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes think {
      0%, 100% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .glass-card {
        margin: 16px;
        padding: 24px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getOwlEmoji(): string {
    if (this.isLoading) return '🤔';
    if (this.loginForm.valid) return '😊';
    return '🦉';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Login realizado com sucesso! 🎉', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Erro no login. Verifique suas credenciais. 😔', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}