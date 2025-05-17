// // src/pages/LoginPage.jsx
// import React from 'react';
// import LoginForm from '../components/LoginForm';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const LoginPage = () => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   // Get intended destination from redirect (if any) or default to home
//   const from = location.state?.from?.pathname || "/";

//   // If user is already authenticated, redirect them away from login page
//   if (isAuthenticated) {
//     // Redirect to the page they were trying to access, or home
//     return <Navigate to={from} replace />;
//   }

//   return (
//     // Center the content vertically and horizontally, provide padding
//     <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-background to-brand-primary/5">
//       <div className="w-full max-w-md">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    // Page background: Main dark theme background
    // The gradient can be to brand-card for a very subtle depth, or removed for solid bg.
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-background">
    {/* Optional subtle gradient: bg-gradient-to-br from-brand-background to-brand-card */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;