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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SearchResultsPage from './pages/SearchResultsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage'; // <-- IMPORT THE NEW PAGE
import FAQPage from './pages/faq';
// Import the FloatingWhatsApp component
import { FloatingWhatsApp } from 'react-floating-whatsapp';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Static Pages */}
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/refund-and-cancellation-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} /> 


          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account" element={<AccountPage />} />

           {/* Cart Page */}
           <Route path="/cart" element={<CartPage />} />

          {/* TODO: Add routes for other footer links (FAQs, Policy etc.) */}
          <Route path="/faqs" element={<FAQPage />} />

          {/* Catch-all for 404 Not Found (Optional) */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer />

      <FloatingWhatsApp
        phoneNumber="+919958854005"
        accountName="Roots & Radiance"
        avatar="/images/footer-logo.png"
        statusMessage="Typically replies within an hour"
        chatMessage="Hello there! 🌿 How can we help you with your skincare or wellness needs?"
        placeholder="Type a message..."
        allowEsc
        allowClickAway
        notification
        notificationSound
        notificationDelay={60000}
      />
    </div>
  );
}

export default App;