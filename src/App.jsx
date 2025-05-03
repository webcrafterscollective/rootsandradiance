// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // <-- Import Forgot Password Page

function App() {
  return (
    // Ensure flex layout takes full height
    <div className="flex flex-col min-h-screen bg-brand-background">
      <Navbar />
      {/* Allow main content to grow and fill available space */}
      <main className="flex-grow">
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} /> {/* Keep using ID or slug */}
          <Route path="/category/:categorySlug" element={<CategoryPage />} />

          {/* Static Pages */}
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* <-- Add Forgot Password Route */}
          <Route path="/account" element={<AccountPage />} /> {/* Protected route logic is inside AccountPage */}

           {/* Cart Page */}
           <Route path="/cart" element={<CartPage />} /> {/* Requires auth context */}

          {/* TODO: Add routes for other footer links (FAQs, Policy etc.) */}
          {/* Example: <Route path="/faqs" element={<FaqPage />} /> */}

          {/* Catch-all for 404 Not Found (Optional) */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;