import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CREATE_CHECKOUT_SESSION_MUTATION = gql`
  mutation CreateCheckoutSession($userId: Float!, $planType: String!, $billingCycle: String!) {
    createCheckoutSession(userId: $userId, planType: $planType, billingCycle: $billingCycle)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  constructor(private apollo: Apollo) {}

  createCheckoutSession(userId: number, planType: 'EXPLORER' | 'MASTER', billingCycle: 'monthly' | 'yearly'): Observable<string> {
    return this.apollo.mutate<{ createCheckoutSession: string }>({
      mutation: CREATE_CHECKOUT_SESSION_MUTATION,
      variables: {
        userId: userId,
        planType: planType,
        billingCycle: billingCycle
      }
    }).pipe(
      map(result => {
        if (result.data?.createCheckoutSession) {
          return result.data.createCheckoutSession;
        }
        throw new Error('Falha ao criar sessão de checkout');
      })
    );
  }

  redirectToCheckout(checkoutUrl: string): void {
    window.location.href = checkoutUrl;
  }
}