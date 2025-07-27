// // // // // src/components/LoginForm.jsx
// // // // import React, { useState } from 'react';
// // // // import { useMutation } from '@apollo/client';
// // // // import { LOGIN_MUTATION } from '../graphql/auth.gql'; // Ensure path is correct
// // // // import { useAuth } from '../context/AuthContext';
// // // // import { useNavigate, Link, useLocation } from 'react-router-dom';
// // // // import { FiLogIn } from 'react-icons/fi'; // Optional: Add an icon

// // // // const LoginForm = () => {
// // // //   const [username, setUsername] = useState('');
// // // //   const [password, setPassword] = useState('');
// // // //   const { login } = useAuth();
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   // Get intended destination from redirect state or default to home
// // // //   const from = location.state?.from?.pathname || "/";

// // // //   const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
// // // //     onError: (err) => {
// // // //       // Error is logged globally by apolloClient, feedback is handled via `error` state below
// // // //       console.error("Login mutation error:", err.message);
// // // //     },
// // // //     // No need for onCompleted here if redirect happens after context update
// // // //   });

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!username || !password) {
// // // //       // Basic validation feedback (could use state for better UI)
// // // //       alert("Please enter both username/email and password.");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const response = await loginUser({ variables: { username, password } });

// // // //       if (response.data?.login?.authToken && response.data?.login?.user) {
// // // //         // Update auth context - this triggers redirect in LoginPage/AuthContext effect
// // // //         login(response.data.login.authToken, response.data.login.user);
// // // //         // Explicitly navigate after successful context update
// // // //         navigate(from, { replace: true });
// // // //       } else {
// // // //         // Handle cases where mutation succeeds but returns unexpected data
// // // //         console.error("Login response missing token or user data:", response);
// // // //         // Set an error state here if needed for UI feedback
// // // //       }
// // // //     } catch (err) {
// // // //       // Error state from useMutation hook will be set, handled below
// // // //       console.error("Caught login submission error:", err);
// // // //     }
// // // //   };

// // // //   return (
// // // //     // Use theme colors for background, border, shadow
// // // //     <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border border-brand-subtle">
// // // //       <div className="mb-6 text-center">
// // // //          {/* Use theme heading color */}
// // // //         <h2 className="text-3xl font-bold text-brand-heading">
// // // //           Welcome Back!
// // // //         </h2>
// // // //         <p className="mt-2 text-sm text-brand-foreground">
// // // //           Sign in to continue
// // // //         </p>
// // // //       </div>
// // // //       <form onSubmit={handleSubmit} className="space-y-6">
// // // //         <div>
// // // //           <label htmlFor="username-login" className="block text-sm font-medium text-brand-foreground">
// // // //             Username or Email
// // // //           </label>
// // // //           <div className="mt-1">
// // // //             <input
// // // //               id="username-login"
// // // //               name="username"
// // // //               type="text"
// // // //               autoComplete="username"
// // // //               required
// // // //               value={username}
// // // //               onChange={(e) => setUsername(e.target.value)}
// // // //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         <div>
// // // //           <label htmlFor="password-login" className="block text-sm font-medium text-brand-foreground">
// // // //             Password
// // // //           </label>
// // // //           <div className="mt-1">
// // // //             <input
// // // //               id="password-login"
// // // //               name="password"
// // // //               type="password"
// // // //               autoComplete="current-password"
// // // //               required
// // // //               value={password}
// // // //               onChange={(e) => setPassword(e.target.value)}
// // // //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex items-center justify-end">
// // // //           <div className="text-sm">
// // // //             {/* Use theme primary color for link */}
// // // //             <Link to="/forgot-password" className="font-medium text-brand-primary hover:text-brand-primary-hover">
// // // //               Forgot your password?
// // // //             </Link>
// // // //           </div>
// // // //         </div>

// // // //         {/* Display login error */}
// // // //         {error && (
// // // //           <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
// // // //             Login failed. Please check your credentials and try again.
// // // //           </p>
// // // //         )}

// // // //         <div>
// // // //            {/* Use theme primary color for button */}
// // // //           <button
// // // //             type="submit"
// // // //             disabled={loading}
// // // //             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-60 disabled:cursor-not-allowed"
// // // //           >
// // // //             <FiLogIn className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
// // // //             {loading ? 'Signing in...' : 'Sign in'}
// // // //             {loading && (
// // // //               <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //               </svg>
// // // //             )}
// // // //           </button>
// // // //         </div>
// // // //       </form>

// // // //       <p className="mt-6 text-center text-sm text-gray-600">
// // // //         Not a member?{' '}
// // // //         {/* Use theme primary color for link */}
// // // //         <Link to="/register" className="font-medium text-brand-primary hover:text-brand-primary-hover">
// // // //           Sign up now
// // // //         </Link>
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LoginForm;

// // // // src/components/LoginForm.jsx
// // // import React, { useState } from 'react';
// // // import { useMutation } from '@apollo/client';
// // // import { LOGIN_MUTATION } from '../graphql/auth.gql';
// // // import { useAuth } from '../context/AuthContext';
// // // import { useNavigate, Link, useLocation } from 'react-router-dom';
// // // import { FiLogIn } from 'react-icons/fi';

// // // const LoginForm = () => {
// // //   const [username, setUsername] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const { login } = useAuth();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const from = location.state?.from?.pathname || "/";

// // //   const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
// // //     onError: (err) => {
// // //       console.error("Login mutation error:", err.message);
// // //     },
// // //   });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!username || !password) {
// // //       // Simple feedback; consider a state-based message for better UI
// // //       // For now, error prop from useMutation will handle backend errors
// // //       return;
// // //     }
// // //     try {
// // //       const response = await loginUser({ variables: { username, password } });
// // //       if (response.data?.login?.authToken && response.data?.login?.user) {
// // //         login(response.data.login.authToken, response.data.login.user);
// // //         navigate(from, { replace: true });
// // //       }
// // //     } catch (err) {
// // //       console.error("Caught login submission error:", err);
// // //     }
// // //   };

// // //   return (
// // //     // Form container: Light beige background, subtle gold border for accent
// // //     // Added 'on-light-section' class to help style inputs if specific CSS is needed from index.css
// // //     <div className="bg-brand-section-light py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-brand-primary/30 on-light-section">
// // //       <div className="mb-6 text-center">
// // //         {/* Heading: Dark text for readability on light background */}
// // //         <h2 className="text-3xl font-bold text-brand-text-dark">
// // //           Welcome Back!
// // //         </h2>
// // //         {/* Sub-heading: Dark text with opacity */}
// // //         <p className="mt-2 text-sm text-brand-text-dark opacity-70">
// // //           Sign in to continue
// // //         </p>
// // //       </div>
// // //       <form onSubmit={handleSubmit} className="space-y-6">
// // //         <div>
// // //           {/* Label: Dark text */}
// // //           <label htmlFor="username-login" className="block text-sm font-medium text-brand-text-dark opacity-90">
// // //             Username or Email
// // //           </label>
// // //           <div className="mt-1">
// // //             <input
// // //               id="username-login"
// // //               name="username"
// // //               type="text"
// // //               autoComplete="username"
// // //               required
// // //               value={username}
// // //               onChange={(e) => setUsername(e.target.value)}
// // //               // Input styling for light background:
// // //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle-light rounded-md shadow-sm 
// // //                          bg-white text-brand-text-dark placeholder-gray-400 
// // //                          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// // //             />
// // //           </div>
// // //         </div>

// // //         <div>
// // //           <label htmlFor="password-login" className="block text-sm font-medium text-brand-text-dark opacity-90">
// // //             Password
// // //           </label>
// // //           <div className="mt-1">
// // //             <input
// // //               id="password-login"
// // //               name="password"
// // //               type="password"
// // //               autoComplete="current-password"
// // //               required
// // //               value={password}
// // //               onChange={(e) => setPassword(e.target.value)}
// // //               className="appearance-none block w-full px-3 py-2 border border-brand-subtle-light rounded-md shadow-sm 
// // //                          bg-white text-brand-text-dark placeholder-gray-400 
// // //                          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
// // //             />
// // //           </div>
// // //         </div>

// // //         <div className="flex items-center justify-end">
// // //           <div className="text-sm">
// // //             {/* Link: Gold color */}
// // //             <Link to="/forgot-password" className="font-medium text-brand-primary hover:text-brand-primary-hover">
// // //               Forgot your password?
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Error message: Standard red error styling for clarity */}
// // //         {error && (
// // //           <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md border border-red-300">
// // //             Login failed. Please check your credentials and try again.
// // //           </p>
// // //         )}

