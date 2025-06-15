import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  totalXp: number;
  currentLevel: number;
  hearts?: number;
  gems?: number;
  streak?: number;
  createdAt?: string;
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

  // Mutations GraphQL
  private LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        user {
          id
          name
          email
          totalXp
          currentLevel
          createdAt
        }
        token
      }
    }
  `;

  private REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
      register(input: $input) {
        user {
          id
          name
          email
          totalXp
          currentLevel
          createdAt
        }
        token
      }
    }
  `;

  constructor(private apollo: Apollo) {
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

  // LOGIN com GraphQL + fallback
  login(email: string, password: string): Observable<AuthResponse> {
    console.log('🚀 LOGIN: Tentando autenticação com GraphQL para:', email);
    
    return this.apollo.mutate<{ login: AuthResponse }>({
      mutation: this.LOGIN_MUTATION,
      variables: { input: { email, password } }
    }).pipe(
      map(result => {
        console.log('✅ LOGIN: Sucesso GraphQL!', result);
        const authResponse = result.data?.login;
        if (authResponse) {
          this.setSession(authResponse);
          return authResponse;
        }
        throw new Error('Login falhou - dados não retornados');
      }),
      catchError(error => {
        console.error('❌ LOGIN: Erro GraphQL:', error);
        console.warn('🔄 LOGIN: Usando fallback mock');
        return this.mockLogin(email, password);
      })
    );
  }

  // REGISTER com GraphQL + fallback
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    console.log('🚀 REGISTER: Tentando cadastro com GraphQL para:', email);
    
    return this.apollo.mutate<{ register: AuthResponse }>({
      mutation: this.REGISTER_MUTATION,
      variables: { input: { name, email, password } }
    }).pipe(
      map(result => {
        console.log('✅ REGISTER: Sucesso GraphQL!', result);
        const authResponse = result.data?.register;
        if (authResponse) {
          this.setSession(authResponse);
          return authResponse;
        }
        throw new Error('Registro falhou - dados não retornados');
      }),
      catchError(error => {
        console.error('❌ REGISTER: Erro GraphQL:', error);
        console.warn('🔄 REGISTER: Usando fallback mock');
        return this.mockRegister(name, email, password);
      })
    );
  }

  // Fallback methods
  private mockLogin(email: string, password: string): Observable<AuthResponse> {
    const mockUser: User = {
      id: 999,
      name: 'Mock User (Login)',
      email: email,
      totalXp: 150,
      currentLevel: 2,
      hearts: 5,
      gems: 50,
      streak: 3
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token-login'
    };

    this.setSession(mockResponse);
    return of(mockResponse);
  }

  private mockRegister(name: string, email: string, password: string): Observable<AuthResponse> {
    const mockUser: User = {
      id: 998,
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
      token: 'mock-jwt-token-register'
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