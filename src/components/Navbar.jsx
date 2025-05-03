// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiLogOut, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Import Apollo hook and the category query
import { useQuery } from '@apollo/client';
// Ensure this path is correct for your project structure
import { GET_TOP_LEVEL_CATEGORIES_QUERY } from '../graphql/categories.gql';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout, user, loading: authLoading } = useAuth();
    const { cart, loading: cartLoading } = useCart();
    const navigate = useNavigate();

    // Fetch categories using GraphQL
    const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
        GET_TOP_LEVEL_CATEGORIES_QUERY,
        {
            variables: { first: 4, hideEmpty: true }, // Fetch top 4 non-empty categories
        }
    );

    // Extract categories from the fetched data, filtering out 'uncategorized'
    const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

    const handleLogout = () => {
      logout();
      navigate('/');
      closeMobileMenu();
    };

    // --- UPDATE NavLink Classes with Theme Colors ---
    const navLinkClass = ({ isActive }) =>
        `py-5 px-1 hover:text-brand-primary transition-colors duration-200 text-sm font-medium ${ // Hover uses primary
            isActive
            ? 'text-brand-primary border-b-2 border-brand-primary' // Active uses primary
            : 'border-b-2 border-transparent text-brand-foreground' // Default uses foreground text color
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `block py-2 px-3 rounded hover:bg-brand-primary/10 ${ // Hover uses light primary bg tint
            isActive
            ? 'text-brand-primary font-semibold' // Active uses primary text
            : 'text-brand-foreground' // Default uses foreground text color
        }`;

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Calculate cart item count safely
    const cartItemCount = cart?.contents?.itemCount || 0;

    return (
        // --- UPDATE Header BG/Text from Theme ---
        <header className="w-full bg-brand-background text-brand-foreground shadow-sm sticky top-0 z-50 font-sans">
            {/* --- UPDATE Top Bar BG/Text from Theme --- */}
            {/* Using primary bg for top bar */}
            <div className="bg-brand-primary text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
                 <span className='text-center'>Natural Skincare & Wellness</span> {/* Example Text */}
            </div>

            {/* Main Navigation */}
            {/* --- UPDATE Nav Border from Theme --- */}
            <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-brand-subtle relative h-16">
                {/* Logo */}
                <div className="flex-shrink-0 z-20">
                     {/* --- UPDATE Logo Text Color --- */}
                    <Link to="/" className="text-2xl font-bold tracking-tight text-brand-primary">Roots & Radiance</Link>
                </div>

                {/* Desktop Navigation Links - Centered */}
                <div className="hidden md:flex flex-grow justify-center items-stretch h-full space-x-3 lg:space-x-4 xl:space-x-6">
                    {/* Links will use navLinkClass defined above */}
                    <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
                    {/* Dynamic Category Links */}
                    {loadingCategories && (
                        <span className="flex items-center text-sm text-gray-400 px-2 py-5 animate-pulse">Loading...</span>
                    )}
                    {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                        <NavLink
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className={navLinkClass}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                    {categoryError && (
                         <span className="flex items-center text-sm text-red-500 px-2 py-5">Error</span>
                    )}
                    {/* Other Static Links */}
                    <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
                    <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
                </div>

                {/* Right Icons & Mobile Menu Toggle */}
                 {/* --- UPDATE Icon Default Color & Hover --- */}
                 <div className="flex items-center space-x-3 sm:space-x-4 z-20 text-brand-foreground"> {/* Default icon color */}
                     <button aria-label="Search" className="hover:text-brand-primary"><FiSearch size={20} /></button>

                     {/* Account/Login/Logout Icon */}
                      {!authLoading && (
                          isAuthenticated ? (
                             <>
                               <Link to="/account" aria-label="Account" title={`Logged in as ${user?.nicename || 'user'}`} className="hover:text-brand-primary"><FiUser size={20} /></Link>
                               <button onClick={handleLogout} aria-label="Logout" title="Logout" className="hover:text-brand-primary"><FiLogOut size={20} /></button>
                             </>
                         ) : (
                             <Link to="/login" aria-label="Login" title="Login" className="hover:text-brand-primary"><FiLogIn size={20} /></Link>
                         )
                      )}
                      {/* --- UPDATE Auth Spinner Color --- */}
                      {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary"></div>}

                     {/* Cart Icon with Count */}
                      {/* --- UPDATE Cart Count BG & Spinner --- */}
                     <Link to="/cart" aria-label="Cart" className="hover:text-brand-primary relative">
                        <FiShoppingCart size={20} />
                        {!cartLoading && cartItemCount > 0 && (
                             // Use accent color for cart count background
                             <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItemCount}
                             </span>
                        )}
                         {cartLoading && isAuthenticated && (
                             <span className="absolute -top-1 -right-1 h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-brand-primary"></span>
                         )}
                     </Link>

                     {/* Mobile Menu Toggle */}
                     <button className="md:hidden p-1 text-brand-foreground hover:text-brand-primary" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                         {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                     </button>
                 </div>
            </nav>

            {/* Mobile Menu Flyout */}
            <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
             {/* --- UPDATE Mobile Menu BG/Border/Text --- */}
             <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-brand-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <div className="flex justify-between items-center p-4 border-b border-brand-subtle">
                     <h2 className="font-semibold text-brand-foreground">Menu</h2>
                     <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-brand-foreground hover:text-brand-primary"><FiX size={24} /></button>
                 </div>
                 {/* Links use mobileNavLinkClass defined above */}
                 <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]"> {/* Adjust height calculation if header changes */}
                     <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
                     <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
                     {/* Mobile Category Links */}
                      {loadingCategories && <span className="block py-2 px-3 text-gray-400 animate-pulse">Loading...</span>}
                      {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                         <NavLink
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className={mobileNavLinkClass}
                            onClick={closeMobileMenu}
                         >
                            {category.name}
                         </NavLink>
                     ))}
                     {categoryError && <span className="block py-2 px-3 text-red-500 text-sm">Could not load categories</span>}
                     {/* Other Mobile Links */}
                      <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
                     <NavLink to="/contact-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>Contact Us</NavLink>

                      {/* Login/Account/Logout for Mobile */}
                       {/* --- UPDATE Mobile Menu Border/Text --- */}
                     <div className='pt-2 border-t border-brand-subtle mt-2'>
                          {!authLoading && (
                             isAuthenticated ? (
                                 <>
                                     <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
                                     {/* --- UPDATE Mobile Logout Text/Hover --- */}
                                     <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-brand-primary/10 text-brand-foreground">Logout</button>
                                 </>
                             ) : (
                                 <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
                             )
                          )}
                           {authLoading && <span className="block py-2 px-3 text-gray-400">Checking status...</span>}
                     </div>
                 </nav>
            </div>

        </header>
    );
};

export default Navbar;