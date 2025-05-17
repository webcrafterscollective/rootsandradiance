// // // // // // src/components/Navbar.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Link, NavLink, useNavigate } from 'react-router-dom';
// // // // // import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiLogOut, FiLogIn } from 'react-icons/fi';
// // // // // import { useAuth } from '../context/AuthContext';
// // // // // import { useCart } from '../context/CartContext';

// // // // // // Import Apollo hook and the category query
// // // // // import { useQuery } from '@apollo/client';
// // // // // // Ensure this path is correct for your project structure
// // // // // import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';

// // // // // const Navbar = () => {
// // // // //     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // // //     const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
// // // // //     const { cart, loading: cartLoading } = useCart();
// // // // //     const navigate = useNavigate();

// // // // //     // Fetch categories using GraphQL
// // // // //     const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
// // // // //         GET_TOP_LEVEL_CATEGORIES_QUERY,
// // // // //         {
// // // // //             variables: { first: 4, hideEmpty: true }, // Fetch top 4 non-empty categories
// // // // //         }
// // // // //     );

// // // // //     // Extract categories from the fetched data, filtering out 'uncategorized'
// // // // //     const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

// // // // //     const handleLogout = () => {
// // // // //       logout();
// // // // //       navigate('/');
// // // // //       closeMobileMenu();
// // // // //     };

// // // // //     // --- UPDATE NavLink Classes with Theme Colors ---
// // // // //     const navLinkClass = ({ isActive }) =>
// // // // //         `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${ // Hover uses primary
// // // // //             isActive
// // // // //             ? 'text-brand-primary border-b-2 border-brand-primary' // Active uses primary
// // // // //             : 'border-b-2 border-transparent text-brand-foreground' // Default uses foreground text color
// // // // //         }`;

// // // // //     const mobileNavLinkClass = ({ isActive }) =>
// // // // //         `block py-2 px-3 rounded hover:bg-brand-primary/10 ${ // Hover uses light primary bg tint
// // // // //             isActive
// // // // //             ? 'text-brand-primary font-semibold' // Active uses primary text
// // // // //             : 'text-brand-foreground' // Default uses foreground text color
// // // // //         }`;

// // // // //     const closeMobileMenu = () => setIsMobileMenuOpen(false);

// // // // //     // Calculate cart item count safely
// // // // //     const cartItemCount = cart?.contents?.itemCount || 0;

// // // // //     return (
// // // // //         // --- UPDATE Header BG/Text from Theme ---
// // // // //         <header className="w-full bg-brand-background text-brand-foreground shadow-sm sticky top-0 z-50 font-sans">
// // // // //             {/* --- UPDATE Top Bar BG/Text from Theme --- */}
// // // // //             {/* Using primary bg for top bar */}
// // // // //             <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
// // // // //                  <span className='text-center'>Natural Skincare & Wellness</span> {/* Example Text */}
// // // // //             </div>

// // // // //             {/* Main Navigation */}
// // // // //             {/* --- UPDATE Nav Border from Theme --- */}
// // // // //             <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16">
// // // // //                 {/* Logo */}
// // // // //                 <div className="flex-shrink-0 z-20">
// // // // //                      {/* --- UPDATE Logo Text Color --- */}
// // // // //                     <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link>
// // // // //                 </div>

// // // // //                 {/* Desktop Navigation Links - Centered */}
// // // // //                 <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
// // // // //                     {/* Links will use navLinkClass defined above */}
// // // // //                     {/* <NavLink to="/shop" className={navLinkClass}>Shop</NavLink> */}
// // // // //                     {/* Dynamic Category Links */}
// // // // //                     {loadingCategories && (
// // // // //                         <span className="flex items-center text-sm text-gray-400 px-2 py-5 animate-pulse">Loading...</span>
// // // // //                     )}
// // // // //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // // // //                         <NavLink
// // // // //                             key={category.id}
// // // // //                             to={`/category/${category.slug}`}
// // // // //                             className={navLinkClass}
// // // // //                         >
// // // // //                             {category.name}
// // // // //                         </NavLink>
// // // // //                     ))}
// // // // //                     {categoryError && (
// // // // //                          <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>
// // // // //                     )}
// // // // //                     {/* Other Static Links */}
// // // // //                     <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
// // // // //                     <NavLink to="/contact-us" className={navLinkClass}>Track Order</NavLink>
// // // // //                 </div>

// // // // //                 {/* Right Icons & Mobile Menu Toggle */}
// // // // //                  {/* --- UPDATE Icon Default Color & Hover --- */}
// // // // //                  <div className="flex items-center space-x-3 sm:space-x-4 z-20 text-brand-foreground"> {/* Default icon color */}
// // // // //                      <button aria-label="Search" className="hover:text-brand-primary"><FiSearch size={20} /></button>

// // // // //                      {/* Account/Login/Logout Icon */}
// // // // //                       {!authLoading && (
// // // // //                           isAuthenticated ? (
// // // // //                              <>
// // // // //                                <Link to="/account" aria-label="Account" title={`Logged in as ${user?.nicename || 'user'}`} className="hover:text-brand-primary"><FiUser size={20} /></Link>
// // // // //                                <button onClick={handleLogout} aria-label="Logout" title="Logout" className="hover:text-brand-primary"><FiLogOut size={20} /></button>
// // // // //                              </>
// // // // //                          ) : (
// // // // //                              <Link to="/login" aria-label="Login" title="Login" className="hover:text-brand-primary"><FiLogIn size={20} /></Link>
// // // // //                          )
// // // // //                       )}
// // // // //                       {/* --- UPDATE Auth Spinner Color --- */}
// // // // //                       {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary"></div>}

// // // // //                      {/* Cart Icon with Count */}
// // // // //                       {/* --- UPDATE Cart Count BG & Spinner --- */}
// // // // //                      <Link to="/cart" aria-label="Cart" className="hover:text-brand-primary relative">
// // // // //                         <FiShoppingCart size={20} />
// // // // //                         {!cartLoading && cartItemCount > 0 && (
// // // // //                              // Use accent color for cart count background
// // // // //                              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
// // // // //                                 {cartItemCount}
// // // // //                              </span>
// // // // //                         )}
// // // // //                          {cartLoading && isAuthenticated && (
// // // // //                              <span className="absolute -top-1 -right-1 h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-brand-primary"></span>
// // // // //                          )}
// // // // //                      </Link>

// // // // //                      {/* Mobile Menu Toggle */}
// // // // //                      <button className="md:hidden p-1 text-brand-foreground hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
// // // // //                          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // // // //                      </button>
// // // // //                  </div>
// // // // //             </nav>

// // // // //             {/* Mobile Menu Flyout */}
// // // // //             <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
// // // // //              {/* --- UPDATE Mobile Menu BG/Border/Text --- */}
// // // // //              <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// // // // //                  <div className="flex justify-between items-center p-4 border-b border-brand-subtle">
// // // // //                      <h2 className="font-semibold text-brand-foreground">Menu</h2>
// // // // //                      <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-foreground hover:text-brand-primary"><FiX size={24} /></button>
// // // // //                  </div>
// // // // //                  {/* Links use mobileNavLinkClass defined above */}
// // // // //                  <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]"> {/* Adjust height calculation if header changes */}
// // // // //                      <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
// // // // //                      <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
// // // // //                      {/* Mobile Category Links */}
// // // // //                       {loadingCategories && <span className="block py-2 px-3 text-gray-400 animate-pulse">Loading...</span>}
// // // // //                       {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // // // //                          <NavLink
// // // // //                             key={category.id}
// // // // //                             to={`/category/${category.slug}`}
// // // // //                             className={mobileNavLinkClass}
// // // // //                             onClick={closeMobileMenu}
// // // // //                          >
// // // // //                             {category.name}
// // // // //                          </NavLink>
// // // // //                      ))}
// // // // //                      {categoryError && <span className="block py-2 px-3 text-red-500 text-sm">Could not load categories</span>}
// // // // //                      {/* Other Mobile Links */}
// // // // //                       <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
// // // // //                      <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink>

// // // // //                       {/* Login/Account/Logout for Mobile */}
// // // // //                        {/* --- UPDATE Mobile Menu Border/Text --- */}
// // // // //                      <div className='pt-2 border-t border-brand-subtle mt-2'>
// // // // //                           {!authLoading && (
// // // // //                              isAuthenticated ? (
// // // // //                                  <>
// // // // //                                      <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
// // // // //                                      {/* --- UPDATE Mobile Logout Text/Hover --- */}
// // // // //                                      <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-primary/10 text-brand-foreground">Logout</button>
// // // // //                                  </>
// // // // //                              ) : (
// // // // //                                  <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
// // // // //                              )
// // // // //                           )}
// // // // //                            {authLoading && <span className="block py-2 px-3 text-gray-400">Checking status...</span>}
// // // // //                      </div>
// // // // //                  </nav>
// // // // //             </div>

