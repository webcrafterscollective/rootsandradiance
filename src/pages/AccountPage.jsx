// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderHistory from '../components/OrderHistory'; // --- Import the new component

const AccountPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'orders'

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="container mx-auto text-center py-10">Loading...</div>;
  }

  if (!user) {
    // This case should ideally be handled by a protected route, but it's a good fallback.
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-semibold mb-6">My Account</h1>
      
      <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
              <button
                  onClick={() => setActiveTab('details')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'details'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                  Account Details
              </button>
              <button
                  onClick={() => setActiveTab('orders')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'orders'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                  Order History
              </button>
          </nav>
      </div>

      <div>
      {activeTab === 'details' && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-brand-text-dark"> {/* <-- ADD CLASS HERE */}
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
                  <div className="space-y-3">
                      <p><strong>First Name:</strong> {user.firstName}</p>
                      <p><strong>Last Name:</strong> {user.lastName}</p>
                      <p><strong>Display Name:</strong> {user.displayName}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                  </div>
                  <button 
                      onClick={handleLogout}
                      className="mt-6 inline-block bg-red-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                      Logout
                  </button>
              </div>
          )}

          {activeTab === 'orders' && (
              <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Your Orders</h2>
                  <OrderHistory />
              </div>
          )}
      </div>

    </div>
  );
};

export default AccountPage;