// // src/pages/AccountPage.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import OrderHistory from '../components/OrderHistory'; // --- Import the new component

// const AccountPage = () => {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('details'); // 'details' or 'orders'

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (loading) {
//     return <div className="container mx-auto text-center py-10">Loading...</div>;
//   }

//   if (!user) {
//     // This case should ideally be handled by a protected route, but it's a good fallback.
//     navigate('/login');
//     return null;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
//       <h1 className="text-3xl font-semibold mb-6">My Account</h1>
      
//       <div className="border-b border-gray-200 mb-6">
//           <nav className="-mb-px flex space-x-6">
//               <button
//                   onClick={() => setActiveTab('details')}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                       activeTab === 'details'
//                           ? 'border-indigo-500 text-indigo-600'
//                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//               >
//                   Account Details
//               </button>
//               <button
//                   onClick={() => setActiveTab('orders')}
//                   className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                       activeTab === 'orders'
//                           ? 'border-indigo-500 text-indigo-600'
//                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//               >
//                   Order History
//               </button>
//           </nav>
//       </div>

//       <div>
//       {activeTab === 'details' && (
//               <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-brand-text-dark"> {/* <-- ADD CLASS HERE */}
//                   <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
//                   <div className="space-y-3">
//                       <p><strong>First Name:</strong> {user.firstName}</p>
//                       <p><strong>Last Name:</strong> {user.lastName}</p>
//                       <p><strong>Display Name:</strong> {user.displayName}</p>
//                       <p><strong>Email:</strong> {user.email}</p>
//                   </div>
//                   <button 
//                       onClick={handleLogout}
//                       className="mt-6 inline-block bg-red-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                   >
//                       Logout
//                   </button>
//               </div>
//           )}

//           {activeTab === 'orders' && (
//               <div>
//                   <h2 className="text-xl font-bold text-gray-800 mb-4">Your Orders</h2>
//                   <OrderHistory />
//               </div>
//           )}
//       </div>

//     </div>
//   );
// };

// export default AccountPage;


// src/pages/AccountPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '../graphql/auth.gql'; // Ensure this exists
import OrderHistory from '../components/OrderHistory';

const AccountPage = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'orders'
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  // Sync state with user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }
  }, [user]);

  // FIX: Handle Redirect in useEffect to avoid "Render Side Effect" warning
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      setIsEditing(false);
      // Optional: You might want to refresh the user data in AuthContext here
      alert('Profile updated successfully!');
    },
    onError: (err) => {
      console.error(err);
      alert('Failed to update profile. Please try again.');
    }
  });

  const handleUpdate = () => {
    updateUser({
      variables: {
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div className="container mx-auto text-center py-10 text-gray-900">Loading...</div>;
  }

  // Render nothing while redirecting
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-semibold mb-6 text-brand-heading">My Account</h1>
      
      <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
              <button
                  onClick={() => setActiveTab('details')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'details'
                          ? 'border-brand-primary text-brand-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                  Account Details
              </button>
              <button
                  onClick={() => setActiveTab('orders')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'orders'
                          ? 'border-brand-primary text-brand-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                  Order History
              </button>
          </nav>
      </div>

      <div>
        {activeTab === 'details' && (
          // Added 'on-light-section' for global styling consistency
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm on-light-section">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                  <button 
                      onClick={() => setIsEditing(!isEditing)} 
                      className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover underline"
                  >
                      {isEditing ? 'Cancel' : 'Edit Details'}
                  </button>
              </div>

              {isEditing ? (
                  <div className="space-y-4 max-w-md">
                      <div>
                          <label className="block text-sm font-medium text-gray-900">First Name</label>
                          <input 
                              type="text" 
                              value={formData.firstName} 
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-900">Last Name</label>
                          <input 
                              type="text" 
                              value={formData.lastName} 
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-brand-primary focus:border-brand-primary"
                          />
                      </div>
                      <button 
                          onClick={handleUpdate} 
                          disabled={updating}
                          className="bg-brand-primary text-black px-4 py-2 rounded text-sm font-medium hover:bg-brand-primary-hover disabled:opacity-50"
                      >
                          {updating ? 'Saving...' : 'Save Changes'}
                      </button>
                  </div>
              ) : (
                  <div className="space-y-3 text-gray-900">
                      <p><strong className="font-medium">First Name:</strong> {user.firstName}</p>
                      <p><strong className="font-medium">Last Name:</strong> {user.lastName}</p>
                      <p><strong className="font-medium">Email:</strong> {user.email}</p>
                  </div>
              )}

              <button 
                  onClick={handleLogout}
                  className="mt-8 inline-block bg-red-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                  Logout
              </button>
          </div>
        )}

        {activeTab === 'orders' && (
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Orders</h2>
                <OrderHistory />
            </div>
        )}
      </div>

    </div>
  );
};

export default AccountPage;