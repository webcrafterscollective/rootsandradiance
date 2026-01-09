// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoPath = '/images/footer-logo.png';

  return (
    // Ensure bg is dark and text is light gold
    <footer className="bg-brand-footer text-brand-primary-light">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Column 1: Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {/* Added explicit text-brand-primary-light to ensure visibility */}
              <li><Link to="/refund-and-cancellation-policy" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">Refund and Cancellation Policy</Link></li>
              <li><Link to="/faqs" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 2: About Us / More Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/terms-conditions" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-xs text-brand-primary-light hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Logo & Contact Us */}
          <div className="mb-6 md:mb-0">
             <div className="mb-5">
                 <Link to="/">
                     <img
                        src={logoPath}
                        alt="Roots & Radiance Logo"
                        className="h-20 w-auto"
                     />
                 </Link>
             </div>
             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-3">Contact Us</h3>
             <p className="text-xs mb-3 leading-relaxed text-brand-primary-light">
                Need help? email us: <br />
                <a href="mailto:support@rootsandradiance.in" className="hover:text-brand-primary underline transition-colors text-brand-primary-light">support@rootsandradiance.in</a>
             </p>
             <div className="flex space-x-4 mt-4 text-brand-primary-light">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-brand-primary transition-colors"><FiMail size={18} /></a>
                <a href="https://www.facebook.com/rootsandradiance.shop" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors"><FiFacebook size={18} /></a>
                <a href="https://www.instagram.com/rootsandradiance.shop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors"><FiInstagram size={18} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-brand-primary transition-colors"><FiYoutube size={18} /></a>
             </div>
          </div>
        </div>

        <div className="border-t border-brand-subtle pt-6 text-center md:text-left">
          <p className="text-xs text-gray-500">
            Copyright © {currentYear} Roots & Radiance. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;