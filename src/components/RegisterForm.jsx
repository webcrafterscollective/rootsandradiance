// // // src/components/RegisterForm.jsx
// // import React, { useState } from 'react';
// // import { useMutation } from '@apollo/client';
// // import { REGISTER_MUTATION } from '../graphql/auth.gql'; // Ensure path is correct
// // import { useNavigate, Link } from 'react-router-dom';
// // import { FiUserPlus } from 'react-icons/fi'; // Optional: Add an icon

// // const RegisterForm = () => {
// //   const [username, setUsername] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [feedback, setFeedback] = useState({ message: '', type: '' }); // 'success' or 'error'
// //   const navigate = useNavigate();

// //   const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
// //     onError: (err) => {
// //       console.error("Registration Error:", err);
// //       // Determine specific error message
// //       let message = `Registration failed: ${err.message}`;
// //       if (err.message.toLowerCase().includes("username")) {
// //         message = "This username is already taken. Please choose another.";
// //       } else if (err.message.toLowerCase().includes("email")) {
// //         message = "This email address is already registered.";
// //       }
// //       setFeedback({ message, type: 'error' });
// //     },
// //     onCompleted: (data) => {
// //       console.log("Registration Successful:", data);
// //       setFeedback({ message: "Registration successful! Redirecting to login...", type: 'success' });
// //       // Clear form immediately
// //       setUsername('');
// //       setEmail('');
// //       setPassword('');
// //       setConfirmPassword('');
// //       // Redirect after a short delay
// //       setTimeout(() => {
// //         navigate('/login');
// //       }, 2500); // Increased delay slightly
// //     }
// //   });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setFeedback({ message: '', type: '' }); // Clear previous feedback

// //     // Client-side validation
// //     if (password !== confirmPassword) {
// //       setFeedback({ message: "Passwords do not match.", type: 'error' });
// //       return;
// //     }
// //     if (password.length < 8) { // Example: Enforce minimum length
// //       setFeedback({ message: "Password must be at least 8 characters long.", type: 'error' });
// //       return;
// //     }
// //     // Basic email format check (consider a more robust library for production)
// //     if (!/\S+@\S+\.\S+/.test(email)) {
// //         setFeedback({ message: "Please enter a valid email address.", type: 'error'});
// //         return;
// //     }

// //     console.log("Attempting registration for:", username, email);
// //     registerUser({ variables: { username, email, password } });
// //   };

// //   return (
// //     // Use theme colors for background, border, shadow
// //     <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-brand-subtle">
// //       <div className="mb-6 text-center">
// //          {/* Use theme heading color */}
// //         <h2 className="text-3xl font-bold text-brand-heading">
// //           Create Account
// //         </h2>
// //         <p className="mt-2 text-sm text-brand-foreground">
// //           Join us to start your wellness journey.
// //         </p>
// //       </div>

// //       <form onSubmit={handleSubmit} className="space-y-5">

// //         {/* Feedback Area */}
// //         {feedback.message && (
// //           <div className={`p-3 rounded-md text-sm border ${
// //             feedback.type === 'error'
// //               ? 'bg-red-50 text-red-700 border-red-200'
// //               : 'bg-green-50 text-green-700 border-green-200'
// //           }`}>
// //             {feedback.message}
// //           </div>
// //         )}

// //         <div>
// //           <label htmlFor="username-register" className="block text-sm font-medium text-brand-foreground">
// //             Username
// //           </label>
// //           <div className="mt-1">
// //             <input
// //               id="username-register"
// //               name="username"
// //               type="text"
// //               autoComplete="username"
// //               required
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           <label htmlFor="email-register" className="block text-sm font-medium text-brand-foreground">
// //             Email address
// //           </label>
// //           <div className="mt-1">
// //             <input
// //               id="email-register"
// //               name="email"
// //               type="email"
// //               autoComplete="email"
// //               required
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           <label htmlFor="password-register" className="block text-sm font-medium text-brand-foreground">
// //             Password
// //           </label>
// //           <div className="mt-1">
// //             <input
// //               id="password-register"
// //               name="password"
// //               type="password"
// //               autoComplete="new-password"
// //               required
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// //             />
// //             <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
// //           </div>
// //         </div>

// //         <div>
// //           <label htmlFor="confirm-password-register" className="block text-sm font-medium text-brand-foreground">
// //             Confirm Password
// //           </label>
// //           <div className="mt-1">
// //             <input
// //               id="confirm-password-register"
// //               name="confirmPassword"
// //               type="password"
// //               autoComplete="new-password"
// //               required
// //               value={confirmPassword}
// //               onChange={(e) => setConfirmPassword(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           {/* Use theme primary color for button */}
// //           <button
// //             type="submit"
// //             disabled={loading || feedback.type === 'success'} // Disable after success message
// //             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
// //           >
// //              <FiUserPlus className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
// //              {loading ? 'Creating Account...' : 'Sign Up'}
// //              {loading && (
// //                <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                </svg>
// //              )}
// //           </button>
// //         </div>
// //       </form>

