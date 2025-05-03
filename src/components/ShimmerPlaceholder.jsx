// src/components/ShimmerPlaceholder.jsx
import React from 'react';

const ShimmerPlaceholder = ({ type = 'box', className = '' }) => {
  const baseClass = 'bg-gray-300 rounded animate-pulse';

  if (type === 'text') {
    return <div className={`${baseClass} h-4 w-3/4 ${className}`}></div>;
  }
  if (type === 'title') {
     return <div className={`${baseClass} h-6 w-1/2 mb-4 ${className}`}></div>;
  }
  if (type === 'avatar') {
      return <div className={`${baseClass} rounded-full h-12 w-12 ${className}`}></div>;
  }
  // Default 'box' type (e.g., for images)
  return <div className={`${baseClass} w-full h-48 ${className}`}></div>; // Default height
};

// You might create more specific shimmer components like ShimmerCard
export const ShimmerProductCard = () => (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col h-full p-4 space-y-3">
        <ShimmerPlaceholder type="box" className="h-48" /> {/* Image */}
        <ShimmerPlaceholder type="text" className="w-5/6 h-5" /> {/* Title */}
        <ShimmerPlaceholder type="text" className="w-1/3 h-4" /> {/* Price */}
        <ShimmerPlaceholder type="text" className="w-full h-8 mt-auto" /> {/* Button */}
    </div>
);

export default ShimmerPlaceholder;

// Add shimmer animation to your global CSS (e.g., src/index.css)
/*
@layer base {
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  .animate-pulse {
    background-image: linear-gradient(to right, #e2e8f0 8%, #f1f5f9 18%, #e2e8f0 33%);
    background-size: 2000px 100%;
    animation: shimmer 1.5s linear infinite forwards;
  }
}
*/