// // // // //         </header>
// // // // //     );
// // // // // };

// // // // // export default Navbar;

// // // // // src/components/Navbar.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { Link, NavLink, useNavigate } from 'react-router-dom'; // Add useNavigate
// // // // import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiLogOut, FiLogIn } from 'react-icons/fi';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import { useCart } from '../context/CartContext';
// // // // import { useQuery } from '@apollo/client';
// // // // import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';

// // // // const Navbar = () => {
// // // //     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // //     const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
// // // //     const { cart, loading: cartLoading } = useCart();
// // // //     const navigate = useNavigate(); // Hook for navigation

// // // //     // State for search query
// // // //     const [searchQuery, setSearchQuery] = useState(''); // New state for search input

// // // //     const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
// // // //         GET_TOP_LEVEL_CATEGORIES_QUERY,
// // // //         {
// // // //             variables: { first: 4, hideEmpty: true },
// // // //         }
// // // //     );

// // // //     const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

// // // //     const handleLogout = () => {
// // // //       logout();
// // // //       navigate('/');
// // // //       closeMobileMenu();
// // // //     };

// // // //     const navLinkClass = ({ isActive }) =>
// // // //         `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${
// // // //             isActive
// // // //             ? 'text-brand-primary border-b-2 border-brand-primary'
// // // //             : 'border-b-2 border-transparent text-brand-foreground'
// // // //         }`;

// // // //     const mobileNavLinkClass = ({ isActive }) =>
// // // //         `block py-2 px-3 rounded hover:bg-brand-primary/10 ${
// // // //             isActive
// // // //             ? 'text-brand-primary font-semibold'
// // // //             : 'text-brand-foreground'
// // // //         }`;

// // // //     const closeMobileMenu = () => setIsMobileMenuOpen(false);

// // // //     const cartItemCount = cart?.contents?.itemCount || 0;

// // // //     // --- NEW: Handle Search Submission ---
// // // //     const handleSearchSubmit = (e) => {
// // // //         e.preventDefault();
// // // //         if (searchQuery.trim()) {
// // // //             navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
// // // //             setSearchQuery(''); // Optional: Clear search input after submission
// // // //             if (isMobileMenuOpen) closeMobileMenu(); // Close mobile menu if open
// // // //         }
// // // //     };

// // // //     return (
// // // //         <header className="w-full bg-brand-background text-brand-foreground shadow-sm sticky top-0 z-50 font-sans">
// // // //             <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
// // // //                  <span className='text-center'>Natural Skincare & Wellness</span>
// // // //             </div>

// // // //             <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16">
// // // //                 <div className="flex-shrink-0 z-20">
// // // //                     <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link>
// // // //                 </div>

// // // //                 <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
// // // //                     {loadingCategories && (
// // // //                         <span className="flex items-center text-sm text-gray-400 px-2 py-5 animate-pulse">Loading...</span>
// // // //                     )}
// // // //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // // //                         <NavLink
// // // //                             key={category.id}
// // // //                             to={`/category/${category.slug}`}
// // // //                             className={navLinkClass}
// // // //                         >
// // // //                             {category.name}
// // // //                         </NavLink>
// // // //                     ))}
// // // //                     {categoryError && (
// // // //                          <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>
// // // //                     )}
// // // //                     <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
// // // //                     <NavLink to="/contact-us" className={navLinkClass}>Track Order</NavLink> {/* Consider if this should be Contact Us or a real Track Order page */}
// // // //                 </div>

// // // //                 {/* --- UPDATED: Right Icons & Search Input --- */}
// // // //                 <div className="flex items-center space-x-2 sm:space-x-3 z-20 text-brand-foreground">
// // // //                     {/* --- NEW: Search Form --- */}
// // // //                     <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
// // // //                         <input
// // // //                             type="search"
// // // //                             value={searchQuery}
// // // //                             onChange={(e) => setSearchQuery(e.target.value)}
// // // //                             placeholder="Search products..."
// // // //                             className="px-3 py-1.5 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 w-32 focus:w-48 placeholder-gray-400 bg-white text-brand-foreground"
// // // //                             aria-label="Search products"
// // // //                         />
// // // //                         <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary">
// // // //                             <FiSearch size={18} />
// // // //                         </button>
// // // //                     </form>
// // // //                     {/* Search icon for mobile (can toggle a search input or navigate to a search page) */}
// // // //                      <button onClick={() => navigate('/search')} aria-label="Search" className="sm:hidden hover:text-brand-primary"><FiSearch size={20} /></button>


// // // //                     {!authLoading && (
// // // //                           isAuthenticated ? (
// // // //                              <>
// // // //                                <Link to="/account" aria-label="Account" title={`Logged in as ${user?.nicename || 'user'}`} className="hover:text-brand-primary"><FiUser size={20} /></Link>
// // // //                                <button onClick={handleLogout} aria-label="Logout" title="Logout" className="hover:text-brand-primary"><FiLogOut size={20} /></button>
// // // //                              </>
// // // //                          ) : (
// // // //                              <Link to="/login" aria-label="Login" title="Login" className="hover:text-brand-primary"><FiLogIn size={20} /></Link>
// // // //                          )
// // // //                       )}
// // // //                       {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary"></div>}

// // // //                      <Link to="/cart" aria-label="Cart" className="hover:text-brand-primary relative">
// // // //                         <FiShoppingCart size={20} />
// // // //                         {!cartLoading && cartItemCount > 0 && (
// // // //                              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
// // // //                                 {cartItemCount}
// // // //                              </span>
// // // //                         )}
// // // //                          {cartLoading && isAuthenticated && (
// // // //                              <span className="absolute -top-1 -right-1 h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-brand-primary"></span>
// // // //                          )}
// // // //                      </Link>

// // // //                      <button className="md:hidden p-1 text-brand-foreground hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
// // // //                          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // // //                      </button>
// // // //                  </div>
// // // //             </nav>

// // // //             {/* Mobile Menu Flyout */}
// // // //             <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
// // // //              <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// // // //                  <div className="flex justify-between items-center p-4 border-b border-brand-subtle">
// // // //                      <h2 className="font-semibold text-brand-foreground">Menu</h2>
// // // //                      <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-foreground hover:text-brand-primary"><FiX size={24} /></button>
// // // //                  </div>
// // // //                  <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-110px)]"> {/* Adjusted height for search bar */}
// // // //                     {/* --- NEW: Mobile Search Form --- */}
// // // //                     <form onSubmit={handleSearchSubmit} className="mb-3">
// // // //                         <div className="relative">
// // // //                             <input
// // // //                                 type="search"
// // // //                                 value={searchQuery}
// // // //                                 onChange={(e) => setSearchQuery(e.target.value)}
// // // //                                 placeholder="Search products..."
// // // //                                 className="w-full px-3 py-2 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary placeholder-gray-400 bg-white text-brand-foreground"
// // // //                                 aria-label="Search products mobile"
// // // //                             />
// // // //                             <button type="submit" aria-label="Search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary">
// // // //                                 <FiSearch size={18} />
// // // //                             </button>
// // // //                         </div>
// // // //                     </form>

// // // //                      <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
// // // //                      <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
// // // //                       {loadingCategories && <span className="block py-2 px-3 text-gray-400 animate-pulse">Loading...</span>}
// // // //                       {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // // //                          <NavLink
// // // //                             key={category.id}
// // // //                             to={`/category/${category.slug}`}
// // // //                             className={mobileNavLinkClass}
// // // //                             onClick={closeMobileMenu}
// // // //                          >
// // // //                             {category.name}
// // // //                          </NavLink>
// // // //                      ))}
// // // //                      {categoryError && <span className="block py-2 px-3 text-red-500 text-sm">Could not load categories</span>}
// // // //                       <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
// // // //                      <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink> {/* Changed from Track Order to Contact us */}

// // // //                      <div className='pt-2 border-t border-brand-subtle mt-2'>
// // // //                           {!authLoading && (
// // // //                              isAuthenticated ? (
// // // //                                  <>
// // // //                                      <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
// // // //                                      <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-primary/10 text-brand-foreground">Logout</button>
// // // //                                  </>
// // // //                              ) : (
// // // //                                  <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
// // // //                              )
// // // //                           )}
// // // //                            {authLoading && <span className="block py-2 px-3 text-gray-400">Checking status...</span>}
// // // //                      </div>
// // // //                  </nav>
// // // //             </div>
// // // //         </header>
// // // //     );
// // // // };

