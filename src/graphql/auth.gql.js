// src/graphql/auth.gql.js
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login( input: {
      clientMutationId: "login", # Can be anything unique
      username: $username,
      password: $password
    }) {
      authToken
      refreshToken # Store this securely if implementing refresh logic
      user {
        id
        databaseId # WordPress User ID
        email
        nicename
        firstName
        lastName
        # Add other user fields you need
      }
    }
  }
`;

// --- NEW REGISTRATION MUTATION ---
export const REGISTER_MUTATION = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(input: {
        clientMutationId: "register", 
        username: $username,
        email: $email,
        password: $password
    }) {
        user {
            id          
            databaseId  
            username
            email
        }
    }
  }
`;
// --- END NEW ---

export const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(input: {
      clientMutationId: "forgotPassword",
      username: $username
    }) {
      user {
        databaseId
        username
      }
    }
  }
`;