// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken')); // Initialize from localStorage
  const [user, setUser] = useState(null); // Store user details if needed
  const [loading, setLoading] = useState(true); // To check initial auth status
  const client = useApolloClient(); // Get Apollo client instance

  // Placeholder: In a real app, you might want to add a GraphQL query here
  // triggered on load (if a token exists) to verify the token is still valid
  // and fetch fresh user data.
  useEffect(() => {
    const checkTokenValidity = async () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            // OPTIONAL: Add a GraphQL query here like `query Me { viewer { id databaseId username } }`
            // If it succeeds, set the user data. If it fails (e.g., token expired), call logout().
            // For simplicity now, we assume the token is valid if it exists.
            setToken(storedToken);
            // Fetch user data if needed (can be done in components using the token)
        } else {
            setToken(null);
            setUser(null);
        }
        setLoading(false);
    };
    checkTokenValidity();
  }, []);

  const login = (authToken, userData) => {
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    setUser(userData); // Store user data received from login mutation
    console.log("AuthContext: User logged in", userData);
  };

  const logout = async () => {
    console.log("AuthContext: Logging out");
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    // Important: Reset Apollo Client cache/store after logout to clear private data
    try {
       console.log("AuthContext: Resetting Apollo store...");
      await client.resetStore();
       console.log("AuthContext: Apollo store reset.");
    } catch (error) {
      console.error("Error resetting Apollo Store on logout:", error);
    }
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    loading, // Indicates if initial token check is complete
    login,
    logout,
  };

  // Don't render children until initial auth check is done
  if (loading) {
      // Optional: Render a loading spinner or null
      return null; // Or <YourGlobalSpinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};