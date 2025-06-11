import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    this.configureApollo();
  }

  private configureApollo() {
    const httpLinkInstance = this.httpLink.create({
      uri: 'http://localhost:3000/graphql'
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        }
      };
    });

    this.apollo.create({
      link: authLink.concat(httpLinkInstance),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }

  // Queries
  LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        user {
          id
          name
          email
          totalXp
          currentLevel
        }
        token
      }
    }
  `;

  REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
      register(input: $input) {
        user {
          id
          name
          email
          totalXp
          currentLevel
        }
        token
      }
    }
  `;

  GET_ME_QUERY = gql`
    query GetMe {
      me {
        id
        name
        email
        totalXp
        currentLevel
        hearts
        gems
        streak
        avatar
        lastLoginAt
      }
    }
  `;

  GET_UNITS_QUERY = gql`
    query GetUnits {
      getUnits {
        id
        title
        isLocked
        lessons {
          id
          title
          isCompleted
          scorePercentage
        }
      }
    }
  `;

  GET_LESSON_QUERY = gql`
    query GetLesson($lessonId: Int!) {
      getLesson(lessonId: $lessonId) {
        id
        title
        description
        content
        quizzes {
          id
          question
          type
          options
          explanation
          points
        }
        userProgress {
          status
          scorePercentage
          attempts
        }
      }
    }
  `;

  COMPLETE_LESSON_MUTATION = gql`
    mutation CompleteLesson($input: CompleteLessonInput!) {
      completeLesson(input: $input) {
        status
        scorePercentage
        xpEarned
        correctAnswers
        totalQuizzes
        earnedPoints
        totalPoints
        isNewRecord
      }
    }
  `;
}