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
    Icon: TbDroplet, // Or another suitable icon if you find a better one
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
    <section className="bg-white py-16 md:py-24"> {/* Background and padding */}
      <div className="container mx-auto px-6 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          The future of personal care is here
        </h2>
        {/* Sub-heading */}
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-12 md:mb-16">
          Embrace Minimalist, where each element is chosen for its scientific merit; offering you authentic, effective skincare solutions.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Icon */}
              <feature.Icon
                className="h-12 w-12 md:h-14 md:w-14 text-gray-800 mb-4" // Adjust size and color
                strokeWidth={1} // Adjust stroke width for outline icons if needed
              />
              {/* Title */}
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
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