// // // // export default Navbar;

// // // // src/components/Navbar.jsx
// // // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // // import { Link, NavLink, useNavigate } from 'react-router-dom';
// // // import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX /* Removed FiLogOut, FiLogIn as we'll use text */ } from 'react-icons/fi';
// // // import { useAuth } from '../context/AuthContext';
// // // import { useCart } from '../context/CartContext';
// // // import { useQuery } from '@apollo/client';
// // // import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';
// // // import { fetchProducts } from '../api/woocommerce';

// // // // Debounce function (assuming it's defined or imported as in previous responses)
// // // const debounce = (func, delay) => {
// // //     let timeoutId;
// // //     return (...args) => {
// // //         clearTimeout(timeoutId);
// // //         timeoutId = setTimeout(() => {
// // //             func.apply(this, args);
// // //         }, delay);
// // //     };
// // // };

// // // const Navbar = () => {
// // //     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //     const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
// // //     const { cart, loading: cartLoading } = useCart();
// // //     const navigate = useNavigate();

// // //     const [searchQuery, setSearchQuery] = useState('');
// // //     const [suggestions, setSuggestions] = useState([]);
// // //     const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
// // //     const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
// // //     const searchContainerRef = useRef(null); // Ref for handling clicks outside search

// // //     const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
// // //         GET_TOP_LEVEL_CATEGORIES_QUERY,
// // //         {
// // //             variables: { first: 4, hideEmpty: true },
// // //         }
// // //     );

// // //     const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

// // //     const handleLogout = () => {
// // //       logout();
// // //       navigate('/'); // Redirect to home or login page after logout
// // //       closeMobileMenu();
// // //     };

// // //     const navLinkClass = ({ isActive }) =>
// // //         `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${
// // //             isActive
// // //             ? 'text-brand-primary border-b-2 border-brand-primary'
// // //             : 'border-b-2 border-transparent text-brand-foreground'
// // //         }`;

// // //     const mobileNavLinkClass = ({ isActive }) =>
// // //         `block py-2 px-3 rounded hover:bg-brand-primary/10 ${
// // //             isActive
// // //             ? 'text-brand-primary font-semibold'
// // //             : 'text-brand-foreground'
// // //         }`;

// // //     const closeMobileMenu = () => setIsMobileMenuOpen(false);
// // //     const cartItemCount = cart?.contents?.itemCount || 0;

// // //     const handleSearchSubmit = (e) => {
// // //         e.preventDefault();
// // //         const trimmedQuery = searchQuery.trim();
// // //         if (trimmedQuery) {
// // //             navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
// // //             setIsSuggestionsVisible(false);
// // //             if (isMobileMenuOpen) closeMobileMenu();
// // //         }
// // //     };
    
// // //     const fetchSuggestions = async (query) => {
// // //         if (query.length < 2) {
// // //             setSuggestions([]); setIsSuggestionsVisible(false); return;
// // //         }
// // //         setIsLoadingSuggestions(true);
// // //         try {
// // //             const products = await fetchProducts({ search: query, per_page: 5 });
// // //             setSuggestions(Array.isArray(products) ? products : []);
// // //             setIsSuggestionsVisible(Array.isArray(products) && products.length > 0);
// // //         } catch (error) {
// // //             console.error("Failed to fetch suggestions:", error); setSuggestions([]);
// // //         }
// // //         setIsLoadingSuggestions(false);
// // //     };

// // //     const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

// // //     useEffect(() => {
// // //         if (searchQuery.trim()) debouncedFetchSuggestions(searchQuery);
// // //         else { setSuggestions([]); setIsSuggestionsVisible(false); }
// // //     }, [searchQuery, debouncedFetchSuggestions]);

// // //     useEffect(() => {
// // //         const handleClickOutside = (event) => {
// // //             if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
// // //                 setIsSuggestionsVisible(false);
// // //             }
// // //         };
// // //         document.addEventListener('mousedown', handleClickOutside);
// // //         return () => document.removeEventListener('mousedown', handleClickOutside);
// // //     }, []);

// // //     useEffect(() => {
// // //         const handleEscKey = (event) => { if (event.key === 'Escape') setIsSuggestionsVisible(false); };
// // //         document.addEventListener('keydown', handleEscKey);
// // //         return () => document.removeEventListener('keydown', handleEscKey);
// // //     }, []);

// // //     const handleSuggestionClick = (product) => {
// // //         const productName = product.name;
// // //         setSearchQuery(productName);
// // //         setIsSuggestionsVisible(false);
// // //         navigate(`/search?q=${encodeURIComponent(productName)}`);
// // //         if (isMobileMenuOpen) closeMobileMenu();
// // //     };

// // //     // Common styling for Login/Logout text buttons/links
// // //     const authButtonClass = "px-3 py-1.5 text-sm font-medium text-brand-foreground hover:text-brand-primary rounded-md hover:bg-brand-primary/10 transition-colors duration-150 ease-in-out";

// // //     return (
// // //         <header className="w-full bg-brand-background text-brand-foreground shadow-sm sticky top-0 z-50 font-sans">
// // //             <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
// // //                  <span className='text-center'>Natural Skincare & Wellness</span>
// // //             </div>

// // //             <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16">
// // //                 <div className="flex-shrink-0 z-20">
// // //                     <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link>
// // //                 </div>

// // //                 <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
// // //                     {/* Navigation Links */}
// // //                     {loadingCategories && <span className="flex items-center text-sm text-gray-400 px-2 py-5 animate-pulse">Loading...</span>}
// // //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // //                         <NavLink key={category.id} to={`/category/${category.slug}`} className={navLinkClass}>{category.name}</NavLink>
// // //                     ))}
// // //                     {categoryError && <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>}
// // //                     <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
// // //                     <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
// // //                 </div>

// // //                 <div className="flex items-center space-x-2 sm:space-x-3 z-20 text-brand-foreground">
// // //                     {/* Desktop Search */}
// // //                     <div ref={searchContainerRef} className="hidden sm:block relative">
// // //                         <form onSubmit={handleSearchSubmit} className="flex items-center" id="desktopSearchForm">
// // //                             <input
// // //                                 type="search" value={searchQuery}
// // //                                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                                 onFocus={() => { if (searchQuery.trim() && suggestions.length > 0) setIsSuggestionsVisible(true);}}
// // //                                 placeholder="Search products..."
// // //                                 className="px-3 py-1.5 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 w-32 focus:w-48 placeholder-gray-400 bg-white text-brand-foreground"
// // //                                 aria-label="Search products" autoComplete="off"
// // //                             />
// // //                             <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"><FiSearch size={18} /></button>
// // //                         </form>
// // //                         {isSuggestionsVisible && searchQuery.trim() && (
// // //                             <div className="absolute top-full mt-1.5 w-full max-w-md sm:max-w-lg md:w-[250px] lg:w-[300px] bg-white border border-brand-subtle rounded-md shadow-lg z-50 overflow-hidden
// // //                                         transition-all duration-200 ease-out opacity-0 data-[visible='true']:opacity-100 transform scale-95 data-[visible='true']:scale-100"
// // //                                  data-visible={!isLoadingSuggestions && suggestions.length > 0}>
// // //                                 {isLoadingSuggestions && <div className="p-3 text-sm text-gray-500">Loading...</div>}
// // //                                 {!isLoadingSuggestions && suggestions.length === 0 && searchQuery.length > 1 && <div className="p-3 text-sm text-gray-500">No suggestions found.</div>}
// // //                                 {!isLoadingSuggestions && suggestions.length > 0 && (
// // //                                     <ul className="max-h-60 overflow-y-auto">
// // //                                         {suggestions.map((product) => (
// // //                                             <li key={product.id}>
// // //                                                 <button type="button" onClick={() => handleSuggestionClick(product)}
// // //                                                     className="w-full text-left px-3 py-2.5 text-sm text-brand-foreground hover:bg-brand-primary/10 flex items-center gap-2">
// // //                                                     {product.images?.[0]?.src && <img src={product.images[0].src} alt="" className="w-8 h-8 object-contain rounded-sm"/>}
// // //                                                     <span className="truncate">{product.name}</span>
// // //                                                 </button>
// // //                                             </li>
// // //                                         ))}
// // //                                          <li className="border-t border-brand-subtle">
// // //                                             <button type="submit" form="desktopSearchForm"
// // //                                                 className="w-full text-center px-3 py-2.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10">
// // //                                                 Search for "{searchQuery}"
// // //                                             </button>
// // //                                         </li>
// // //                                     </ul>
// // //                                 )}
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                     <button onClick={() => navigate('/search')} aria-label="Search" className="sm:hidden p-2 hover:text-brand-primary"><FiSearch size={20} /></button>