// // //         <div>
// // //           {/* Button: Gold background, dark text for contrast */}
// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
// // //                        text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover 
// // //                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary 
// // //                        disabled:opacity-60 disabled:cursor-not-allowed"
// // //           >
// // //             <FiLogIn className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
// // //             {loading ? 'Signing in...' : 'Sign in'}
// // //             {loading && (
// // //               <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //               </svg>
// // //             )}
// // //           </button>
// // //         </div>
// // //       </form>

// // //       <p className="mt-6 text-center text-sm text-brand-text-dark opacity-80">
// // //         Not a member?{' '}
// // //         {/* Link: Gold color */}
// // //         <Link to="/register" className="font-medium text-brand-primary hover:text-brand-primary-hover">
// // //           Sign up now
// // //         </Link>
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default LoginForm;

// // // src/components/LoginForm.jsx
// // import React, { useState } from 'react';
// // import { useMutation } from '@apollo/client';
// // import { LOGIN_MUTATION } from '../graphql/auth.gql';
// // import { useAuth } from '../context/AuthContext';
// // import { useNavigate, Link, useLocation } from 'react-router-dom';
// // import { FiLogIn } from 'react-icons/fi';

// // const LoginForm = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const { login } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const from = location.state?.from?.pathname || "/";

// //   const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
// //     onError: (err) => {
// //       console.error("Login mutation error:", err.message);
// //     },
// //   });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!username || !password) return;
// //     try {
// //       const response = await loginUser({ variables: { username, password } });
// //       if (response.data?.login?.authToken && response.data?.login?.user) {
// //         login(response.data.login.authToken, response.data.login.user);
// //         navigate(from, { replace: true });
// //       }
// //     } catch (err) {
// //       console.error("Caught login submission error:", err);
// //     }
// //   };

