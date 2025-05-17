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

// Import the FloatingWhatsApp component
import { FloatingWhatsApp } from 'react-floating-whatsapp';

// Optional: If you have a logo in your assets folder and want to use it as an avatar
// import siteLogo from './assets/your-logo.png'; // Make sure the path is correct

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

          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/account" element={<AccountPage />} />

           {/* Cart Page */}
           <Route path="/cart" element={<CartPage />} />

          {/* TODO: Add routes for other footer links (FAQs, Policy etc.) */}
          {/* Example: <Route path="/faqs" element={<FaqPage />} /> */}

          {/* Catch-all for 404 Not Found (Optional) */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer />

      {/* Add the FloatingWhatsApp component here */}
      <FloatingWhatsApp
        phoneNumber="YOUR_INTERNATIONAL_PHONE_NUMBER" // E.g., "12345678900" (country code + number, no symbols)
        accountName="Roots & Radiance" // Your company name
        avatar="/images/footer-logo.png" // Example: Using the logo path from your Footer.jsx. Adjust if needed or remove for default.
        statusMessage="Typically replies within an hour" // Optional: Text below account name
        chatMessage="Hello there! 🌿 How can we help you with your skincare or wellness needs?" // Optional: Default chat message
        placeholder="Type a message..." // Optional: Placeholder for the input field
        allowEsc
        allowClickAway
        notification
        notificationSound
        notificationDelay={60000} // Optional: Delay in ms for notification (e.g., 60 seconds)
        // You can customize colors to match your theme:
        // buttonStyle={{ backgroundColor: '#yourBrandColor', bottom: '20px', right: '20px' }}
        // chatboxStyle={{ /* chatbox custom styles */ }}
        // darkMode={false} // Set to true if you want a dark theme for the chatbox
      />
    </div>
  );
}

export default App;