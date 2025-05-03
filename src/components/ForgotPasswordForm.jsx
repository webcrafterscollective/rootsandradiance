// src/components/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

// --- IMPORTANT ---
// This is a FRONTEND PLACEHOLDER ONLY.
// You need a backend mutation (e.g., using WPGraphQL SendPasswordResetEmail)
// and potentially a new page for the user to enter their new password using the reset key.

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Simulate loading state
  const [feedback, setFeedback] = useState({ message: '', type: '' }); // 'success' or 'error'

  // Placeholder for the actual mutation call
  const handlePasswordResetRequest = async (emailToReset) => {
    // --- TODO: Replace this simulation with your actual GraphQL mutation ---
    console.log(`Simulating password reset request for: ${emailToReset}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success for now
        resolve({ success: true });
        // Simulate error (uncomment to test error state):
        // resolve({ success: false, message: "User not found or error sending email." });
      }, 1500); // Simulate network delay
    });
    // --- End TODO ---
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' }); // Clear previous feedback
    setLoading(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFeedback({ message: 'Please enter a valid email address.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await handlePasswordResetRequest(email);

      if (response.success) {
        setFeedback({
          message: 'If an account exists for this email, a password reset link has been sent.',
          type: 'success'
        });
        setEmail(''); // Clear email field on success
      } else {
        // Use a generic message for security (don't confirm if email exists)
        setFeedback({
          message: 'Could not process request. Please try again later.',
          type: 'error'
        });
        console.error("Simulated backend error:", response.message);
      }
    } catch (err) {
      console.error("Error during password reset request:", err);
      setFeedback({ message: 'An unexpected error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Consistent styling with LoginForm/RegisterForm
    <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-brand-subtle">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-brand-heading">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-brand-foreground">
          Enter your email to receive reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Feedback Area */}
        {feedback.message && (
          <div className={`p-3 rounded-md text-sm border ${
            feedback.type === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            {feedback.message}
          </div>
        )}

        <div>
          <label htmlFor="email-forgot" className="block text-sm font-medium text-brand-foreground">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-forgot"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
              disabled={loading || feedback.type === 'success'} // Disable field after success
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || feedback.type === 'success'}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiMail className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Sending...' : 'Send Reset Link'}
            {loading && (
              <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remembered your password?{' '}
        <Link to="/login" className="font-medium text-brand-primary hover:text-brand-primary-hover">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;