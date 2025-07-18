// // // // // src/components/Footer.jsx
// // // // import React from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'; // Using Feather icons

// // // // const Footer = () => {
// // // //   const currentYear = new Date().getFullYear();
// // // //   const logoPath = '/images/footer-logo.png'; // <-- ADJUST THIS PATH TO YOUR LOGO

// // // //   return (
// // // //     // --- UPDATE Footer BG from Theme ---
// // // //     // Use the 'brand-footer' color defined in tailwind.config.js
// // // //     // Keep text light for contrast on dark background
// // // //     <footer className="bg-brand-footer text-gray-300">
// // // //       <div className="container mx-auto px-6 pt-16 pb-8">
// // // //         {/* Main footer content grid - 3 columns on medium screens and up */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

// // // //           {/* Column 1: Quick Links */}
// // // //           <div className="mb-6 md:mb-0">
// // // //              {/* Keep heading white for contrast */}
// // // //             <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
// // // //              {/* Keep link text light, hover white */}
// // // //             <ul className="space-y-2">
// // // //               <li><Link to="/knowledge" className="text-xs hover:text-white transition-colors">Knowledge</Link></li>
// // // //               <li><Link to="/faqs" className="text-xs hover:text-white transition-colors">FAQs</Link></li>
// // // //               <li><Link to="/return-refund-policy" className="text-xs hover:text-white transition-colors">Return & Refund Policy</Link></li>
// // // //               <li><Link to="/track-order" className="text-xs hover:text-white transition-colors">Track Order</Link></li>
// // // //               <li><Link to="/help-center" className="text-xs hover:text-white transition-colors">Help Center</Link></li>
// // // //               <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Download App</a></li>
// // // //             </ul>
// // // //           </div>

// // // //           {/* Column 2: About Us / More Links */}
// // // //           <div className="mb-6 md:mb-0">
// // // //              {/* Keep heading white */}
// // // //             <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About Minimalist</h3>
// // // //             {/* Keep link text light, hover white */}
// // // //             <ul className="space-y-2">
// // // //               <li><Link to="/about-us" className="text-xs hover:text-white transition-colors">About Us</Link></li>
// // // //               <li><Link to="/our-values" className="text-xs hover:text-white transition-colors">Our Values</Link></li>
// // // //               <li><Link to="/privacy-policy" className="text-xs hover:text-white transition-colors">Privacy Policy</Link></li>
// // // //               <li><Link to="/terms-conditions" className="text-xs hover:text-white transition-colors">Terms & Conditions</Link></li>
// // // //               <li><Link to="/media-outreach" className="text-xs hover:text-white transition-colors">Media Outreach</Link></li>
// // // //               <li><Link to="/distributor-queries" className="text-xs hover:text-white transition-colors">Distributor Queries</Link></li>
// // // //             </ul>
// // // //           </div>

// // // //           {/* Column 3: Logo & Contact Us */}
// // // //           <div className="mb-6 md:mb-0">
// // // //              {/* Logo */}
// // // //              <div className="mb-5">
// // // //                  <Link to="/"> {/* Link logo to homepage */}
// // // //                      <img
// // // //                         src={logoPath}
// // // //                         alt="Minimalist Logo"
// // // //                         className="h-20 w-auto" // Adjust height as needed, width will scale
// // // //                      />
// // // //                  </Link>
// // // //              </div>

// // // //              {/* Contact Info */}
// // // //               {/* Keep heading white */}
// // // //              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Contact Us</h3>
// // // //              {/* Keep link text light, hover white */}
// // // //              <p className="text-xs mb-3 leading-relaxed">
// // // //                 Need help? Fill out our <Link to="/contact-us" className="underline hover:text-white">contact form</Link> or email us: <br />
// // // //                 <a href="mailto:help@example.com" className="hover:text-white underline transition-colors">help@example.com</a> {/* <-- Update email */}
// // // //              </p>
// // // //              {/* Social Icons */}
// // // //              <div className="flex space-x-4 mt-4">
// // // //                  {/* Keep icons light, hover white */}
// // // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-white transition-colors"><FiMail size={18} /></a>
// // // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors"><FiFacebook size={18} /></a>
// // // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><FiInstagram size={18} /></a>
// // // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition-colors"><FiYoutube size={18} /></a>
// // // //              </div>
// // // //           </div>

// // // //         </div>