// // //                     {/* --- MODIFIED: Auth Links/Buttons for Desktop --- */}
// // //                     {!authLoading && (
// // //                         isAuthenticated ? (
// // //                             <>
// // //                                 <Link 
// // //                                     to="/account" 
// // //                                     aria-label="My Account" 
// // //                                     title={`Logged in as ${user?.nicename || 'user'}`} 
// // //                                     className="p-2 hover:text-brand-primary flex items-center" // Kept as icon for "My Account"
// // //                                 >
// // //                                     <FiUser size={20} />
// // //                                 </Link>
// // //                                 <button
// // //                                     onClick={handleLogout}
// // //                                     aria-label="Logout"
// // //                                     title="Logout"
// // //                                     className={authButtonClass} // Use shared class for styling
// // //                                 >
// // //                                     Logout
// // //                                 </button>
// // //                             </>
// // //                         ) : (
// // //                             <Link
// // //                                 to="/login"
// // //                                 aria-label="Login"
// // //                                 title="Login"
// // //                                 className={authButtonClass} // Use shared class for styling
// // //                             >
// // //                                 Login
// // //                             </Link>
// // //                         )
// // //                     )}
// // //                     {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary"></div>}

// // //                     {/* Cart Icon */}
// // //                     <Link to="/cart" aria-label="Cart" className="p-2 hover:text-brand-primary relative">
// // //                         <FiShoppingCart size={20} />
// // //                         {!cartLoading && cartItemCount > 0 && (
// // //                              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
// // //                                 {cartItemCount}
// // //                              </span>
// // //                         )}
// // //                          {cartLoading && isAuthenticated && ( <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-brand-primary"></span> )}
// // //                     </Link>

// // //                     {/* Mobile Menu Toggle */}
// // //                     <button className="md:hidden p-1 text-brand-foreground hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
// // //                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // //                     </button>
// // //                 </div>
// // //             </nav>

// // //             {/* Mobile Menu Flyout - (This part already uses text for Login/Logout/My Account) */}
// // //             <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
// // //              <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// // //                  <div className="flex justify-between items-center p-4 border-b border-brand-subtle">
// // //                      <h2 className="font-semibold text-brand-foreground">Menu</h2>
// // //                      <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-foreground hover:text-brand-primary"><FiX size={24} /></button>
// // //                  </div>
// // //                  <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]" ref={searchContainerRef}> {/* Added ref here too for mobile search consistency */}
// // //                     {/* Mobile Search Form */}
// // //                     <form onSubmit={handleSearchSubmit} className="mb-3 relative" id="mobileSearchForm">
// // //                         <div className="relative">
// // //                             <input
// // //                                 type="search" value={searchQuery}
// // //                                 onChange={(e) => setSearchQuery(e.target.value)}
// // //                                 onFocus={() => { if (searchQuery.trim() && suggestions.length > 0) setIsSuggestionsVisible(true);}}
// // //                                 placeholder="Search products..."
// // //                                 className="w-full px-3 py-2 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary placeholder-gray-400 bg-white text-brand-foreground"
// // //                                 aria-label="Search products mobile" autoComplete="off"
// // //                             />
// // //                             <button type="submit" aria-label="Search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary"><FiSearch size={18} /></button>
// // //                         </div>
// // //                         {isSuggestionsVisible && searchQuery.trim() && (
// // //                             <div className="absolute top-full mt-1.5 w-full bg-white border border-brand-subtle rounded-md shadow-lg z-[60] overflow-hidden
// // //                                         transition-all duration-200 ease-out opacity-0 data-[visible='true']:opacity-100 transform scale-95 data-[visible='true']:scale-100"
// // //                                  data-visible={!isLoadingSuggestions && suggestions.length > 0}>
// // //                                 {isLoadingSuggestions && <div className="p-3 text-sm text-gray-500">Loading...</div>}
// // //                                 {!isLoadingSuggestions && suggestions.length === 0 && searchQuery.length > 1 && <div className="p-3 text-sm text-gray-500">No suggestions found.</div>}
// // //                                 {!isLoadingSuggestions && suggestions.length > 0 && (
// // //                                     <ul className="max-h-48 overflow-y-auto">
// // //                                         {suggestions.map((product) => (
// // //                                             <li key={product.id}>
// // //                                                 <button type="button" onClick={() => handleSuggestionClick(product)}
// // //                                                     className="w-full text-left px-3 py-2.5 text-sm text-brand-foreground hover:bg-brand-primary/10 flex items-center gap-2">
// // //                                                     {product.images?.[0]?.src && <img src={product.images[0].src} alt="" className="w-8 h-8 object-contain rounded-sm"/>}
// // //                                                     <span className="truncate">{product.name}</span>
// // //                                                 </button>
// // //                                             </li>
// // //                                         ))}
// // //                                         <li className="border-t border-brand-subtle">
// // //                                             <button type="submit" form="mobileSearchForm"
// // //                                                 className="w-full text-center px-3 py-2.5 text-sm font-medium text-brand-primary hover:bg-brand-primary/10">
// // //                                                 Search for "{searchQuery}"
// // //                                             </button>
// // //                                         </li>
// // //                                     </ul>
// // //                                 )}
// // //                             </div>
// // //                         )}
// // //                     </form>

// // //                     <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
// // //                     <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
// // //                     {loadingCategories && <span className="block py-2 px-3 text-gray-400 animate-pulse">Loading...</span>}
// // //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// // //                         <NavLink key={category.id} to={`/category/${category.slug}`} className={mobileNavLinkClass} onClick={closeMobileMenu}>{category.name}</NavLink>
// // //                     ))}
// // //                     {categoryError && <span className="block py-2 px-3 text-red-500 text-sm">Could not load categories</span>}
// // //                     <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
// // //                     <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink>

// // //                     <div className='pt-2 border-t border-brand-subtle mt-2'>
// // //                         {!authLoading && (
// // //                             isAuthenticated ? (
// // //                                 <>
// // //                                     <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
// // //                                     <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-primary/10 text-brand-foreground">Logout</button>
// // //                                 </>
// // //                             ) : (
// // //                                 <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
// // //                             )
// // //                         )}
// // //                         {authLoading && <span className="block py-2 px-3 text-gray-400">Checking status...</span>}
// // //                     </div>
// // //                  </nav>
// // //             </div>
// // //         </header>
// // //     );
// // // };

// // // export default Navbar;

// // // src/components/Navbar.jsx
// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { Link, NavLink, useNavigate } from 'react-router-dom';
// // import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
// // import { useAuth } from '../context/AuthContext';
// // import { useCart } from '../context/CartContext';
// // import { useQuery } from '@apollo/client';
// // import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';
// // import { fetchProducts } from '../api/woocommerce';

// // const debounce = (func, delay) => {
// //     let timeoutId;
// //     return (...args) => {
// //         clearTimeout(timeoutId);
// //         timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
// //     };
// // };

// // const Navbar = () => {
// //     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //     const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
// //     const { cart, loading: cartLoading } = useCart();
// //     const navigate = useNavigate();

// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [suggestions, setSuggestions] = useState([]);
// //     const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
// //     const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
// //     const searchContainerRef = useRef(null);

// //     const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
// //         GET_TOP_LEVEL_CATEGORIES_QUERY, { variables: { first: 4, hideEmpty: true } }
// //     );
// //     const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

// //     const handleLogout = () => { logout(); navigate('/'); closeMobileMenu(); };

// //     const navLinkClass = ({ isActive }) =>
// //         `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'border-b-2 border-transparent text-brand-foreground hover:text-brand-primary-light'}`;
// //     const mobileNavLinkClass = ({ isActive }) =>
// //         `block py-2 px-3 rounded hover:bg-brand-subtle ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-foreground hover:text-brand-primary-light'}`;
// //     const authButtonClass = "px-3 py-1.5 text-sm font-medium text-brand-primary-light hover:text-brand-primary rounded-md hover:bg-brand-subtle transition-colors duration-150 ease-in-out";

// //     const closeMobileMenu = () => setIsMobileMenuOpen(false);
// //     const cartItemCount = cart?.contents?.itemCount || 0;

// //     const handleSearchSubmit = (e) => {
// //         e.preventDefault();
// //         const trimmedQuery = searchQuery.trim();
// //         if (trimmedQuery) {
// //             navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
// //             setIsSuggestionsVisible(false);
// //             if (isMobileMenuOpen) closeMobileMenu();
// //         }
// //     };

