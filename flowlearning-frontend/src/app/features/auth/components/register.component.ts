import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatSnackBarModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <!-- Container principal -->
      <div class="max-w-md w-full">
        <!-- Card de registro -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <!-- Mascote Coruja Animada -->
          <div class="text-center mb-8">
            <div class="text-8xl mb-4 animate-pulse">🦉</div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Seja bem-vindo!</h1>
            <p class="text-gray-600">Crie sua conta e comece a aprender</p>
          </div>

          <!-- Formulário -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Nome -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Nome Completo</mat-label>
              <input matInput type="text" formControlName="name" placeholder="Seu nome completo">
              <mat-icon matSuffix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Nome é obrigatório
              </mat-error>
              <mat-error *ngIf="registerForm.get('name')?.hasError('minlength')">
                Nome deve ter pelo menos 2 caracteres
              </mat-error>
            </mat-form-field>

            <!-- Email -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="seu@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <!-- Senha -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Senha</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Senha deve ter pelo menos 6 caracteres
              </mat-error>
            </mat-form-field>

            <!-- Confirmar Senha -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Confirmar Senha</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword">
              <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Confirmação de senha é obrigatória
              </mat-error>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched">
                Senhas não coincidem
              </mat-error>
            </mat-form-field>

            <!-- Botão de registro -->
            <button 
              mat-raised-button 
              type="submit" 
              [disabled]="registerForm.invalid || isLoading"
              class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <span *ngIf="!isLoading">Criar Conta 🎯</span>
              <span *ngIf="isLoading">Criando conta... ⏳</span>
            </button>
          </form>

          <!-- Link para login -->
          <div class="text-center mt-6">
            <p class="text-gray-600">
              Já tem uma conta? 
              <button (click)="goToLogin()" class="text-blue-500 hover:text-blue-700 font-semibold ml-1">
                Faça login aqui! 🚀
              </button>
            </p>
          </div>

          <!-- Decorações -->
          <div class="flex justify-center mt-6 space-x-4">
            <div class="text-2xl animate-bounce">🎓</div>
            <div class="text-2xl animate-bounce" style="animation-delay: 0.5s">📖</div>
            <div class="text-2xl animate-bounce" style="animation-delay: 1s">⭐</div>
          </div>
        </div>

        <!-- Elementos decorativos flutuantes -->
        <div class="fixed top-10 right-10 text-4xl animate-bounce opacity-20">🌟</div>
        <div class="fixed top-60 left-10 text-4xl animate-bounce opacity-20" style="animation-delay: 1.5s">🎈</div>
        <div class="fixed bottom-32 right-32 text-4xl animate-bounce opacity-20" style="animation-delay: 2.5s">🚀</div>
      </div>
    </div>
  `
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
      confirmPassword: ['', [Validators.required]]
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

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { name, email, password } = this.registerForm.value;

      this.authService.register(name, email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Conta criada com sucesso! Bem-vindo! 🎉', 'Fechar', {
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
}