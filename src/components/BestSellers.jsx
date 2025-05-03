// src/components/BestSellers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/woocommerce'; // API function
import ProductCard from './ProductCard';           // Use the updated ProductCard
import { ShimmerProductCard } from './ShimmerPlaceholder'; // Shimmer card

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numberOfPlaceholders = 4;

  useEffect(() => {
    const loadBestSellers = async () => {
      setLoading(true);
      setError(null);
      setProducts([]);
      try {
        console.log("[BestSellers] Fetching best selling products...");
        const fetchedProducts = await fetchProducts({
          per_page: numberOfPlaceholders,
          orderby: 'popularity',
          order: 'desc'
        });
        console.log("[BestSellers] Received products:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("[BestSellers] Failed to load best sellers:", err);
        setError('Failed to load best sellers. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadBestSellers();
  }, []);

  return (
    // Added vertical margin (my-*) and horizontal padding (px-*)
    <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16 my-8 md:my-12">
      <h2 className="text-2xl font-semibold mb-6 text-left">Our Best Sellers</h2>

      {error && !loading && <p className="text-center text-red-600 py-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {loading ? (
          // Render Shimmer Placeholders
          Array.from({ length: numberOfPlaceholders }).map((_, index) => (
            <ShimmerProductCard key={`bestseller-shimmer-${index}`} />
          ))
        ) : products.length > 0 ? (
          // Render Actual Product Cards using the updated component
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
           !error && <p className="col-span-full text-center text-gray-600 py-10">Could not find best selling products.</p>
        )}
      </div>

      {/* "View all products" Button */}
      {!loading && !error && products.length > 0 && (
         <div className="text-center mt-10">
             <Link
                to="/shop"
                className="inline-block border border-black text-black px-8 py-2.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                View all products
              </Link>
         </div>
       )}
    </section>
  );
};

export default BestSellers;