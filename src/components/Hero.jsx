// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// Assuming fetchProducts is still needed for Hero, otherwise remove/replace with GraphQL
import { fetchProducts } from '../api/woocommerce';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// --- Custom Arrow Components with Updated Styling ---
const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    if (!onClick) return null; // Don't render if not clickable

    // Using solid theme color, hover state, shadow, and focus ring
    const combinedClassName = `${className || ''}
        flex items-center justify-center
        w-9 h-9 md:w-10 md:h-10
        rounded-full
        bg-brand-primary text-white
        hover:bg-brand-primary-hover
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-background
        shadow-md
        transition-colors duration-200
        !right-3 md:!right-5 z-10`; // Keep !important for positioning if needed
    return (
      <button
        className={combinedClassName}
        style={{ ...style, display: 'flex' }} // Ensure display flex is applied
        onClick={onClick}
        aria-label="Next Slide"
      >
        <FiChevronRight size={24} />
      </button>
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    if (!onClick) return null; // Don't render if not clickable

    // Using solid theme color, hover state, shadow, and focus ring
    const combinedClassName = `${className || ''}
        flex items-center justify-center
        w-9 h-9 md:w-10 md:h-10
        rounded-full
        bg-brand-primary text-white
        hover:bg-brand-primary-hover
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-background
        shadow-md
        transition-colors duration-200
        !left-3 md:!left-5 z-10`; // Keep !important for positioning if needed
    return (
      <button
        className={combinedClassName}
        style={{ ...style, display: 'flex' }} // Ensure display flex is applied
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={24} />
      </button>
    );
}

// --- Hero Shimmer Placeholder (remains the same) ---
const HeroShimmer = () => (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] bg-gray-50 p-6 md:p-12 lg:p-16 overflow-hidden w-full">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0"><div className="w-full max-w-md aspect-square"><ShimmerPlaceholder type="box" className="h-full !rounded-lg" /></div></div>
        <div className="w-full md:w-1/2 md:pl-10 space-y-4"><ShimmerPlaceholder type="text" className="w-1/3 h-4" /><ShimmerPlaceholder type="title" className="w-4/5 h-8 mb-3" /><ShimmerPlaceholder type="text" className="w-full h-4" /><ShimmerPlaceholder type="text" className="w-full h-4" /><ShimmerPlaceholder type="text" className="w-2/3 h-4" /><ShimmerPlaceholder type="box" className="w-36 h-12 mt-6 !rounded" /></div>
    </div>
);

// --- Hero Component ---
const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // MODIFIED backgroundStyles for lighter gradients
  const backgroundStyles = [
    // 'bg-white' //need to make it white : when need to fix hero gradiant
    'bg-gradient-to-r from-gray-100 via-green-50 to-brand-primary/10', // Was: from-brand-background
    'bg-gradient-to-r from-gray-100 via-pink-50 to-brand-accent/10',   // Was: from-brand-background
    'bg-brand-primary/5', // This is already very light. If still an issue, consider 'bg-gray-50' or 'bg-gradient-to-r from-gray-100 via-yellow-50 to-yellow-100'
  ];

  useEffect(() => {
    const loadHeroProducts = async () => {
      setLoading(true); setError(null); setSlides([]);
      try {
        const fetchedProducts = await fetchProducts({ featured: true, per_page: 4 });
        if (!fetchedProducts || fetchedProducts.length === 0) {
          console.warn("[Hero] No featured products found via API.");
          setSlides([]);
        } else {
             const formattedSlides = fetchedProducts.map((product, index) => {
                 const description = (product.short_description || product.description || '')
                                     .replace(/<[^>]*>?/gm, '')
                                     .split(' ').slice(0, 25).join(' ') + '...';
                 return {
                    id: product.id,
                    image: product.images?.[0]?.src || '/images/placeholder.png',
                    lifestyleImage: product.images?.[1]?.src || product.images?.[0]?.src || '/images/placeholder.png',
                    alt: product.images?.[0]?.alt || product.name || 'Product image',
                    bgColor: backgroundStyles[index % backgroundStyles.length],
                    preTitle: product.categories?.[0]?.name || "Featured Product",
                    title: product.name,
                    description: description,
                    buttonText: 'Shop Now',
                    buttonLink: `/products/${product.slug || product.id}`
                 };
            });
            setSlides(formattedSlides);
        }
      } catch (err) {
        console.error("[Hero] Failed to load products:", err);
        setError('Failed to load featured products.');
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };
    loadHeroProducts();
  }, []); // Removed backgroundStyles from dependencies as it's defined in the component scope


  // --- Slider Settings ---
  const isSingleSlide = slides.length <= 1;
  const settings = {
    dots: true,
    appendDots: dots => (<div className="absolute bottom-6 md:bottom-8 left-0 right-0"><ul className="m-0 p-0 flex justify-center">{dots}</ul></div>),
    customPaging: i => (<div className="w-2.5 h-2.5 rounded-full cursor-pointer slick-dot-inactive"></div>),
    infinite: !isSingleSlide, // Ensures continuous loop if more than one slide
    speed: 700,               // Speed of the transition animation
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !isSingleSlide, // Autoplay only if needed
    autoplaySpeed: 6000,      // Kept 6 seconds per slide, adjusted from previous 3000ms comment
    pauseOnHover: true,       // Pauses autoplay on hover (standard behavior)
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    fade: true,
    cssEase: 'linear',
    draggable: !isSingleSlide,
    swipe: !isSingleSlide,
    touchMove: !isSingleSlide,
  };

  // --- Render Logic ---
  if (loading) {
    return <HeroShimmer />;
  }

  if (error) {
    return ( <div className="flex items-center justify-center min-h-[70vh] bg-red-50 text-red-700 p-6"><p>{error}</p></div> );
  }

  return (
    <div className="w-full relative hero-slider-container overflow-hidden bg-gray-50 min-h-[50vh]">
      {slides.length > 0 ? (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.id}>
              {/* The slide.bgColor (which uses the modified backgroundStyles) is applied here */}
              <div className={`flex flex-col md:flex-row items-center justify-center min-h-[60vh] md:min-h-[70vh] lg:min-h-[calc(100vh-120px)] ${slide.bgColor} p-6 md:p-12 lg:p-16 relative`}>
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 relative z-10 order-1 md:order-1 px-4 group">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[50vh] md:h-[67vh]">
                    <img
                      src={slide.image} alt={slide.alt}
                      className="w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                    />
                    <img
                      src={slide.lifestyleImage} alt={slide.alt}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                      loading="lazy"
                      onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                    />
                  </div>
                </div>
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-center md:text-left md:pl-6 lg:pl-12 xl:pl-20 relative z-10 order-2 md:order-2 px-4">
                  {slide.preTitle && <p className="text-sm font-medium text-gray-600 mb-1 md:mb-2">{slide.preTitle}</p>}
                  <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-brand-heading mb-3 md:mb-4 leading-tight">{slide.title}</h1>
                  <p className="text-base text-gray-700 mb-6 max-w-md mx-auto md:mx-0">{slide.description}</p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-block bg-brand-primary text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm font-semibold rounded hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors duration-300"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
         // Fallback content
         <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 p-6 text-center">
             <h2 className="text-2xl font-semibold text-brand-heading mb-4">Explore Our Collection</h2>
             <p className="text-gray-600 mb-6">Discover natural skincare and wellness essentials.</p>
             <Link to="/shop" className="inline-block bg-brand-primary text-white px-6 py-2.5 text-sm rounded hover:bg-brand-primary-hover transition-colors">Shop Now</Link>
         </div>
      )}
    </div>
  );
};

export default Hero;