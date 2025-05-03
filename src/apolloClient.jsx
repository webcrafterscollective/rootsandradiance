// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// URL of your WordPress GraphQL endpoint
const graphqlUri = `${import.meta.env.VITE_WORDPRESS_BASE_URL}/graphql`;

console.log(`Connecting Apollo to GraphQL endpoint: ${graphqlUri}`);

const httpLink = createHttpLink({
  uri: graphqlUri,
});

// Middleware to add the JWT token to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// --- Global Error Handling Link ---
// Flag to prevent multiple redirects from simultaneous errors
let isRedirecting = false;

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
       console.error(
         `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`, err.extensions
       );

       // --- Check for Authentication Errors ---
       const isAuthError =
         err.extensions?.category === 'authentication' ||
         (err.message && err.message.toLowerCase().includes('expired token')) ||
         (err.extensions?.debugMessage && typeof err.extensions.debugMessage === 'string' && err.extensions.debugMessage.toLowerCase().includes('expired token'));


       if (isAuthError && !isRedirecting) {
           isRedirecting = true; // Set flag to prevent further redirects
           console.warn("Authentication error detected (Expired Token or similar). Logging out and redirecting to login.");

           // 1. Clear Authentication Token
           localStorage.removeItem('authToken');

           // 2. Clear Apollo Cache (optional but recommended)
           // client.resetStore(); // Cannot call client directly here easily

           // 3. Force Redirect to Login Page
           // Using window.location forces a full page refresh, clearing state.
           window.location.href = '/login?sessionExpired=true'; // Add query param for potential feedback on login page

           // No need to return forward(operation) as we are navigating away
           return; // Stop processing other errors if redirecting
       }
    }
  }

  if (networkError) {
      console.error(`[Network error]: ${networkError.message}`, networkError);
      // Handle network errors (e.g., offline, server unavailable)
      // Example: if (networkError.statusCode === 401) { ... specific handling ... }
  }

  // Optional: You might still forward the operation for other error types
  // return forward(operation);
});


// --- Combine the links ---
// Ensure errorLink comes before authLink so it can catch errors potentially caused by auth
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]), // Correct order
  cache: new InMemoryCache(),
});

export default client;