// // src/components/FeaturesSection.jsx
// import React from 'react';
// // Import the specific icons needed
// import { TbCirclesRelation, TbDroplet } from 'react-icons/tb';
// import { IoFlaskOutline, IoGlobeOutline } from 'react-icons/io5';

// // Define the feature data - makes it easy to manage/update
// const features = [
//   {
//     Icon: TbCirclesRelation,
//     title: 'Transparency',
//     description: 'Full disclosure of ingredients used & their concentration',
//   },
//   {
//     Icon: IoFlaskOutline,
//     title: 'Efficacy',
//     description: 'Formulations developed in our in-house laboratories',
//   },
//   {
//     Icon: TbDroplet, // Or another suitable icon if you find a better one
//     title: 'Affordable',
//     description: 'Skincare, accessible to all.',
//   },
//   {
//     Icon: IoGlobeOutline,
//     title: 'Only the best',
//     description: 'Ingredients sourced from across the world',
//   },
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="bg-white py-16 md:py-24"> {/* Background and padding */}
//       <div className="container mx-auto px-6 text-center">
//         {/* Main Heading */}
//         <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
//           The future of personal care is here
//         </h2>
//         {/* Sub-heading */}
//         <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-12 md:mb-16">
//           Embrace Minimalist, where each element is chosen for its scientific merit; offering you authentic, effective skincare solutions.
//         </p>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
//           {features.map((feature, index) => (
//             <div key={index} className="flex flex-col items-center">
//               {/* Icon */}
//               <feature.Icon
//                 className="h-12 w-12 md:h-14 md:w-14 text-gray-800 mb-4" // Adjust size and color
//                 strokeWidth={1} // Adjust stroke width for outline icons if needed
//               />
//               {/* Title */}
//               <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               {/* Description */}
//               <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

// src/components/FeaturesSection.jsx
import React from 'react';
// Import the specific icons needed
import { TbCirclesRelation, TbDroplet } from 'react-icons/tb';
import { IoFlaskOutline, IoGlobeOutline } from 'react-icons/io5';

// Define the feature data - makes it easy to manage/update
const features = [
  {
    Icon: TbCirclesRelation,
    title: 'Transparency',
    description: 'Full disclosure of ingredients used & their concentration',
  },
  {
    Icon: IoFlaskOutline,
    title: 'Efficacy',
    description: 'Formulations developed in our in-house laboratories',
  },
  {
    Icon: TbDroplet,
    title: 'Affordable',
    description: 'Skincare, accessible to all.',
  },
  {
    Icon: IoGlobeOutline,
    title: 'Only the best',
    description: 'Ingredients sourced from across the world',
  },
];

const FeaturesSection = () => {
  return (
    // Section background: Using 'brand-card' for a slightly offset dark background, or 'brand-background' if it should blend with the page BG.
    // Padding remains the same unless specific adjustments are needed for the new theme.
    <section className="bg-brand-card py-16 md:py-24">
      <div className="container mx-auto px-6 text-center">
        {/* Main Heading: Using brand-heading (gold) */}
        <h2 className="text-3xl md:text-4xl font-semibold text-brand-heading mb-4">
          The future of personal care is here
        </h2>
        {/* Sub-heading: Using brand-foreground (light grey/off-white) with slight opacity for softness */}
        <p className="text-sm md:text-base text-brand-foreground opacity-80 max-w-2xl mx-auto mb-12 md:mb-16">
          Embrace Minimalist, where each element is chosen for its scientific merit; offering you authentic, effective skincare solutions.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Icon: Using brand-primary (gold) for accent */}
              <feature.Icon
                className="h-12 w-12 md:h-14 md:w-14 text-brand-primary mb-4" // Gold icon
                strokeWidth={1.5} // Adjusted stroke width for better visibility if needed, default 1 might be too thin for some icons in gold
              />
              {/* Title: Using brand-primary-light (lighter gold) for feature titles */}
              <h3 className="text-base md:text-lg font-medium text-brand-primary-light mb-2">
                {feature.title}
              </h3>
              {/* Description: Using brand-foreground with more opacity for a more subtle text */}
              <p className="text-xs md:text-sm text-brand-foreground opacity-70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;