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
  selector: 'app-register',
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
          
          <button (click)="goToLogin()" 
                  class="text-white/80 hover:text-white transition-colors text-sm">
            Já tem conta? <span class="text-purple-400 font-semibold">Entrar</span>
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
                <div class="owl-container" [class.owl-happy]="registerForm.valid" [class.owl-excited]="registerForm.valid && registerForm.touched">
                  <div class="text-6xl transition-all duration-500 transform hover:scale-110">
                    {{ getOwlEmoji() }}
                  </div>
                  <!-- Aura da coruja -->
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
              
              <h1 class="text-3xl font-bold text-white mb-2">
                Junte-se à nossa comunidade! ✨
              </h1>
              <p class="text-white/70 text-sm">
                Crie sua conta e comece sua jornada de aprendizado hoje mesmo
              </p>
            </div>

            <!-- Formulário moderno -->
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
              
              <!-- Campo Nome -->
              <div class="form-group">
                <div class="relative">
                  <input 
                    type="text" 
                    formControlName="name"
                    class="modern-input peer"
                    placeholder=" "
                    [class.input-error]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched"
                    [class.input-success]="registerForm.get('name')?.valid && registerForm.get('name')?.value">
                  
                  <label class="modern-label">
                    <mat-icon class="mr-2 text-sm">person</mat-icon>
                    Nome Completo
                  </label>
                  
                  <!-- Status indicator -->
                  <div class="absolute right-3 top-4 text-xl">
                    <span *ngIf="registerForm.get('name')?.valid && registerForm.get('name')?.value" class="text-green-400">✓</span>
                    <span *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="text-red-400">✗</span>
                  </div>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="registerForm.get('name')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Nome é obrigatório
                  </span>
                  <span *ngIf="registerForm.get('name')?.hasError('minlength')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Nome deve ter pelo menos 2 caracteres
                  </span>
                </div>
              </div>
              
              <!-- Campo Email -->
              <div class="form-group">
                <div class="relative">
                  <input 
                    type="email" 
                    formControlName="email"
                    class="modern-input peer"
                    placeholder=" "
                    [class.input-error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                    [class.input-success]="registerForm.get('email')?.valid && registerForm.get('email')?.value">
                  
                  <label class="modern-label">
                    <mat-icon class="mr-2 text-sm">email</mat-icon>
                    Email
                  </label>
                  
                  <!-- Status indicator -->
                  <div class="absolute right-3 top-4 text-xl">
                    <span *ngIf="registerForm.get('email')?.valid && registerForm.get('email')?.value" class="text-green-400">✓</span>
                    <span *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="text-red-400">✗</span>
                  </div>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="registerForm.get('email')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Email é obrigatório
                  </span>
                  <span *ngIf="registerForm.get('email')?.hasError('email')" class="flex items-center">
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
                    [class.input-error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                    [class.input-success]="registerForm.get('password')?.valid && registerForm.get('password')?.value">
                  
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
                
                <!-- Password strength indicator -->
                <div *ngIf="registerForm.get('password')?.value" class="mt-2">
                  <div class="flex space-x-1">
                    <div class="h-1 flex-1 rounded-full" [ngClass]="{
                      'bg-red-500': passwordStrength() === 'fraca',
                      'bg-yellow-500': passwordStrength() === 'média',
                      'bg-green-500': passwordStrength() === 'forte'
                    }"></div>
                    <div class="h-1 flex-1 rounded-full" [ngClass]="{
                      'bg-gray-700': passwordStrength() === 'fraca',
                      'bg-yellow-500': passwordStrength() === 'média',
                      'bg-green-500': passwordStrength() === 'forte'
                    }"></div>
                    <div class="h-1 flex-1 rounded-full" [ngClass]="{
                      'bg-gray-700': passwordStrength() !== 'forte',
                      'bg-green-500': passwordStrength() === 'forte'
                    }"></div>
                  </div>
                  <p class="text-xs mt-1 text-white/60">
                    Força da senha: 
                    <span [ngClass]="{
                      'text-red-400': passwordStrength() === 'fraca',
                      'text-yellow-400': passwordStrength() === 'média',
                      'text-green-400': passwordStrength() === 'forte'
                    }">{{ passwordStrength() }}</span>
                  </p>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="registerForm.get('password')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Senha é obrigatória
                  </span>
                  <span *ngIf="registerForm.get('password')?.hasError('minlength')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Senha deve ter pelo menos 6 caracteres
                  </span>
                </div>
              </div>
              
              <!-- Campo Confirmar Senha -->
              <div class="form-group">
                <div class="relative">
                  <input 
                    [type]="hideConfirmPassword ? 'password' : 'text'"
                    formControlName="confirmPassword"
                    class="modern-input peer pr-12"
                    placeholder=" "
                    [class.input-error]="(registerForm.get('confirmPassword')?.invalid || registerForm.hasError('passwordMismatch')) && registerForm.get('confirmPassword')?.touched"
                    [class.input-success]="registerForm.get('confirmPassword')?.valid && !registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.value">
                  
                  <label class="modern-label">
                    <mat-icon class="mr-2 text-sm">lock_outline</mat-icon>
                    Confirmar Senha
                  </label>
                  
                  <!-- Toggle password visibility -->
                  <button 
                    type="button"
                    (click)="hideConfirmPassword = !hideConfirmPassword"
                    class="absolute right-3 top-4 text-white/60 hover:text-white transition-colors">
                    <mat-icon class="text-sm">{{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                </div>
                
                <!-- Error messages -->
                <div *ngIf="(registerForm.get('confirmPassword')?.invalid || registerForm.hasError('passwordMismatch')) && registerForm.get('confirmPassword')?.touched" 
                     class="error-message mt-2">
                  <span *ngIf="registerForm.get('confirmPassword')?.hasError('required')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Confirmação de senha é obrigatória
                  </span>
                  <span *ngIf="registerForm.hasError('passwordMismatch')" class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    As senhas não coincidem
                  </span>
                </div>
              </div>

              <!-- Termos e condições -->
              <div class="form-group">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    formControlName="termsAccepted"
                    class="w-4 h-4 accent-purple-500 cursor-pointer">
                  <label for="terms" class="ml-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
                    Li e aceito os <a href="#" class="text-purple-400 hover:text-purple-300 hover:underline">Termos de Serviço</a> e 
                    <a href="#" class="text-purple-400 hover:text-purple-300 hover:underline">Política de Privacidade</a>
                  </label>
                </div>
                <div *ngIf="registerForm.get('termsAccepted')?.invalid && registerForm.get('termsAccepted')?.touched" 
                    class="error-message mt-2">
                  <span class="flex items-center">
                    <mat-icon class="mr-1 text-sm">error</mat-icon>
                    Você precisa aceitar os termos para continuar
                  </span>
                </div>
              </div>

              <!-- Botão de cadastro -->
              <button 
                type="submit" 
                [disabled]="registerForm.invalid || isLoading"
                class="modern-button w-full"
                matRipple
                [matRippleColor]="'rgba(255,255,255,0.3)'">
                
                <span *ngIf="!isLoading" class="flex items-center justify-center space-x-2">
                  <span>Criar conta</span>
                  <mat-icon class="text-sm">person_add</mat-icon>
                </span>
                
                <span *ngIf="isLoading" class="flex items-center justify-center space-x-2">
                  <div class="loading-spinner"></div>
                  <span>Registrando...</span>
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

            <!-- Social signup buttons -->
            <div class="space-y-3">
              <button class="social-button w-full" type="button">
                <div class="flex items-center justify-center space-x-3">
                  <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span class="text-xs text-black font-bold">G</span>
                  </div>
                  <span>Registrar com Google</span>
                </div>
              </button>
              
              <button class="social-button w-full" type="button">
                <div class="flex items-center justify-center space-x-3">
                  <div class="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span class="text-xs text-white font-bold">f</span>
                  </div>
                  <span>Registrar com Facebook</span>
                </div>
              </button>
            </div>

            <!-- Link para login -->
            <div class="text-center mt-8 pt-6 border-t border-white/10">
              <p class="text-white/70 text-sm">
                Já tem uma conta?
                <button (click)="goToLogin()" 
                        class="text-purple-400 hover:text-purple-300 font-semibold ml-1 transition-colors">
                  Entrar agora
                </button>
              </p>
            </div>
          </div>

          <!-- Footer info -->
          <div class="text-center mt-6">
            <p class="text-white/50 text-xs">
              © 2025 FlowLearning • Todos os direitos reservados
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

    .owl-excited {
      animation: excited 1s ease-in-out;
    }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes excited {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-20deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(20deg); }
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
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  
  passwordStrength(): string {
    const password = this.registerForm.get('password')?.value;
    if (!password) return '';
    
    let strength = 0;
    // Comprimento mínimo
    if (password.length >= 8) strength += 1;
    // Contém números
    if (/\d/.test(password)) strength += 1;
    // Contém letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    // Contém caracteres especiais
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    if (strength <= 1) return 'fraca';
    if (strength <= 3) return 'média';
    return 'forte';
  }

  getOwlEmoji(): string {
    if (this.isLoading) return '🤔';
    if (this.registerForm.valid && this.registerForm.touched) return '🎉';
    if (this.registerForm.get('email')?.valid && this.registerForm.get('email')?.value) return '😊';
    return '🦉';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { name, email, password } = this.registerForm.value;

      this.authService.register(name, email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Conta criada com sucesso! Bem-vindo ao FlowLearning! 🎉', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Erro ao criar conta. Tente novamente. 😔', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  goToHome() {
    this.router.navigate(['/']);
  }
}