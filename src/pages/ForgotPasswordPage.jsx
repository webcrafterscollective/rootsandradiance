// src/pages/ForgotPasswordPage.jsx
import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm'; // Create this component next
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const { isAuthenticated } = useAuth();

  // If user is logged in, redirect them away
  if (isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to home or account
  }

  return (
    // Consistent styling with LoginPage/RegisterPage
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-background to-brand-accent/10">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;