// //     const fetchSuggestions = async (query) => {
// //         if (query.length < 2) { setSuggestions([]); setIsSuggestionsVisible(false); return; }
// //         setIsLoadingSuggestions(true);
// //         try {
// //             const products = await fetchProducts({ search: query, per_page: 5 });
// //             setSuggestions(Array.isArray(products) ? products : []);
// //             setIsSuggestionsVisible(Array.isArray(products) && products.length > 0);
// //         } catch (error) { console.error("Failed to fetch suggestions:", error); setSuggestions([]); }
// //         setIsLoadingSuggestions(false);
// //     };
// //     const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

// //     useEffect(() => {
// //         if (searchQuery.trim()) debouncedFetchSuggestions(searchQuery);
// //         else { setSuggestions([]); setIsSuggestionsVisible(false); }
// //     }, [searchQuery, debouncedFetchSuggestions]);

// //     useEffect(() => {
// //         const handleClickOutside = (event) => { if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) setIsSuggestionsVisible(false); };
// //         document.addEventListener('mousedown', handleClickOutside);
// //         return () => document.removeEventListener('mousedown', handleClickOutside);
// //     }, []);
// //     useEffect(() => {
// //         const handleEscKey = (event) => { if (event.key === 'Escape') setIsSuggestionsVisible(false); };
// //         document.addEventListener('keydown', handleEscKey);
// //         return () => document.removeEventListener('keydown', handleEscKey);
// //     }, []);

// //     const handleSuggestionClick = (product) => {
// //         const productName = product.name;
// //         setSearchQuery(productName);
// //         setIsSuggestionsVisible(false);
// //         navigate(`/search?q=${encodeURIComponent(productName)}`);
// //         if (isMobileMenuOpen) closeMobileMenu();
// //     };

// //     return (
// //         <header className="w-full bg-brand-card text-brand-foreground shadow-md sticky top-0 z-50 font-sans"> {/* Header BG: card (slightly lighter than main bg) */}
// //             {/* Top Bar: Gold with dark text */}
// //             <div className="bg-brand-primary text-brand-textOnPrimary text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
// //                  <span className='text-center'>Natural Skincare & Wellness</span>
// //             </div>

// //             <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16">
// //                 <div className="flex-shrink-0 z-20">
// //                     <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link> {/* Logo Gold */}
// //                 </div>

// //                 <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
// //                     {loadingCategories && <span className="flex items-center text-sm text-gray-500 px-2 py-5 animate-pulse">Loading...</span>}
// //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// //                         <NavLink key={category.id} to={`/category/${category.slug}`} className={navLinkClass}>{category.name}</NavLink>
// //                     ))}
// //                     {categoryError && <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>}
// //                     <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
// //                     <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
// //                 </div>

// //                 <div className="flex items-center space-x-2 sm:space-x-3 z-20 text-brand-primary-light"> {/* Default Icon Color: Light Gold */}
// //                     <div ref={searchContainerRef} className="hidden sm:block relative">
// //                         <form onSubmit={handleSearchSubmit} className="flex items-center" id="desktopSearchForm">
// //                             <input
// //                                 type="search" value={searchQuery}
// //                                 onChange={(e) => setSearchQuery(e.target.value)}
// //                                 onFocus={() => { if (searchQuery.trim() && suggestions.length > 0) setIsSuggestionsVisible(true);}}
// //                                 placeholder="Search products..."
// //                                 className="px-3 py-1.5 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 w-32 focus:w-48 placeholder-gray-500 bg-brand-card text-brand-foreground"
// //                                 aria-label="Search products" autoComplete="off"
// //                             />
// //                             <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-primary"><FiSearch size={18} /></button>
// //                         </form>
// //                         {isSuggestionsVisible && searchQuery.trim() && (
// //                             <div className="absolute top-full mt-1.5 w-full max-w-md sm:max-w-lg md:w-[250px] lg:w-[300px] bg-brand-card border border-brand-subtle rounded-md shadow-lg z-50 overflow-hidden
// //                                         transition-all duration-200 ease-out opacity-0 data-[visible='true']:opacity-100 transform scale-95 data-[visible='true']:scale-100"
// //                                  data-visible={!isLoadingSuggestions && suggestions.length > 0}>
// //                                 {isLoadingSuggestions && <div className="p-3 text-sm text-gray-500">Loading...</div>}
// //                                 {!isLoadingSuggestions && suggestions.length === 0 && searchQuery.length > 1 && <div className="p-3 text-sm text-gray-500">No suggestions found.</div>}
// //                                 {!isLoadingSuggestions && suggestions.length > 0 && (
// //                                     <ul className="max-h-60 overflow-y-auto">
// //                                         {suggestions.map((product) => (
// //                                             <li key={product.id}>
// //                                                 <button type="button" onClick={() => handleSuggestionClick(product)}
// //                                                     className="w-full text-left px-3 py-2.5 text-sm text-brand-foreground hover:bg-brand-subtle flex items-center gap-2">
// //                                                     {product.images?.[0]?.src && <img src={product.images[0].src} alt={product.name} className="w-8 h-8 object-contain rounded-sm"/>}
// //                                                     <span className="truncate">{product.name}</span>
// //                                                 </button>
// //                                             </li>
// //                                         ))}
// //                                          <li className="border-t border-brand-subtle">
// //                                             <button type="submit" form="desktopSearchForm"
// //                                                 className="w-full text-center px-3 py-2.5 text-sm font-medium text-brand-primary hover:bg-brand-subtle">
// //                                                 Search for "{searchQuery}"
// //                                             </button>
// //                                         </li>
// //                                     </ul>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </div>
// //                     <button onClick={() => navigate('/search')} aria-label="Search" className="sm:hidden p-2 hover:text-brand-primary"><FiSearch size={20} /></button>

// //                     {!authLoading && (
// //                         isAuthenticated ? (
// //                             <>
// //                                 <Link to="/account" aria-label="My Account" title={`Logged in as ${user?.nicename || 'user'}`} className="p-2 hover:text-brand-primary flex items-center"><FiUser size={20} /></Link>
// //                                 <button onClick={handleLogout} aria-label="Logout" title="Logout" className={authButtonClass}>Logout</button>
// //                             </>
// //                         ) : (
// //                             <Link to="/login" aria-label="Login" title="Login" className={authButtonClass}>Login</Link>
// //                         )
// //                     )}
// //                     {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-brand-subtle border-t-brand-primary"></div>} {/* Spinner with gold accent */}

// //                     <Link to="/cart" aria-label="Cart" className="p-2 hover:text-brand-primary relative">
// //                         <FiShoppingCart size={20} />
// //                         {!cartLoading && cartItemCount > 0 && (
// //                              <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-textOnPrimary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center"> {/* Cart count badge */}
// //                                 {cartItemCount}
// //                              </span>
// //                         )}
// //                          {cartLoading && isAuthenticated && ( <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-spin rounded-full border border-brand-subtle border-t-brand-accent"></span> )} {/* Spinner with accent gold */}
// //                     </Link>

// //                     <button className="md:hidden p-1 hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
// //                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// //                     </button>
// //                 </div>
// //             </nav>

// //             <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
// //             <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}> {/* Increased z-index */}
// //                 <div className="flex justify-between items-center p-4 border-b border-brand-subtle">
// //                     <h2 className="font-semibold text-brand-heading">Menu</h2>
// //                     <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-primary-light hover:text-brand-primary"><FiX size={24} /></button>
// //                 </div>
// //                 <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]" ref={searchContainerRef}>
// //                     <form onSubmit={handleSearchSubmit} className="mb-3 relative" id="mobileSearchForm">
// //                          <div className="relative">
// //                             <input
// //                                 type="search" value={searchQuery}
// //                                 onChange={(e) => setSearchQuery(e.target.value)}
// //                                 onFocus={() => { if (searchQuery.trim() && suggestions.length > 0) setIsSuggestionsVisible(true);}}
// //                                 placeholder="Search products..."
// //                                 className="w-full px-3 py-2 text-sm border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary placeholder-gray-500 bg-brand-card text-brand-foreground"
// //                                 aria-label="Search products mobile" autoComplete="off"
// //                             />
// //                             <button type="submit" aria-label="Search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-primary"><FiSearch size={18} /></button>
// //                         </div>
// //                         {isSuggestionsVisible && searchQuery.trim() && ( // Conditionally render based on state
// //                             <div className="absolute top-full mt-1.5 w-full bg-brand-card border border-brand-subtle rounded-md shadow-lg z-[70] overflow-hidden
// //                                         transition-all duration-200 ease-out opacity-0 data-[visible='true']:opacity-100 transform scale-95 data-[visible='true']:scale-100"
// //                                  data-visible={!isLoadingSuggestions && suggestions.length > 0}>
// //                                 {isLoadingSuggestions && <div className="p-3 text-sm text-gray-500">Loading...</div>}
// //                                 {!isLoadingSuggestions && suggestions.length === 0 && searchQuery.length > 1 && <div className="p-3 text-sm text-gray-500">No suggestions found.</div>}
// //                                 {!isLoadingSuggestions && suggestions.length > 0 && (
// //                                     <ul className="max-h-48 overflow-y-auto">
// //                                         {suggestions.map((product) => (
// //                                             <li key={product.id}>
// //                                                 <button type="button" onClick={() => handleSuggestionClick(product)}
// //                                                     className="w-full text-left px-3 py-2.5 text-sm text-brand-foreground hover:bg-brand-subtle flex items-center gap-2">
// //                                                     {product.images?.[0]?.src && <img src={product.images[0].src} alt={product.name} className="w-8 h-8 object-contain rounded-sm"/>}
// //                                                     <span className="truncate">{product.name}</span>
// //                                                 </button>
// //                                             </li>
// //                                         ))}
// //                                         <li className="border-t border-brand-subtle">
// //                                             <button type="submit" form="mobileSearchForm"
// //                                                 className="w-full text-center px-3 py-2.5 text-sm font-medium text-brand-primary hover:bg-brand-subtle">
// //                                                 Search for "{searchQuery}"
// //                                             </button>
// //                                         </li>
// //                                     </ul>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </form>

