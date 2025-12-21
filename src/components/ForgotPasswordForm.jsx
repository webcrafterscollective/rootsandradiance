// src/components/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_PASSWORD_RESET_EMAIL_MUTATION } from '../graphql/auth.gql';
import { Link } from 'react-router-dom';
import { FiMail, FiLogIn } from 'react-icons/fi';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const [sendResetEmail, { loading }] = useMutation(SEND_PASSWORD_RESET_EMAIL_MUTATION, {
    onCompleted: () => {
      setFeedback({ message: 'If an account matches that email, a reset link has been sent.', type: 'success' });
      setEmail('');
    },
    onError: (error) => {
      setFeedback({ message: 'Could not send reset email. Please try again.', type: 'error' });
      console.error(error);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    sendResetEmail({ variables: { username: email } });
  };

  return (
    // Same container styling as LoginForm
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-black">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-black">
          Enter your email to receive a reset link.
        </p>
      </div>
      
      {feedback.message && (
        <div className={`p-3 mb-4 text-sm rounded border ${
          feedback.type === 'success' 
            ? 'bg-green-50 text-green-800 border-green-200' 
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">
            Email Address
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-black"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiMail className={`mr-2 h-5 w-5 text-black ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Sending...' : 'Send Reset Link'}
            {loading && (
              <svg className="animate-spin ml-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Footer styled exactly like LoginForm's Sign Up section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-sm text-black">Remembered your password?</span>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-4 py-2 border border-black shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
          >
            <FiLogIn className="mr-2 h-4 w-4" />
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;