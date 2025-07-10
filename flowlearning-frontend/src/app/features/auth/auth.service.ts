import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  // Campos opcionais (podem não vir do AuthUser)
  totalXp?: number;
  currentLevel?: number;
  hearts?: number;
  gems?: number;
  streak?: number;
  plan?: 'FREE' | 'EXPLORER' | 'MASTER';
  planExpiry?: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        name
        createdAt
      }
      token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      user {
        id
        email
        name
        createdAt
      }
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Erro ao carregar usuário do storage:', error);
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.apollo.mutate<{ login: { user: User; token: string } }>({
      mutation: LOGIN_MUTATION,
      variables: { 
        input: { 
          email, 
          password 
        } 
      }
    }).pipe(
      map(result => {
        if (result.data?.login) {
          const { user, token } = result.data.login;
          
          // Adicionar campos padrão se não existirem
          const completeUser = {
            ...user,
            totalXp: user.totalXp || 0,
            currentLevel: user.currentLevel || 1,
            hearts: user.hearts || 5,
            gems: user.gems || 0,
            streak: user.streak || 0,
            plan: user.plan || 'FREE' as 'FREE'
          };
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(completeUser));
          
          this.currentUserSubject.next(completeUser);
          
          return { user: completeUser, token };
        }
        throw new Error('Falha no login');
      })
    );
  }

  register(email: string, password: string, name: string): Observable<{ user: User; token: string }> {
    return this.apollo.mutate<{ register: { user: User; token: string } }>({
      mutation: REGISTER_MUTATION,
      variables: { 
        input: { 
          email, 
          password, 
          name 
        } 
      }
    }).pipe(
      map(result => {
        if (result.data?.register) {
          const { user, token } = result.data.register;
          
          const completeUser = {
            ...user,
            totalXp: user.totalXp || 0,
            currentLevel: user.currentLevel || 1,
            hearts: user.hearts || 5,
            gems: user.gems || 0,
            streak: user.streak || 0,
            plan: user.plan || 'FREE' as 'FREE'
          };
          
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(completeUser));
          
          this.currentUserSubject.next(completeUser);
          
          return { user: completeUser, token };
        }
        throw new Error('Falha no registro');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getUserPlan(): 'FREE' | 'EXPLORER' | 'MASTER' {
    const user = this.getCurrentUser();
    return user?.plan || 'FREE';
  }

  isPlanActive(): boolean {
    const user = this.getCurrentUser();
    if (!user?.planExpiry) return user?.plan === 'FREE';
    
    const expiryDate = new Date(user.planExpiry);
    return expiryDate > new Date();
  }

  getPlanBadgeInfo() {
    const plan = this.getUserPlan();
    
    const planInfo = {
      'FREE': {
        name: 'Descobridor',
        color: 'bg-gray-500',
        icon: '🆓',
        textColor: 'text-gray-100'
      },
      'EXPLORER': {
        name: 'Explorador',
        color: 'bg-purple-500',
        icon: '⭐',
        textColor: 'text-purple-100'
      },
      'MASTER': {
        name: 'Mestre',
        color: 'bg-yellow-500',
        icon: '🔥',
        textColor: 'text-yellow-100'
      }
    };

    return planInfo[plan];
  }
}