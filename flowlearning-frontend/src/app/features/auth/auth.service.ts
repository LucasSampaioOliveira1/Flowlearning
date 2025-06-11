import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  totalXp: number;
  currentLevel: number;
  hearts: number;
  gems: number;
  streak: number;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.checkStoredAuth();
  }

  private checkStoredAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Mock login temporário (sem backend)
  login(email: string, password: string): Observable<AuthResponse> {
    // Simulando resposta do backend
    const mockUser: User = {
      id: 1,
      name: 'Usuário Teste',
      email: email,
      totalXp: 150,
      currentLevel: 2,
      hearts: 5,
      gems: 50,
      streak: 3
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token'
    };

    this.setSession(mockResponse);
    return of(mockResponse);
  }

  // Mock register temporário (sem backend)
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    const mockUser: User = {
      id: 1,
      name: name,
      email: email,
      totalXp: 0,
      currentLevel: 1,
      hearts: 5,
      gems: 0,
      streak: 0
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token'
    };

    this.setSession(mockResponse);
    return of(mockResponse);
  }

  private setSession(authResult: AuthResponse) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}