// //   return (
// //     // The main container is now a clean white card with a subtle border
// //     <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
// //       <div className="mb-6 text-center">
// //         {/* Headings and text are dark for high visibility on the white background */}
// //         <h2 className="text-3xl font-bold text-gray-900">
// //           Welcome Back!
// //         </h2>
// //         <p className="mt-2 text-sm text-gray-600">
// //           Sign in to continue
// //         </p>
// //       </div>
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div>
// //           <label htmlFor="username-login" className="block text-sm font-medium text-gray-700">
// //             Username or Email
// //           </label>
// //           <div className="mt-1">
// //             {/* Input fields use the 'on-light-section' styles defined in index.css */}
// //             <input
// //               id="username-login"
// //               name="username"
// //               type="text"
// //               autoComplete="username"
// //               required
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">
// //             Password
// //           </label>
// //           <div className="mt-1">
// //             <input
// //               id="password-login"
// //               name="password"
// //               type="password"
// //               autoComplete="current-password"
// //               required
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="appearance-none block w-full px-3 py-2"
// //             />
// //           </div>
// //         </div>



// //         {error && (
// //           <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
// //             Login failed. Please check your credentials and try again.
// //           </p>
// //         )}

// //         <div>
// //           {/* Button uses primary brand colors */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
// //                        text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover 
// //                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary 
// //                        disabled:opacity-60 disabled:cursor-not-allowed"
// //           >
// //             <FiLogIn className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
// //             {loading ? 'Signing in...' : 'Sign in'}
// //             {loading && (
// //               <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //               </svg>
// //             )}
// //           </button>
// //         </div>
// //       </form>

// //       <p className="mt-6 text-center text-sm text-gray-600">
// //         Not a member?{' '}
// //         <Link to="/register" className="font-medium text-brand-primary-hover hover:text-brand-primary-hover">
// //           Sign up now
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // };

// // export default LoginForm;

// // src/components/LoginForm.jsx
// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_MUTATION } from '../graphql/auth.gql';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { FiLogIn } from 'react-icons/fi';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
//     onError: (err) => {
//       console.error("Login mutation error:", err.message);
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username || !password) return;
//     try {
//       const response = await loginUser({ variables: { username, password } });
//       if (response.data?.login?.authToken && response.data?.login?.user) {
//         login(response.data.login.authToken, response.data.login.user);
//         navigate(from, { replace: true });
//       }
//     } catch (err) {
//       console.error("Caught login submission error:", err);
//     }
//   };

//   return (
//     <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
//       <div className="mb-6 text-center">
//         <h2 className="text-3xl font-bold text-gray-900">
//           Welcome Back!
//         </h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Sign in to continue
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="username-login" className="block text-sm font-medium text-gray-700">
//             Username or Email
//           </label>
//           <div className="mt-1">
//             <input
//               id="username-login"
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
//           <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <div className="mt-1">
//             <input
//               id="password-login"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="appearance-none block w-full px-3 py-2"
//             />
//           </div>
//         </div>


//         {error && (
//           <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
//             Login failed. Please check your credentials and try again.
//           </p>
//         )}

//         <div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
//                        text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover 
//                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary 
//                        disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             <FiLogIn className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
//             {loading ? 'Signing in...' : 'Sign in'}
//             {loading && (
//               <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             )}
//           </button>
//         </div>
//       </form>

//       {/* --- UPDATED SECTION --- */}
//       <div className="mt-6 pt-5 border-t border-gray-200">
//         <p className="text-center text-sm text-gray-600">
//           Not a member?{' '}
//           <Link to="/register" className="font-semibold leading-6 text-gray-600">
//             Sign up now
//           </Link>
//         </p>
//       </div>

//     </div>
//   );
// };

// export default LoginForm;

// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/auth.gql';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

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
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10 border border-gray-200 on-light-section">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to continue
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username-login" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">
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
              className="appearance-none block w-full px-3 py-2"
            />
          </div>
        </div>



        {error && (
          <p className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md border border-red-200">
            Login failed. Please check your credentials and try again.
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                       text-sm font-medium text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary 
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiLogIn className={`mr-2 h-5 w-5 ${loading ? 'hidden' : ''}`} aria-hidden="true" />
            {loading ? 'Signing in...' : 'Sign in'}
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
          Not a member?{' '}
          <Link
            to="/register"
            className="font-semibold leading-6 text-brand-primary hover:underline login-form-link" style={{ color: '#dbbe02', fontWeight: '600', lineHeight: '1.5' }}
          >
            Sign up now
          </Link>
        </p>
      </div>

    </div>
  );
};

export default LoginForm;