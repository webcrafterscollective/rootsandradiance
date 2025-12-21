// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/auth.gql';
import { useNavigate, Link } from 'react-router-dom';
import { FiUserPlus, FiLogIn } from 'react-icons/fi';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
    onError: (err) => {
      let message = `Registration failed: ${err.message}`;
      if (err.message.toLowerCase().includes("username")) {
        message = "This username is already taken. Please choose another.";
      } else if (err.message.toLowerCase().includes("email")) {
        message = "This email address is already registered.";
      }
      setFeedback({ message, type: 'error' });
    },
    onCompleted: (data) => {
      setFeedback({ message: "Registration successful! Redirecting to login...", type: 'success' });
      setTimeout(() => navigate('/login'), 2500);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    if (password !== confirmPassword) {
      setFeedback({ message: "Passwords do not match.", type: 'error' });
      return;
    }
    if (password.length < 8) {
      setFeedback({ message: "Password must be at least 8 characters long.", type: 'error' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFeedback({ message: "Please enter a valid email address.", type: 'error' });
      return;
    }

    registerUser({ variables: { username, email, password } });
  };

  return (
    // Added 'on-light-section' for global CSS compatibility
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
      <div className="mb-6 text-center">
        {/* CHANGED: Text strictly black */}
        <h2 className="text-3xl font-bold text-black">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-black">
          Join us to start your wellness journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {feedback.message && (
          <div className={`p-3 rounded-md text-sm border ${feedback.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-green-50 text-green-800 border-green-200'
            }`}>
            {feedback.message}
          </div>
        )}

        <div>
          <label htmlFor="username-register" className="block text-sm font-medium text-black">
            Username
          </label>
          <div className="mt-1">
            <input
              id="username-register"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-black"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-black">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-register"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-black"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-black">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password-register"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-black"
            />
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password-register" className="block text-sm font-medium text-black">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirm-password-register"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-black"
            />
          </div>
        </div>

        <div>
          {/* CHANGED: Button is Gold with Black Text */}
          <button
            type="submit"
            disabled={loading || feedback.type === 'success'}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiUserPlus className={`mr-2 h-5 w-5 text-black ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Creating Account...' : 'Sign Up'}
            {loading && (
              <svg className="animate-spin ml-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Footer styled exactly like LoginForm */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <span className="text-sm text-black">Already have an account?</span>
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

export default RegisterForm;