// //                     <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
// //                     <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
// //                     {loadingCategories && <span className="block py-2 px-3 text-gray-500 animate-pulse">Loading...</span>}
// //                     {!loadingCategories && !categoryError && topLevelCategories.map(category => (
// //                         <NavLink key={category.id} to={`/category/${category.slug}`} className={mobileNavLinkClass} onClick={closeMobileMenu}>{category.name}</NavLink>
// //                     ))}
// //                     {categoryError && <span className="block py-2 px-3 text-sm text-red-500">Could not load categories</span>}
// //                     <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
// //                     <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink>

// //                     <div className='pt-2 border-t border-brand-subtle mt-2'>
// //                         {!authLoading && (
// //                             isAuthenticated ? ( <>
// //                                 <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
// //                                 <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-subtle text-brand-foreground">Logout</button>
// //                             </> ) : (
// //                                 <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
// //                             )
// //                         )}
// //                         {authLoading && <span className="block py-2 px-3 text-gray-500">Checking status...</span>}
// //                     </div>
// //                  </nav>
// //             </div>
// //         </header>
// //     );
// // };
// // export default Navbar;

// // src/components/Navbar.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'; // FiX will be used for closing overlay
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { useQuery } from '@apollo/client';
// import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';
// import { fetchProducts } from '../api/woocommerce';

// const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
//     };
// };

// const Navbar = () => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
//     const { cart, loading: cartLoading } = useCart();
//     const navigate = useNavigate();

//     // --- Search State (now for the overlay) ---
//     const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
//     const searchInputRef = useRef(null); // For focusing the input in overlay

//     const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
//         GET_TOP_LEVEL_CATEGORIES_QUERY, { variables: { first: 4, hideEmpty: true } }
//     );
//     const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

//     const handleLogout = () => { logout(); navigate('/'); closeMobileMenu(); };

//     const navLinkClass = ({ isActive }) =>
//         `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${isActive ? 'text-brand-primary border-b-2 border-brand-primary' : 'border-b-2 border-transparent text-brand-foreground hover:text-brand-primary-light'}`;
    
//     const mobileNavLinkClass = ({ isActive }) =>
//         `block py-2 px-3 rounded hover:bg-brand-card ${isActive ? 'text-brand-primary font-semibold' : 'text-brand-foreground hover:text-brand-primary-light'}`;
    
//     const authButtonClass = "px-3 py-1.5 text-sm font-medium text-brand-primary-light hover:text-brand-primary rounded-md hover:bg-brand-card transition-colors duration-150 ease-in-out";

//     const closeMobileMenu = () => setIsMobileMenuOpen(false);
//     const cartItemCount = cart?.contents?.itemCount || 0;

//     // --- Toggle Search Overlay ---
//     const toggleSearchOverlay = () => {
//         setIsSearchOverlayVisible(prev => !prev);
//     };

//     // --- Search Logic Adapted for Overlay ---
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         const trimmedQuery = searchQuery.trim();
//         if (trimmedQuery) {
//             navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
//             setIsSearchOverlayVisible(false); // Close overlay
//             setSearchQuery(''); // Reset query
//             setSuggestions([]);
//         }
//     };

//     const fetchSuggestions = async (query) => {
//         if (query.length < 2) { setSuggestions([]); return; }
//         setIsLoadingSuggestions(true);
//         try {
//             const products = await fetchProducts({ search: query, per_page: 6 }); // Fetch 6 suggestions
//             setSuggestions(Array.isArray(products) ? products : []);
//         } catch (error) { console.error("Failed to fetch suggestions:", error); setSuggestions([]); }
//         setIsLoadingSuggestions(false);
//     };
    
//     const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 350), []);

//     useEffect(() => {
//         if (searchQuery.trim() && isSearchOverlayVisible) { // Only fetch if overlay is visible and query exists
//             debouncedFetchSuggestions(searchQuery);
//         } else {
//             setSuggestions([]);
//         }
//     }, [searchQuery, isSearchOverlayVisible, debouncedFetchSuggestions]);

//     const handleSuggestionClick = (product) => {
//         const productName = product.name;
//         navigate(`/search?q=${encodeURIComponent(productName)}`);
//         setIsSearchOverlayVisible(false); // Close overlay
//         setSearchQuery(''); // Reset query
//         setSuggestions([]);
//     };
    
//     // Focus input when overlay becomes visible
//     useEffect(() => {
//         if (isSearchOverlayVisible && searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     }, [isSearchOverlayVisible]);

//     // Handle Escape key to close overlay or mobile menu
//     useEffect(() => {
//         const handleEscKey = (event) => {
//             if (event.key === 'Escape') {
//                 if (isSearchOverlayVisible) {
//                     setIsSearchOverlayVisible(false);
//                     setSearchQuery('');
//                     setSuggestions([]);
//                 } else if (isMobileMenuOpen) {
//                     closeMobileMenu();
//                 }
//             }
//         };
//         document.addEventListener('keydown', handleEscKey);
//         return () => document.removeEventListener('keydown', handleEscKey);
//     }, [isSearchOverlayVisible, isMobileMenuOpen]);


//     return (
//         <>
//             <header className="w-full bg-brand-card text-brand-foreground shadow-md sticky top-0 z-30 font-sans"> {/* Lowered z-index for header if overlay is higher */}
//                 <div className="bg-brand-primary text-brand-textOnPrimary text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
//                     <span className='text-center'>Natural Skincare & Wellness</span>
//                 </div>

//                 <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle-DEFAULT relative h-16">
//                     <div className="flex-shrink-0"> {/* Removed z-20, manage z-index with overlay */}
//                         <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link>
//                     </div>

//                     <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
//                         {loadingCategories && <span className="flex items-center text-sm text-gray-500 px-2 py-5 animate-pulse">Loading...</span>}
//                         {!loadingCategories && !categoryError && topLevelCategories.map(category => (
//                             <NavLink key={category.id} to={`/category/${category.slug}`} className={navLinkClass}>{category.name}</NavLink>
//                         ))}
//                         {categoryError && <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>}
//                         <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
//                         <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
//                     </div>

//                     <div className="flex items-center space-x-2 sm:space-x-3 text-brand-primary-light"> {/* Icons default to light gold */}
//                         {/* --- Search Icon --- */}
//                         <button onClick={toggleSearchOverlay} aria-label="Open Search" className="p-2 hover:text-brand-primary">
//                             <FiSearch size={20} />
//                         </button>

//                         {!authLoading && (
//                             isAuthenticated ? (
//                                 <>
//                                     <Link to="/account" aria-label="My Account" title={`Logged in as ${user?.nicename || 'user'}`} className="p-2 hover:text-brand-primary flex items-center"><FiUser size={20} /></Link>
//                                     <button onClick={handleLogout} aria-label="Logout" title="Logout" className={authButtonClass}>Logout</button>
//                                 </>
//                             ) : (
//                                 <Link to="/login" aria-label="Login" title="Login" className={authButtonClass}>Login</Link>
//                             )
//                         )}
//                         {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-brand-subtle-DEFAULT border-t-brand-primary"></div>}