// // // //         {/* Bottom Bar - Copyright */}
// // // //         {/* Keep border dark gray (lighter than footer bg) */}
// // // //         <div className="border-t border-gray-700 pt-6 text-center md:text-left">
// // // //           {/* Keep copyright text muted */}
// // // //           <p className="text-xs text-gray-400">
// // // //             Copyright © {currentYear} Roots & Radiance. All Rights Reserved.
// // // //              {/* Optional links styling remains the same */}
// // // //              {/* <Link to="/terms-conditions" className="ml-4 hover:text-white">Terms</Link> */}
// // // //              {/* <Link to="/privacy-policy" className="ml-4 hover:text-white">Privacy</Link> */}
// // // //           </p>
// // // //         </div>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // };

// // // // export default Footer;

// // // // src/components/Footer.jsx
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'; // Using Feather icons

// // // const Footer = () => {
// // //   const currentYear = new Date().getFullYear();
// // //   // Assuming you have a gold/light version of your logo for dark backgrounds
// // //   const logoPath = '/images/footer-logo.png'; // ADJUST THIS PATH if needed

// // //   return (
// // //     <footer className="bg-brand-footer text-brand-primary-light"> {/* Footer BG (black), text light gold */}
// // //       <div className="container mx-auto px-6 pt-16 pb-8">
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

// // //           {/* Column 1: Quick Links */}
// // //           <div className="mb-6 md:mb-0">
// // //             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">Quick Links</h3> {/* Headings: foreground (light grey/white) */}
// // //             <ul className="space-y-2">
// // //               <li><Link to="/knowledge" className="text-xs hover:text-brand-primary transition-colors">Knowledge</Link></li> {/* Links light gold, hover main gold */}
// // //               <li><Link to="/faqs" className="text-xs hover:text-brand-primary transition-colors">FAQs</Link></li>
// // //               <li><Link to="/return-refund-policy" className="text-xs hover:text-brand-primary transition-colors">Return & Refund Policy</Link></li>
// // //               <li><Link to="/track-order" className="text-xs hover:text-brand-primary transition-colors">Track Order</Link></li>
// // //               <li><Link to="/help-center" className="text-xs hover:text-brand-primary transition-colors">Help Center</Link></li>
// // //               <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-brand-primary transition-colors">Download App</a></li>
// // //             </ul>
// // //           </div>

// // //           {/* Column 2: About Us / More Links */}
// // //           <div className="mb-6 md:mb-0">
// // //             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">About Minimalist</h3>
// // //             <ul className="space-y-2">
// // //               <li><Link to="/about-us" className="text-xs hover:text-brand-primary transition-colors">About Us</Link></li>
// // //               <li><Link to="/our-values" className="text-xs hover:text-brand-primary transition-colors">Our Values</Link></li>
// // //               <li><Link to="/privacy-policy" className="text-xs hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
// // //               <li><Link to="/terms-conditions" className="text-xs hover:text-brand-primary transition-colors">Terms & Conditions</Link></li>
// // //               <li><Link to="/media-outreach" className="text-xs hover:text-brand-primary transition-colors">Media Outreach</Link></li>
// // //               <li><Link to="/distributor-queries" className="text-xs hover:text-brand-primary transition-colors">Distributor Queries</Link></li>
// // //             </ul>
// // //           </div>

// // //           {/* Column 3: Logo & Contact Us */}
// // //           <div className="mb-6 md:mb-0">
// // //              <div className="mb-5">
// // //                  <Link to="/">
// // //                      <img
// // //                         src={logoPath} // Use a logo suitable for dark backgrounds
// // //                         alt="Roots & Radiance Logo"
// // //                         className="h-20 w-auto"
// // //                      />
// // //                  </Link>
// // //              </div>
// // //              <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-3">Contact Us</h3>
// // //              <p className="text-xs mb-3 leading-relaxed">
// // //                 Need help? Fill out our <Link to="/contact-us" className="underline hover:text-brand-primary">contact form</Link> or email us: <br />
// // //                 <a href="mailto:help@example.com" className="hover:text-brand-primary underline transition-colors">help@example.com</a>
// // //              </p>
// // //              <div className="flex space-x-4 mt-4 text-brand-primary-light"> {/* Icons light gold */}
// // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-brand-primary transition-colors"><FiMail size={18} /></a>
// // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors"><FiFacebook size={18} /></a>
// // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors"><FiInstagram size={18} /></a>
// // //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-brand-primary transition-colors"><FiYoutube size={18} /></a>
// // //              </div>
// // //           </div>
// // //         </div>

