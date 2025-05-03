// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Import
import App from './App.jsx';
import client from './apolloClient'; // Import configured client
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// src/main.jsx (Check if these lines need updating)
import { AuthProvider } from './context/AuthContext.jsx'; // Changed extension
import { CartProvider } from './context/CartContext.jsx'; // Changed extension

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Wrap with ApolloProvider */}
      <BrowserRouter>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <CartProvider> {/* Wrap with CartProvider */}
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);