//                         <Link to="/cart" aria-label="Cart" className="p-2 hover:text-brand-primary relative">
//                             <FiShoppingCart size={20} />
//                             {!cartLoading && cartItemCount > 0 && (
//                                 <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-textOnPrimary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                                     {cartItemCount}
//                                 </span>
//                             )}
//                             {cartLoading && isAuthenticated && ( <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-spin rounded-full border-brand-subtle-DEFAULT border-t-brand-accent"></span> )}
//                         </Link>

//                         <button className="md:hidden p-1 hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//                         </button>
//                     </div>
//                 </nav>
//             </header>

//             {/* --- Mobile Menu Flyout (Search Input Removed from here) --- */}
//             <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
//             <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//                 <div className="flex justify-between items-center p-4 border-b border-brand-subtle-DEFAULT">
//                     <h2 className="font-semibold text-brand-heading">Menu</h2>
//                     <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-primary-light hover:text-brand-primary"><FiX size={24} /></button>
//                 </div>
//                 <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]">
//                     {/* Search icon in mobile menu can also toggle the main overlay */}
//                     <button 
//                         onClick={() => { closeMobileMenu(); toggleSearchOverlay(); }} 
//                         className="flex items-center w-full py-2 px-3 rounded text-brand-foreground hover:bg-brand-card hover:text-brand-primary-light mb-2"
//                     >
//                         <FiSearch className="mr-3" size={18}/> Search Products
//                     </button>

//                     <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
//                     <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
//                     {/* ... other mobile nav links ... */}
//                     <div className='pt-2 border-t border-brand-subtle-DEFAULT mt-2'>
//                         {/* ... mobile auth links ... */}
//                     </div>
//                  </nav>
//             </div>

//             {/* --- Full Screen Search Overlay --- */}
//             {isSearchOverlayVisible && (
//                 <div 
//                     className="fixed inset-0 bg-brand-background/90 backdrop-blur-sm flex flex-col items-center justify-start pt-16 md:pt-24 p-4 z-50 transition-opacity duration-300 ease-in-out"
//                     // onClick={(e) => { if (e.target === e.currentTarget) toggleSearchOverlay(); }} // Optional: close on backdrop click
//                 >
//                     <button 
//                         onClick={toggleSearchOverlay} 
//                         aria-label="Close Search" 
//                         className="absolute top-6 right-6 md:top-8 md:right-8 text-brand-primary-light hover:text-brand-primary p-2 z-[51]"
//                     >
//                         <FiX size={30} />
//                     </button>

//                     <div className="w-full max-w-xl md:max-w-2xl mt-8 md:mt-12">
//                         <form onSubmit={handleSearchSubmit} className="relative">
//                             <input
//                                 ref={searchInputRef}
//                                 type="search"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder="What are you looking for?"
//                                 className="w-full px-6 py-4 text-lg md:text-xl border-2 border-brand-subtle-DEFAULT rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-brand-card text-brand-foreground placeholder-gray-500"
//                                 autoComplete="off"
//                             />
//                             <button 
//                                 type="submit" 
//                                 aria-label="Search" 
//                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary hover:text-brand-primary-hover p-2"
//                             >
//                                 <FiSearch size={24} />
//                             </button>
//                         </form>

//                         {/* Suggestions Area within Overlay */}
//                         {searchQuery.trim().length >= 2 && (
//                             <div className="mt-4 w-full bg-brand-card border border-brand-subtle-DEFAULT rounded-md shadow-lg max-h-[60vh] overflow-y-auto">
//                                 {isLoadingSuggestions && <div className="p-4 text-sm text-center text-gray-400">Searching...</div>}
//                                 {!isLoadingSuggestions && !suggestions.length && searchQuery.trim().length >= 2 && (
//                                     <div className="p-4 text-sm text-center text-gray-400">No products found matching "{searchQuery}".</div>
//                                 )}
//                                 {!isLoadingSuggestions && suggestions.length > 0 && (
//                                     <ul>
//                                         {suggestions.map((product) => (
//                                             <li key={product.id} className="border-b border-brand-subtle-DEFAULT last:border-b-0">
//                                                 <button 
//                                                     type="button" 
//                                                     onClick={() => handleSuggestionClick(product)}
//                                                     className="w-full text-left px-4 py-3 text-sm text-brand-foreground hover:bg-brand-subtle-DEFAULT flex items-center gap-3 transition-colors duration-150"
//                                                 >
//                                                     {product.images?.[0]?.src && (
//                                                         <img src={product.images[0].src} alt={product.name} className="w-10 h-10 object-contain rounded-sm flex-shrink-0"/>
//                                                     )}
//                                                     <span className="flex-grow truncate">{product.name}</span>
//                                                     {/* Optional: Price or category */}
//                                                     {/* <span className="text-xs text-brand-primary-light ml-auto">{product.price_html ? stripHtml(product.price_html) : ''}</span> */}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                         <li className="border-t border-brand-subtle-DEFAULT">
//                                             <button 
//                                                 type="button" // Changed to button, will be submitted by form's onSubmit via handleSearchSubmit
//                                                 onClick={handleSearchSubmit}
//                                                 className="w-full text-center px-4 py-3 text-sm font-medium text-brand-primary hover:bg-brand-subtle-DEFAULT transition-colors duration-150"
//                                             >
//                                                 View all results for "{searchQuery}"
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
// export default Navbar;