// // //         <div className="border-t border-brand-subtle pt-6 text-center md:text-left"> {/* Subtle border */}
// // //           <p className="text-xs text-gray-500"> {/* Copyright text muted grey */}
// // //             Copyright © {currentYear} Roots & Radiance. All Rights Reserved.
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // };
// // // export default Footer;

// // // src/components/Footer.jsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'; // Using Feather icons

// // const Footer = () => {
// //   const currentYear = new Date().getFullYear();
// //   // Assuming you have a gold/light version of your logo for dark backgrounds
// //   const logoPath = '/images/footer-logo.png'; // ADJUST THIS PATH if needed

// //   return (
// //     <footer className="bg-brand-footer text-brand-primary-light"> {/* Footer BG (black), text light gold */}
// //       <div className="container mx-auto px-6 pt-16 pb-8">
// //         {/* Main footer content grid - 3 columns on medium screens and up */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

// //           {/* Column 1: Quick Links */}
// //           <div className="mb-6 md:mb-0">
// //             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">Quick Links</h3> {/* Headings: foreground (light grey/white) */}
// //             <ul className="space-y-2">
// //               <li><Link to="/knowledge" className="text-xs hover:text-brand-primary transition-colors">Knowledge</Link></li> {/* Links light gold, hover main gold */}
// //               <li><Link to="/faqs" className="text-xs hover:text-brand-primary transition-colors">FAQs</Link></li>
// //               <li><Link to="/refund-and-cancellation-policy" className="text-xs hover:text-brand-primary transition-colors">Refund and Cancellation Policy</Link></li>
// //               <li><Link to="/track-order" className="text-xs hover:text-brand-primary transition-colors">Track Order</Link></li>
// //               <li><Link to="/help-center" className="text-xs hover:text-brand-primary transition-colors">Help Center</Link></li>
// //               <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-brand-primary transition-colors">Download App</a></li>
// //             </ul>
// //           </div>

// //           {/* Column 2: About Us / More Links */}
// //           <div className="mb-6 md:mb-0">
// //             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">About Minimalist</h3>
// //             <ul className="space-y-2">
// //               <li><Link to="/about-us" className="text-xs hover:text-brand-primary transition-colors">About Us</Link></li>
// //               <li><Link to="/our-values" className="text-xs hover:text-brand-primary transition-colors">Our Values</Link></li>
// //               <li><Link to="/privacy-policy" className="text-xs hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
// //               <li><Link to="/terms-conditions" className="text-xs hover:text-brand-primary transition-colors">Terms & Conditions</Link></li>
// //               <li><Link to="/media-outreach" className="text-xs hover:text-brand-primary transition-colors">Media Outreach</Link></li>
// //               <li><Link to="/distributor-queries" className="text-xs hover:text-brand-primary transition-colors">Distributor Queries</Link></li>
// //             </ul>
// //           </div>

// //           {/* Column 3: Logo & Contact Us */}
// //           <div className="mb-6 md:mb-0">
// //              <div className="mb-5">
// //                  <Link to="/">
// //                      <img
// //                         src={logoPath} // Use a logo suitable for dark backgrounds
// //                         alt="Roots & Radiance Logo"
// //                         className="h-20 w-auto"
// //                      />
// //                  </Link>
// //              </div>
// //              <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-3">Contact Us</h3>
// //              <p className="text-xs mb-3 leading-relaxed">
// //                 Need help? Fill out our <Link to="/contact-us" className="underline hover:text-brand-primary">contact form</Link> or email us: <br />
// //                 <a href="mailto:help@example.com" className="hover:text-brand-primary underline transition-colors">help@example.com</a>
// //              </p>
// //              <div className="flex space-x-4 mt-4 text-brand-primary-light"> {/* Icons light gold */}
// //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-brand-primary transition-colors"><FiMail size={18} /></a>
// //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors"><FiFacebook size={18} /></a>
// //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors"><FiInstagram size={18} /></a>
// //                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-brand-primary transition-colors"><FiYoutube size={18} /></a>
// //              </div>
// //           </div>
// //         </div>

