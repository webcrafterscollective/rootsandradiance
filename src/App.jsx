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
import TermsConditionsPage from './pages/TermsConditionsPage';
import TermsConditionsPage2 from './pages/TermsConditions2';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import FAQPage from './pages/faq';

// --- Import the new Checkout and Confirmation pages ---
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

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
          <Route path="/terms-conditions" element={<TermsConditionsPage2 />} /> 
          <Route path="/shipping-policy" element={<TermsConditionsPage />} /> 
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> 


          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account" element={<AccountPage />} />

           {/* Cart & Checkout Pages */}
           <Route path="/cart" element={<CartPage />} />
           
           {/* --- Add the new routes for the checkout flow --- */}
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="/order-confirmation" element={<OrderConfirmationPage />} />


          {/* Other Pages */}
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