// // src/pages/HomePage.jsx
// import React from 'react';
// import Hero from '../components/Hero';
// import BestSellers from '../components/BestSellers';
// import ShopByCategory from '../components/ShopByCategory';
// import ShopByConcern from '../components/ShopByConcern';
// import FeaturesSection from '../components/FeaturesSection';

// const HomePage = () => {
//   return (
//     <div>
//       {/* Hero section - often full width */}
//       <Hero />

//       {/* Container for subsequent sections with consistent padding */}
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Spacing between sections */}
//         <div className="space-y-16 md:space-y-20 lg:space-y-24 py-12 md:py-16">

//           {/* Standard Sections */}
//           <BestSellers />
//           <ShopByCategory />
//           <ShopByConcern />
//           <FeaturesSection />

//           {/* Placeholder for Newsletter Section */}
//           {/*
//           <section className="py-12 md:py-16 bg-brand-subtle/30 rounded-lg">
//             <div className="container mx-auto px-6 text-center">
//               <h2 className="text-2xl font-semibold mb-4 text-brand-heading">Stay Updated</h2>
//               <p className="text-brand-foreground mb-6 max-w-xl mx-auto">
//                 Subscribe to our newsletter for the latest updates, skincare tips, and exclusive offers.
//               </p>
//               <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
//                 <label htmlFor="newsletter-email" className="sr-only">Email address</label>
//                 <input
//                   type="email"
//                   id="newsletter-email"
//                   placeholder="Enter your email"
//                   required
//                   className="flex-grow px-4 py-2 border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-brand-primary text-white px-6 py-2 rounded-md font-medium hover:bg-brand-primary-hover transition-colors"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </section>
//           */}

//            {/* Placeholder for Testimonials Section */}
//            {/*
//            <section className="py-12 md:py-16">
//               <div className="container mx-auto px-6">
//                  <h2 className="text-2xl font-semibold text-center mb-10 text-brand-heading">What Our Customers Say</h2>
//                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                      {/* Example Testimonial Card *}
//                      <div className="bg-white p-6 rounded-lg shadow border border-brand-subtle text-center">
//                          <p className="text-brand-foreground mb-4 italic">"This product changed my skin! Highly recommend."</p>
//                          <p className="font-semibold text-brand-heading">- Happy Customer</p>
//                      </div>
//                      {/* Add more testimonials *}
//                  </div>
//               </div>
//            </section>
//            */}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero'; //
import BestSellers from '../components/BestSellers'; //
import ShopByCategory from '../components/ShopByCategory'; //
import ShopByConcern from '../components/ShopByConcern'; //
import FeaturesSection from '../components/FeaturesSection'; //

// Import the new components (assuming they are in src/components/)
import RecommendedForYou from '../components/RecommendedForYou';
import NewLaunches from '../components/NewLaunches';

const HomePage = () => {
  return (
    <div>
      {/* Hero section - Main heading banner */}
      <Hero />

      {/* Main content area */}
      <div className="py-12 md:py-16 space-y-16 md:space-y-20 lg:space-y-24">

        {/* 1. Recommended for You */}
        <RecommendedForYou />

        {/* 2. Our Bestsellers */}
        <BestSellers />

        {/* 3. Shop by Category */}
        <ShopByCategory />

        {/* 4. Shop by Concern */}
        <ShopByConcern />

        {/* 5. New Launches */}
        <NewLaunches />

        {/* FeaturesSection (Positioned after the new ordered items) */}
        <FeaturesSection />

        {/* Placeholder for Newsletter Section (optional) */}
        {/*
        <section className="bg-brand-subtle/30 rounded-lg">
          <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-brand-heading">Stay Updated</h2>
            <p className="text-brand-foreground mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest updates, skincare tips, and exclusive offers.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-2 border border-brand-subtle rounded-md focus:ring-brand-primary focus:border-brand-primary bg-brand-card text-brand-foreground"
              />
              <button
                type="submit"
                className="bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded-md font-medium hover:bg-brand-primary-hover transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
        */}

         {/* Placeholder for Testimonials Section (optional) */}
         {/*
         <section>
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
               <h2 className="text-2xl font-semibold text-center mb-10 text-brand-heading">What Our Customers Say</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="bg-brand-card p-6 rounded-lg shadow border border-brand-subtle text-center">
                       <p className="text-brand-foreground mb-4 italic">"This product changed my skin! Highly recommend."</p>
                       <p className="font-semibold text-brand-heading">- Happy Customer</p>
                   </div>
                   // Add more testimonials
               </div>
            </div>
         </section>
         */}

      </div>
    </div>
  );
};

export default HomePage;