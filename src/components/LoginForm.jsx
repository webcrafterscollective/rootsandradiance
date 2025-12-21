// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/auth.gql';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onError: (err) => {
      console.error("Login mutation error:", err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      const response = await loginUser({ variables: { username, password } });
      if (response.data?.login?.authToken && response.data?.login?.user) {
        login(response.data.login.authToken, response.data.login.user);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Caught login submission error:", err);
    }
  };

  return (
    // The class 'on-light-section' triggers the CSS overrides for black text
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-sm text-gray-900">
          Sign in to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username-login" className="block text-sm font-medium text-gray-900">
            Username or Email
          </label>
          <div className="mt-1">
            <input
              id="username-login"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-gray-900"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password-login" className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-gray-900"
            />
          </div>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-gray-900 hover:text-black hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Login failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Please check your credentials and try again.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          {/* Sign In Button: Bright Gold background, Black text */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiLogIn className={`mr-2 h-5 w-5 text-gray-900 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Signing in...' : 'Sign In'}
            {loading && (
              <svg className="animate-spin ml-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-sm text-gray-900">Not a member?</span>
          {/* Sign Up Button: White background, Black border/text */}
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-900 shadow-sm text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
          >
            <FiUserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;