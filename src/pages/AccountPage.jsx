// src/pages/AccountPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';

const AccountPage = () => {
  // Get auth state and functions from context
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  // Show loading state while authentication check is running
  if (loading) {
    return (
        // Consistent page structure for loading
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 text-center">
            Loading account...
        </div>
    );
  }

  // If authentication check is complete and user is not logged in, redirect
  if (!isAuthenticated) {
    // Redirect to login page, preserving the intended destination ('/account')
    // 'replace' ensures the login page doesn't get added to history stack unnecessarily
    return <Navigate to="/login" state={{ from: '/account' }} replace />;
  }

  // Render account details if authenticated
  return (
    // Apply theme background and padding
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 font-sans text-brand-foreground">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Welcome Message - Use user data from context */}
      {user && (
        // Use theme colors for border and background (subtle)
        <div className="mb-8 p-4 border border-brand-subtle rounded bg-white shadow-sm">
          <p className="text-lg">
            Welcome back, <span className="font-semibold text-brand-primary">{user.firstName || user.nicename || user.username}!</span>
          </p>
          {/* Display email if available */}
          {user.email && <p className="text-sm text-gray-600">Email: {user.email}</p>}
        </div>
      )}

      {/* Account Sections Placeholders */}
      <div className="space-y-6">
        {/* Order History Placeholder */}
        <div className="p-6 border border-brand-subtle rounded bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Order History</h2>
          <p className="text-gray-600 mb-4">You have no recent orders.</p>
          {/* TODO: Implement order fetching and display logic here */}
          <Link
            to="/shop"
            // Use theme colors for link button styling
            className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium"
          >
            Start Shopping
          </Link>
        </div>

        {/* Account Details Placeholder */}
        <div className="p-6 border border-brand-subtle rounded bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Account Details</h2>
          <p className="text-gray-600 mb-4">Manage your personal information and password.</p>
          {/* TODO: Link to an edit details page or implement inline editing */}
           <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium disabled:opacity-50" disabled>
               Edit Details (Not Implemented)
           </button>
        </div>

        {/* Logout Section */}
        <div className="mt-8 pt-6 border-t border-brand-subtle">
           {/* --- Use Accent Color for Logout Button --- */}
          <button
            onClick={handleLogout}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-2 rounded text-sm font-medium transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;