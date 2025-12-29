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

    const placeholderText = "put a product name to search...";
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const typingSpeed = 50;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    const { data: categoryData, loading: loadingCategories, error: categoryError } = useQuery(
        GET_TOP_LEVEL_CATEGORIES_QUERY, { variables: { first: 4, hideEmpty: true } }
    );
    const topLevelCategories = categoryData?.productCategories?.nodes?.filter(cat => cat.slug !== 'uncategorized') || [];

    const handleLogout = () => { 
        logout(); 
        navigate('/'); 
        closeMobileMenu(); 
    };

    // --- UPDATED CLASSES FOR WHITE NAVBAR ---
    // Text is strictly Black (#000000) or brand.text-dark (#101010) if you prefer softer black.
    // Using 'text-black' ensures maximum contrast on white.
    
    const navLinkClass = ({ isActive }) =>
        `py-5 px-1 transition-colors duration-200 text-sm font-medium ${
            isActive 
            ? 'text-brand-primary border-b-2 border-brand-primary' // Active: Gold Text & Border
            : 'border-b-2 border-transparent text-black hover:text-brand-primary' // Default: Black Text, Gold Hover
        }`;
    
    const mobileNavLinkClass = ({ isActive }) =>
        `block py-2 px-3 rounded ${
            isActive 
            ? 'bg-gray-100 text-black font-semibold' // Active: Light Gray BG, Black Text
            : 'text-black hover:bg-gray-50 hover:text-brand-primary' // Default: Black Text
        }`;
    
    const authButtonClass = "px-3 py-1.5 text-sm font-medium text-black hover:text-brand-primary rounded-md hover:bg-gray-100 transition-colors duration-150 ease-in-out";

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const cartItemCount = cart?.contents?.itemCount || 0;

    const toggleSearchOverlay = () => {
        setIsSearchOverlayVisible(prev => !prev);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setIsSearchOverlayVisible(false);
            setSearchQuery('');
            setSuggestions([]);
        }
    };

    const fetchSuggestions = async (query) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setIsLoadingSuggestions(true);
        try {
            const products = await fetchProducts({ search: query, per_page: 6 }); 
            setSuggestions(Array.isArray(products) ? products : []);
        } catch (error) { 
            console.error("Failed to fetch suggestions:", error); 
            setSuggestions([]); 
        }
        setIsLoadingSuggestions(false);
    };
    
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 350), []);

    useEffect(() => {
        if (searchQuery.trim() && isSearchOverlayVisible) {
            debouncedFetchSuggestions(searchQuery);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, isSearchOverlayVisible, debouncedFetchSuggestions]);

    const handleSuggestionClick = (product) => {
        const productName = product.name;
        navigate(`/search?q=${encodeURIComponent(productName)}`);
        setIsSearchOverlayVisible(false);
        setSearchQuery('');
        setSuggestions([]);
    };
    
    useEffect(() => {
        if (isSearchOverlayVisible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOverlayVisible]);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                if (isSearchOverlayVisible) {
                    setIsSearchOverlayVisible(false);
                    setSearchQuery('');
                    setSuggestions([]);
                } else if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }
        };
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isSearchOverlayVisible, isMobileMenuOpen]);

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
            timeoutId = setTimeout(type, typingSpeed / 2); 
        } else {
            clearTimeout(timeoutId);
            setAnimatedPlaceholder(''); 
        }

        return () => clearTimeout(timeoutId);
    }, [isSearchOverlayVisible]);

    // Ensure you upload your new logo to this path or update this string
    const logoPath = '/images/footer-logo.png'; 

    return (
        <>
            {/* Header Background: White */}
            <header className="w-full bg-white text-black shadow-md sticky top-0 z-30 font-sans">
                
                {/* Top Bar: Gold Background (brand.primary) with Black Text (brand.textOnPrimary) */}
                <div className="bg-brand-primary text-brand-textOnPrimary text-xs sm:text-sm py-2 px-4 flex items-center justify-center relative">
                    <span className='text-center font-medium'>Natural Skincare & Wellness</span>
                </div>

                {/* Main Nav: White Background with Light Gray Border */}
                <nav className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-between border-b border-gray-100 relative h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" title="Roots & Radiance Home">
                            <img
                                src={logoPath}
                                alt="Roots & Radiance Logo"
                                className="h-10 w-auto" // Adjust size as needed
                            />
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex flex-grow justify-center items-stretch h-full min-w-0 space-x-3 lg:space-x-4 xl:space-x-6">
                        <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
                        
                        {loadingCategories && <span className="flex items-center text-sm text-black px-2 py-5 animate-pulse">Loading...</span>}
                        {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                            <NavLink key={category.id} to={`/category/${category.slug}`} className={navLinkClass}>{category.name}</NavLink>
                        ))}
                        {categoryError && <span className="flex items-center text-sm text-red-600 px-2 py-5">Error loading categories</span>}
                        <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
                    </div>

                    {/* Right Icons: Explicitly Black */}
                    <div className="flex items-center space-x-2 sm:space-x-3 text-black">
                        <button onClick={toggleSearchOverlay} aria-label="Open Search" className="p-2 hover:text-brand-primary transition-colors">
                            <FiSearch size={20} />
                        </button>

                        {!authLoading && (
                            isAuthenticated ? (
                                <>
                                    <Link to="/account" aria-label="My Account" title={`Logged in as ${user?.nicename || 'user'}`} className="p-2 hover:text-brand-primary transition-colors flex items-center"><FiUser size={20} /></Link>
                                    <button onClick={handleLogout} aria-label="Logout" title="Logout" className={authButtonClass}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login" aria-label="Login" title="Login" className={authButtonClass}>Login</Link>
                            )
                        )}
                        {authLoading && <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-200 border-t-brand-primary"></div>}

                        <Link to="/cart" aria-label="Cart" className="p-2 hover:text-brand-primary transition-colors relative">
                            <FiShoppingCart size={20} />
                            {!cartLoading && cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-accent text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                            {cartLoading && isAuthenticated && ( <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-spin rounded-full border-gray-200 border-t-brand-accent"></span> )}
                        </Link>

                        <button className="md:hidden p-1 hover:text-brand-primary transition-colors" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Flyout: White Background, Black Text */}
            <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMobileMenu}></div>
            <div className={`md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <h2 className="font-semibold text-black">Menu</h2>
                    <button onClick={closeMobileMenu} aria-label="Close Menu" className="text-black hover:text-brand-primary"><FiX size={24} /></button>
                </div>
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-65px)]">
                    <button 
                        onClick={() => { closeMobileMenu(); toggleSearchOverlay(); }} 
                        className="flex items-center w-full py-2 px-3 rounded text-black hover:bg-gray-100 hover:text-brand-primary mb-2"
                    >
                        <FiSearch className="mr-3" size={18}/> Search Products
                    </button>

                    <NavLink to="/" className={mobileNavLinkClass} onClick={closeMobileMenu} end>Home</NavLink>
                    <NavLink to="/shop" className={mobileNavLinkClass} onClick={closeMobileMenu}>Shop</NavLink>
                    
                    {loadingCategories && <span className="block py-2 px-3 text-black animate-pulse">Loading...</span>}
                    {!loadingCategories && !categoryError && topLevelCategories.map(category => (
                        <NavLink key={category.id} to={`/category/${category.slug}`} className={mobileNavLinkClass} onClick={closeMobileMenu}>{category.name}</NavLink>
                    ))}
                    {categoryError && <span className="block py-2 px-3 text-sm text-red-600">Could not load categories</span>}
                    <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMobileMenu}>About Us</NavLink>
                    
                    <div className='pt-2 border-t border-gray-100 mt-2'>
                        {!authLoading && (
                            isAuthenticated ? ( <>
                                <NavLink to="/account" className={mobileNavLinkClass} onClick={closeMobileMenu}>My Account</NavLink>
                                <button onClick={handleLogout} className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-black">Logout</button>
                            </> ) : (
                                <NavLink to="/login" className={mobileNavLinkClass} onClick={closeMobileMenu}>Login</NavLink>
                            )
                        )}
                        {authLoading && <span className="block py-2 px-3 text-black">Checking status...</span>}
                    </div>
                 </nav>
            </div>

            {/* Full Screen Search Overlay: White Background, Black Text */}
            {isSearchOverlayVisible && (
                <div 
                    className="fixed inset-0 bg-white/98 backdrop-blur-sm flex flex-col items-center justify-start pt-16 md:pt-24 p-4 z-50 transition-opacity duration-300 ease-in-out"
                >
                    <button 
                        onClick={toggleSearchOverlay} 
                        aria-label="Close Search" 
                        className="absolute top-6 right-6 md:top-8 md:right-8 text-black hover:text-brand-primary p-2 z-[51]"
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
                                placeholder={animatedPlaceholder}
                                className="w-full px-6 py-4 text-lg md:text-xl border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-white text-black placeholder-gray-500 search-input-placeholder" 
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

                        {searchQuery.trim().length >= 2 && (
                            <div className="mt-4 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-[60vh] overflow-y-auto">
                                {isLoadingSuggestions && <div className="p-4 text-sm text-center text-black">Searching...</div>}
                                {!isLoadingSuggestions && !suggestions.length && searchQuery.trim().length >= 2 && (
                                    <div className="p-4 text-sm text-center text-black">No products found matching "{searchQuery}".</div>
                                )}
                                {!isLoadingSuggestions && suggestions.length > 0 && (
                                    <ul>
                                        {suggestions.map((product) => (
                                            <li key={product.id} className="border-b border-gray-100 last:border-b-0">
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleSuggestionClick(product)}
                                                    className="w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                                                >
                                                    {product.images?.[0]?.src && (
                                                        <img src={product.images[0].src} alt={product.name} className="w-10 h-10 object-contain rounded-sm flex-shrink-0 bg-gray-100"/>
                                                    )}
                                                    <span className="flex-grow truncate">{product.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                        <li className="border-t border-gray-100">
                                            <button 
                                                type="button"
                                                onClick={handleSearchSubmit}
                                                className="w-full text-center px-4 py-3 text-sm font-medium text-brand-primary hover:bg-gray-50 transition-colors duration-150"
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