// // src/components/RecommendedForYou.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchProducts } from '../api/woocommerce'; // API function
// import ProductCard from './ProductCard'; // Your ProductCard component
// import { ShimmerProductCard } from './ShimmerPlaceholder'; // Shimmer for loading

// const RecommendedForYou = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const numberOfProductsToShow = 4; // Adjust as needed

//   useEffect(() => {
//     const loadRecommendedProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetching 'featured' products as a stand-in for recommendations
//         const fetchedProducts = await fetchProducts({
//           per_page: numberOfProductsToShow,
//           featured: true, // Fetch featured products
//         });
//         setProducts(fetchedProducts);
//       } catch (err) {
//         console.error("[RecommendedForYou] Failed to load recommended products:", err);
//         setError('Failed to load recommendations. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRecommendedProducts();
//   }, []);

//   return (
//     <section className="container mx-auto px-4 sm:px-6">
//       <h2 className="text-2xl font-semibold mb-6 text-left text-brand-heading">Recommended for You</h2>

//       {error && !loading && <p className="text-center text-red-500 py-4">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
//         {loading ? (
//           Array.from({ length: numberOfProductsToShow }).map((_, index) => (
//             <ShimmerProductCard key={`recommended-shimmer-${index}`} />
//           ))
//         ) : products.length > 0 ? (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           !error && <p className="col-span-full text-center text-brand-foreground/80 py-10">No specific recommendations for you at the moment. Check out our bestsellers!</p>
//         )}
//       </div>
//        {/* You might not need a "View All" button here if recommendations are highly dynamic or personalized */}
//     </section>
//   );
// };

// export default RecommendedForYou;

// src/components/RecommendedForYou.jsx
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Only if you add a "View All" type link
import { fetchProducts } from '../api/woocommerce'; //
import ProductCard from './ProductCard'; //
import { ShimmerProductCard } from './ShimmerPlaceholder'; //

const RecommendedForYou = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numberOfProductsToShow = 4; // Display 4 recommended products

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetching 'featured' products.
        // Ensure you have products marked as "featured" in your WooCommerce admin.
        const fetchedProducts = await fetchProducts({
          per_page: numberOfProductsToShow,
          featured: true,
        });
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("[RecommendedForYou] Failed to load recommended products:", err);
        setError('Could not fetch recommendations at this time. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadRecommendedProducts();
  }, []);

  // Don't render the section if loading fails or no featured products are found,
  // unless you specifically want to show an error/empty message.
  // This makes it less obtrusive if there's nothing to recommend.
  if (loading || error || (!loading && !error && products.length === 0)) {
    // Optionally, render shimmers only if loading and no error
    if (loading && !error) {
        return (
            <section className="container mx-auto px-4 sm:px-6">
                <h2 className="text-2xl font-semibold mb-6 text-left text-brand-heading">Recommended for You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {Array.from({ length: numberOfProductsToShow }).map((_, index) => (
                        <ShimmerProductCard key={`recommended-shimmer-${index}`} />
                    ))}
                </div>
            </section>
        );
    }
    // If error, or no products and not loading, return null or a minimal message
    // For this example, returning null to hide the section if there's nothing relevant
    return null; 
    // Or, if you want to show an error:
    // if (error) return <section className="container mx-auto px-4 sm:px-6"><p className="text-center text-red-500 py-10">{error}</p></section>;
    // Or, if no products:
    // if (!loading && !error && products.length === 0) return <section className="container mx-auto px-4 sm:px-6"><p className="col-span-full text-center text-brand-foreground/70 py-10">No special recommendations for you today. Explore our bestsellers!</p></section>;
  }


  return (
    <section className="container mx-auto px-4 sm:px-6"> {/* Consistent container */}
      <h2 className="text-2xl font-semibold mb-6 text-left text-brand-heading">
        Recommended for You
      </h2>

      {/* No error message here as we handle error/empty case by returning null above */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {/* products.map will only run if products.length > 0 due to the condition above */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* A "View All" button is generally not used for personalized recommendations */}
    </section>
  );
};

export default RecommendedForYou;