// //         <div className="border-t border-brand-subtle pt-6 text-center md:text-left"> {/* Subtle border */}
// //           <p className="text-xs text-gray-500"> {/* Copyright text muted grey */}
// //             Copyright © {currentYear} Roots & Radiance. All Rights Reserved.
// //           </p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };
// // export default Footer;

// // src/components/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const logoPath = '/images/footer-logo.png';

//   return (
//     <footer className="bg-brand-footer text-brand-primary-light">
//       <div className="container mx-auto px-6 pt-16 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

//           {/* Column 1: Quick Links */}
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><Link to="/knowledge" className="text-xs hover:text-brand-primary transition-colors">Knowledge</Link></li>
//               <li><Link to="/faqs" className="text-xs hover:text-brand-primary transition-colors">FAQs</Link></li>
//               <li><Link to="/refund-and-cancellation-policy" className="text-xs hover:text-brand-primary transition-colors">Refund and Cancellation Policy</Link></li>
//               <li><Link to="/track-order" className="text-xs hover:text-brand-primary transition-colors">Track Order</Link></li>
//               <li><Link to="/help-center" className="text-xs hover:text-brand-primary transition-colors">Help Center</Link></li>
//               <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-brand-primary transition-colors">Download App</a></li>
//             </ul>
//           </div>

//           {/* Column 2: About Us / More Links */}
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">About Minimalist</h3>
//             <ul className="space-y-2">
//               <li><Link to="/about-us" className="text-xs hover:text-brand-primary transition-colors">About Us</Link></li>
//               <li><Link to="/our-values" className="text-xs hover:text-brand-primary transition-colors">Our Values</Link></li>
//               <li><Link to="/privacy-policy" className="text-xs hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
//               <li><Link to="/terms-conditions" className="text-xs hover:text-brand-primary transition-colors">Terms & Conditions</Link></li> {/* <-- UPDATED LINK */}
//               <li><Link to="/media-outreach" className="text-xs hover:text-brand-primary transition-colors">Media Outreach</Link></li>
//               <li><Link to="/distributor-queries" className="text-xs hover:text-brand-primary transition-colors">Distributor Queries</Link></li>
//             </ul>
//           </div>

//           {/* Column 3: Logo & Contact Us */}
//           <div className="mb-6 md:mb-0">
//              <div className="mb-5">
//                  <Link to="/">
//                      <img
//                         src={logoPath}
//                         alt="Roots & Radiance Logo"
//                         className="h-20 w-auto"
//                      />
//                  </Link>
//              </div>
//              <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-3">Contact Us</h3>
//              <p className="text-xs mb-3 leading-relaxed">
//                 Need help? Fill out our <Link to="/contact-us" className="underline hover:text-brand-primary">contact form</Link> or email us: <br />
//                 <a href="mailto:help@example.com" className="hover:text-brand-primary underline transition-colors">help@example.com</a>
//              </p>
//              <div className="flex space-x-4 mt-4 text-brand-primary-light">
//                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-brand-primary transition-colors"><FiMail size={18} /></a>
//                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors"><FiFacebook size={18} /></a>
//                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors"><FiInstagram size={18} /></a>
//                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-brand-primary transition-colors"><FiYoutube size={18} /></a>
//              </div>
//           </div>
//         </div>

//         <div className="border-t border-brand-subtle pt-6 text-center md:text-left">
//           <p className="text-xs text-gray-500">
//             Copyright © {currentYear} Roots & Radiance. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };
// export default Footer;

// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoPath = '/images/footer-logo.png';

  return (
    <footer className="bg-brand-footer text-brand-primary-light">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Column 1: Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/refund-and-cancellation-policy" className="text-xs hover:text-brand-primary transition-colors">Refund and Cancellation Policy</Link></li>
              <li><Link to="/faqs" className="text-xs hover:text-brand-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 2: About Us / More Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-sm font-semibold text-brand-foreground uppercase tracking-wider mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-xs hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/terms-conditions" className="text-xs hover:text-brand-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-xs hover:text-brand-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-xs hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
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
             <p className="text-xs mb-3 leading-relaxed">
                Need help? email us: <br />
                <a href="mailto:support@rootsandradiance.in" className="hover:text-brand-primary underline transition-colors">support@rootsandradiance.in</a>
             </p>
             <div className="flex space-x-4 mt-4 text-brand-primary-light">
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Email us" className="hover:text-brand-primary transition-colors"><FiMail size={18} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors"><FiFacebook size={18} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors"><FiInstagram size={18} /></a>
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