// src/components/Navbar.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useQuery } from '@apollo/client';
import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';
import { fetchProducts } from '../api/woocommerce';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { func.apply(this, args); }, delay);
    };
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
    const { cart, loading: cartLoading } = useCart();
    const navigate = useNavigate();

    const [isSearchOverlayVisible, setIsSearchOverlayVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const searchInputRef = useRef(null);

    // --- State for Animated Placeholder ---
    const placeholderText = "put a product name to search...";
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const typingSpeed = 50; // milliseconds for typing each character
    const deletingSpeed = 50; // milliseconds for deleting each character
    const pauseDelay = 2000; // milliseconds to pause after typing/deleting

    const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
        GET_TOP_LEVEL_CATEGORIES_QUERY, { variables: { first: 4, hideEmpty: true } }
    );
    const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

    const handleLogout = () => { 
        logout(); 
        navigate('/'); 
        closeMobileMenu(); 
    };

    // Navigation link styling
    const navLinkClass = ({ isActive }) =>
        `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${
            isActive 
            ? 'text-brand-primary border-b-2 border-brand-primary' 
            : 'border-b-2 border-transparent text-brand-foreground hover:text-brand-primary-light'
        }`;
    
    // Mobile navigation link styling
    const mobileNavLinkClass = ({ isActive }) =>
        `block py-2 px-3 rounded hover:bg-brand-card ${
            isActive 
            ? 'text-brand-primary font-semibold' 
            : 'text-brand-foreground hover:text-brand-primary-light'
        }`;
    
    // Authentication button styling (Login/Logout text buttons)
    const authButtonClass = "px-3 py-1.5 text-sm font-medium text-brand-primary-light hover:text-brand-primary rounded-md hover:bg-brand-card transition-colors duration-150 ease-in-out";

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const cartItemCount = cart?.contents?.itemCount || 0;

    const toggleSearchOverlay = () => {
        setIsSearchOverlayVisible(prev => !prev);
    };

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setIsSearchOverlayVisible(false); // Close overlay on submit
            setSearchQuery(''); // Reset search query
            setSuggestions([]); // Clear suggestions
        }
    };

    // Fetch search suggestions
    const fetchSuggestions = async (query) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setIsLoadingSuggestions(true);
        try {
            // Assuming fetchProducts can take a 'search' parameter
            const products = await fetchProducts({ search: query, per_page: 6 }); 
            setSuggestions(Array.isArray(products) ? products : []);
        } catch (error) { 
            console.error("Failed to fetch suggestions:", error); 
            setSuggestions([]); 
        }
        setIsLoadingSuggestions(false);
    };
    
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 350), []);

    // Effect for fetching suggestions when search query changes
    useEffect(() => {
        if (searchQuery.trim() && isSearchOverlayVisible) {
            debouncedFetchSuggestions(searchQuery);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, isSearchOverlayVisible, debouncedFetchSuggestions]);

    // Handle click on a search suggestion
    const handleSuggestionClick = (product) => {
        const productName = product.name;
        navigate(`/search?q=${encodeURIComponent(productName)}`);
        setIsSearchOverlayVisible(false);
        setSearchQuery('');
        setSuggestions([]);
    };
    
    // Focus search input when overlay becomes visible
    useEffect(() => {
        if (isSearchOverlayVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOverlayVisible]);

    // Handle Escape key to close overlay or mobile menu
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                if (isSearchOverlayVisible) {
                    setIsSearchOverlayVisible(false);
                    setSearchQuery(''); // Reset query on ESC
                    setSuggestions([]); // Clear suggestions on ESC
                } else if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isSearchOverlayVisible, isMobileMenuOpen]);

    // useEffect for Animated Placeholder
    useEffect(() => {
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        function type() {
            const currentText = placeholderText;

            if (isDeleting) {
                if (charIndex > 0) {
                    setAnimatedPlaceholder(currentText.substring(0, charIndex - 1));
                    charIndex--;
                    timeoutId = setTimeout(type, deletingSpeed);
                } else {
                    isDeleting = false;
                    charIndex = 0; 
                    timeoutId = setTimeout(type, pauseDelay / 2); 
                }
            } else {
                if (charIndex < currentText.length) {
                    setAnimatedPlaceholder(currentText.substring(0, charIndex + 1));
                    charIndex++;
                    timeoutId = setTimeout(type, typingSpeed);
                } else {
                    isDeleting = true;
                    timeoutId = setTimeout(type, pauseDelay);
                }
            }
        }

        if (isSearchOverlayVisible) {
            setAnimatedPlaceholder(''); 
            charIndex = 0;
            isDeleting = false;
            // Slight delay before starting animation to ensure input is focused
            timeoutId = setTimeout(type, typingSpeed / 2); 
        } else {
            clearTimeout(timeoutId);
            setAnimatedPlaceholder(''); 
        }

        return () => clearTimeout(timeoutId);
    }, [isSearchOverlayVisible]);

    const logoPath = '/images/footer-logo.png';
    return (
        <>
            <header className="w-full bg-brand-card text-brand-foreground shadow-md sticky top-0 z-30 font-sans">
                {/* Top Bar */}
                <div className="bg-brand-primary text-brand-textOnPrimary text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
                    <span className='text-center'>Natural Skincare & Wellness</span>
                </div>

                {/* Main Navigation */}
                <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16"> {/* Ensure consistent border color from theme */}
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" title="Roots & Radiance Home">
                            <img
                                src={logoPath}
                                alt="Roots & Radiance Logo"
                                // Adjust height as needed for the navbar, e.g., h-10 or h-12
                                // Maintain aspect ratio with w-auto
                                className="h-10 w-auto" // Example: Reduced height for navbar
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex flex-grow justify-center items-stretch h-full min-w-0 space-x-3 lg:space-x-4 xl:space-x-6"> {/* Added min-w-0 for robustness */}
                        {loadingCategories && <span className="flex items-center text-sm text-brand-foreground/70 px-2 py-5 animate-pulse">Loading...</span>} {/* Adjusted loading text color */}
                        {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                            <NavLink key={category.id} to={`/category/${category.slug}`} className={navLinkClass}>{category.name}</NavLink>
                        ))}
                        {categoryError && <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>}
                        <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
                        <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
                    </div>

                    {/* Right Icons & Auth Section */}
                    <div className="flex items-center space-x-2 sm:space-x-3 text-brand-primary-light"> {/* Default icon color */}
                        {/* Search Icon */}
                        <button onClick={toggleSearchOverlay} aria-label="Open Search" className="p-2 hover:text-brand-primary">
                            <FiSearch size={20} />
                        </button>

                        {/* Auth Links/Buttons */}
                        {!authLoading && (
                            isAuthenticated ? (
                                <>
                                    <Link to="/account" aria-label="My Account" title={`Logged in as ${user?.nicename || 'user'}`} className="p-2 hover:text-brand-primary flex items-center"><FiUser size={20} /></Link>
                                    <button onClick={handleLogout} aria-label="Logout" title="Logout" className={authButtonClass}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login" aria-label="Login" title="Login" className={authButtonClass}>Login</Link>
                            )
                        )}
                        {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-brand-subtle border-t-brand-primary"></div>} {/* Spinner themed */}

                        {/* Cart Icon */}
                        <Link to="/cart" aria-label="Cart" className="p-2 hover:text-brand-primary relative">
                            <FiShoppingCart size={20} />
                            {!cartLoading && cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-textOnPrimary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                            {cartLoading && isAuthenticated && ( <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-spin rounded-full border-brand-subtle border-t-brand-accent"></span> )} {/* Spinner themed */}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden p-1 hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Flyout */}
            <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
            <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-brand-subtle"> {/* Themed border */}
                    <h2 className="font-semibold text-brand-heading">Menu</h2>
                    <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-primary-light hover:text-brand-primary"><FiX size={24} /></button>
                </div>
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]"> {/* Height calculation for scroll */}
                    {/* Search button in mobile menu */}
                    <button 
                        onClick={() => { closeMobileMenu(); toggleSearchOverlay(); }} 
                        className="flex items-center w-full py-2 px-3 rounded text-brand-foreground hover:bg-brand-card hover:text-brand-primary-light mb-2"
                    >
                        <FiSearch className="mr-3" size={18}/> Search Products
                    </button>

                    <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
                    <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
                    {loadingCategories && <span className="block py-2 px-3 text-brand-foreground/70 animate-pulse">Loading...</span>}
                    {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                        <NavLink key={category.id} to={`/category/${category.slug}`} className={mobileNavLinkClass} onClick={closeMobileMenu}>{category.name}</NavLink>
                    ))}
                    {categoryError && <span className="block py-2 px-3 text-sm text-red-500">Could not load categories</span>}
                    <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
                    <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink>
                    
                    {/* Auth links in mobile menu */}
                    <div className='pt-2 border-t border-brand-subtle mt-2'> {/* Themed border */}
                        {!authLoading && (
                            isAuthenticated ? ( <>
                                <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
                                <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-card text-brand-foreground">Logout</button>
                            </> ) : (
                                <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
                            )
                        )}
                        {authLoading && <span className="block py-2 px-3 text-brand-foreground/70">Checking status...</span>}
                    </div>
                 </nav>
            </div>

            {/* Full Screen Search Overlay */}
            {isSearchOverlayVisible && (
                <div 
                    className="fixed inset-0 bg-brand-background/90 backdrop-blur-sm flex flex-col items-center justify-start pt-16 md:pt-24 p-4 z-50 transition-opacity duration-300 ease-in-out"
                >
                    <button 
                        onClick={toggleSearchOverlay} 
                        aria-label="Close Search" 
                        className="absolute top-6 right-6 md:top-8 md:right-8 text-brand-primary-light hover:text-brand-primary p-2 z-[51]"
                    >
                        <FiX size={30} />
                    </button>

                    <div className="w-full max-w-xl md:max-w-2xl mt-8 md:mt-12">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                ref={searchInputRef}
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={animatedPlaceholder} // Animated placeholder
                                className="w-full px-6 py-4 text-lg md:text-xl border-2 border-brand-subtle rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-brand-card text-brand-foreground placeholder-gray-500 search-input-placeholder" 
                                autoComplete="off"
                            />
                            <button 
                                type="submit" 
                                aria-label="Search" 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary hover:text-brand-primary-hover p-2"
                            >
                                <FiSearch size={24} />
                            </button>
                        </form>

                        {/* Suggestions Area within Overlay */}
                        {searchQuery.trim().length >= 2 && (
                            <div className="mt-4 w-full bg-brand-card border border-brand-subtle rounded-md shadow-lg max-h-[60vh] overflow-y-auto">
                                {isLoadingSuggestions && <div className="p-4 text-sm text-center text-brand-foreground/70">Searching...</div>}
                                {!isLoadingSuggestions && !suggestions.length && searchQuery.trim().length >= 2 && (
                                    <div className="p-4 text-sm text-center text-brand-foreground/70">No products found matching "{searchQuery}".</div>
                                )}
                                {!isLoadingSuggestions && suggestions.length > 0 && (
                                    <ul>
                                        {suggestions.map((product) => (
                                            <li key={product.id} className="border-b border-brand-subtle last:border-b-0">
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleSuggestionClick(product)}
                                                    className="w-full text-left px-4 py-3 text-sm text-brand-foreground hover:bg-brand-subtle flex items-center gap-3 transition-colors duration-150"
                                                >
                                                    {product.images?.[0]?.src && (
                                                        <img src={product.images[0].src} alt={product.name} className="w-10 h-10 object-contain rounded-sm flex-shrink-0 bg-brand-subtle/30"/> /* Added subtle bg to image container */
                                                    )}
                                                    <span className="flex-grow truncate">{product.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                        <li className="border-t border-brand-subtle">
                                            <button 
                                                type="button"
                                                onClick={handleSearchSubmit}
                                                className="w-full text-center px-4 py-3 text-sm font-medium text-brand-primary hover:bg-brand-subtle transition-colors duration-150"
                                            >
                                                View all results for "{searchQuery}"
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
export default Navbar;