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
  selector: 'app-login',
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
    <div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <!-- Container principal -->
      <div class="max-w-md w-full">
        <!-- Card de login -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <!-- Mascote Coruja -->
          <div class="text-center mb-8">
            <div class="text-8xl mb-4 animate-bounce">🦉</div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Olá, estudante!</h1>
            <p class="text-gray-600">Entre para continuar sua jornada</p>
          </div>

          <!-- Formulário -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Email -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="seu@email.com">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
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
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>

            <!-- Botão de login -->
            <button 
              mat-raised-button 
              type="submit" 
              [disabled]="loginForm.invalid || isLoading"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <span *ngIf="!isLoading">Entrar 🚀</span>
              <span *ngIf="isLoading">Entrando... ⏳</span>
            </button>
          </form>

          <!-- Link para cadastro -->
          <div class="text-center mt-6">
            <p class="text-gray-600">
              Não tem conta? 
              <button (click)="goToRegister()" class="text-blue-500 hover:text-blue-700 font-semibold ml-1">
                Cadastre-se aqui! 🎯
              </button>
            </p>
          </div>

          <!-- Decorações -->
          <div class="flex justify-center mt-6 space-x-4">
            <div class="text-2xl animate-pulse">📚</div>
            <div class="text-2xl animate-pulse" style="animation-delay: 0.5s">🏆</div>
            <div class="text-2xl animate-pulse" style="animation-delay: 1s">💎</div>
          </div>
        </div>

        <!-- Elementos decorativos flutuantes -->
        <div class="fixed top-20 left-10 text-4xl animate-bounce opacity-20">📖</div>
        <div class="fixed top-40 right-20 text-4xl animate-bounce opacity-20" style="animation-delay: 1s">⭐</div>
        <div class="fixed bottom-20 left-20 text-4xl animate-bounce opacity-20" style="animation-delay: 2s">🎮</div>
      </div>
    </div>
  `
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
}