// //       <p className="mt-6 text-center text-sm text-gray-600">
// //         Already have an account?{' '}
// //         {/* Use theme primary color for link */}
// //         <Link to="/login" className="font-medium text-brand-primary hover:text-brand-primary-hover">
// //           Log in
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // };

// // export default RegisterForm;

// // src/components/RegisterForm.jsx
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { REGISTER_MUTATION } from '../graphql/auth.gql';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiUserPlus } from 'react-icons/fi';

// const RegisterForm = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [feedback, setFeedback] = useState({ message: '', type: '' });
//   const navigate = useNavigate();

//   const [registerUser, { loading }] = useMutation(REGISTER_MUTATION, {
//     onError: (err) => {
//       let message = `Registration failed: ${err.message}`;
//       if (err.message.toLowerCase().includes("username")) {
//         message = "This username is already taken. Please choose another.";
//       } else if (err.message.toLowerCase().includes("email")) {
//         message = "This email address is already registered.";
//       }
//       setFeedback({ message, type: 'error' });
//     },
//     onCompleted: (data) => {
//       setFeedback({ message: "Registration successful! Redirecting to login...", type: 'success' });
//       setTimeout(() => navigate('/login'), 2500);
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFeedback({ message: '', type: '' });

//     if (password !== confirmPassword) {
//       setFeedback({ message: "Passwords do not match.", type: 'error' });
//       return;
//     }
//     if (password.length < 8) {
//       setFeedback({ message: "Password must be at least 8 characters long.", type: 'error' });
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//         setFeedback({ message: "Please enter a valid email address.", type: 'error'});
//         return;
//     }

//     registerUser({ variables: { username, email, password } });
//   };

//   return (
//     // Using the same white card style as the login form
//     <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
//       <div className="mb-6 text-center">
//         <h2 className="text-3xl font-bold text-gray-900">
//           Create Account
//         </h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Join us to start your wellness journey.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {feedback.message && (
//           <div className={`p-3 rounded-md text-sm border ${
//             feedback.type === 'error'
//               ? 'bg-red-50 text-red-700 border-red-200'
//               : 'bg-green-50 text-green-700 border-green-200'
//           }`}>
//             {feedback.message}
//           </div>
//         )}

//         <div>
//           <label htmlFor="username-register" className="block text-sm font-medium text-gray-700">
//             Username
//           </label>
//           <div className="mt-1">
//             <input
//               id="username-register"
//               name="username"
//               type="text"
//               autoComplete="username"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="appearance-none block w-full px-3 py-2"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">
//             Email address
//           </label>
//           <div className="mt-1">
//             <input
//               id="email-register"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="appearance-none block w-full px-3 py-2"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <div className="mt-1">
//             <input
//               id="password-register"
//               name="password"
//               type="password"
//               autoComplete="new-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="appearance-none block w-full px-3 py-2"
//             />
//             <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="confirm-password-register" className="block text-sm font-medium text-gray-700">
//             Confirm Password
//           </label>
//           <div className="mt-1">
//             <input
//               id="confirm-password-register"
//               name="confirmPassword"
//               type="password"
//               autoComplete="new-password"
//               required
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="appearance-none block w-full px-3 py-2"
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={loading || feedback.type === 'success'}
//             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//              <FiUserPlus className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
//              {loading ? 'Creating Account...' : 'Sign Up'}
//              {loading && (
//                <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                </svg>
//              )}
//           </button>
//         </div>
//       </form>

//       <p className="mt-6 text-center text-sm text-gray-600">
//         Already have an account?{' '}
//         <Link to="/login" className="font-medium text-brand-primary hover:text-brand-primary-hover">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default RegisterForm;

// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/auth.gql';
import { useNavigate, Link } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';

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
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join us to start your wellness journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {feedback.message && (
          <div className={`p-3 rounded-md text-sm border ${feedback.type === 'error'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-green-50 text-green-700 border-green-200'
            }`}>
            {feedback.message}
          </div>
        )}

        <div>
          <label htmlFor="username-register" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters.</p>
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password-register" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || feedback.type === 'success'}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiUserPlus className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Creating Account...' : 'Sign Up'}
            {loading && (
              <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-brand-primary hover:underline" style={{ color: '#000000ff', fontWeight: '600', textDecoration: 'underline' }}
          >
            Log in
          </Link>
        </p>
      </div>

    </div>
  );
};

export default RegisterForm;