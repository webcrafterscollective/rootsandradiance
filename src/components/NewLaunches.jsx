// // src/components/NewLaunches.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchProducts } from '../api/woocommerce'; // API function
// import ProductCard from './ProductCard'; // Your ProductCard component
// import { ShimmerProductCard } from './ShimmerPlaceholder'; // Shimmer for loading

// const NewLaunches = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const numberOfProductsToShow = 4; // Adjust as needed

//   useEffect(() => {
//     const loadNewLaunches = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const fetchedProducts = await fetchProducts({
//           per_page: numberOfProductsToShow,
//           orderby: 'date', // Order by publish date
//           order: 'desc',   // Show newest first
//         });
//         setProducts(fetchedProducts);
//       } catch (err) {
//         console.error("[NewLaunches] Failed to load new products:", err);
//         setError('Failed to load new products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadNewLaunches();
//   }, []);

//   return (
//     <section className="container mx-auto px-4 sm:px-6">
//       <h2 className="text-2xl font-semibold mb-6 text-left text-brand-heading">New Launches</h2>

//       {error && !loading && <p className="text-center text-red-500 py-4">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
//         {loading ? (
//           Array.from({ length: numberOfProductsToShow }).map((_, index) => (
//             <ShimmerProductCard key={`new-launch-shimmer-${index}`} />
//           ))
//         ) : products.length > 0 ? (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           !error && <p className="col-span-full text-center text-brand-foreground/80 py-10">No new products to display currently.</p>
//         )}
//       </div>

//       {/* Optional "View All New" Button - links to shop page, perhaps with a sort filter if your shop supports it */}
//       {!loading && !error && products.length > 0 && (
//          <div className="text-center mt-10">
//              <Link
//                 to="/shop?sort=newest" // Example link, adjust query param as needed
//                 className="inline-block border border-brand-primary text-brand-primary px-8 py-2.5 rounded text-sm font-medium hover:bg-brand-primary/10 hover:text-brand-primary-hover transition-colors"
//               >
//                 View All New Products
//               </Link>
//          </div>
//        )}
//     </section>
//   );
// };

// export default NewLaunches;
// src/components/NewLaunches.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/woocommerce'; //
import ProductCard from './ProductCard'; //
import { ShimmerProductCard } from './ShimmerPlaceholder'; //

const NewLaunches = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numberOfProductsToShow = 4; // Display 4 new products

  useEffect(() => {
    const loadNewLaunches = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await fetchProducts({
          per_page: numberOfProductsToShow,
          orderby: 'date', // Order by the date they were published
          order: 'desc',   // 'desc' for newest first
        });
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("[NewLaunches] Failed to load new products:", err);
        setError('Could not fetch our latest products at this time. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadNewLaunches();
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6"> {/* Consistent container */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-left text-brand-heading">
          New Launches
        </h2>
        {!loading && !error && products.length > 0 && (
          <Link
            to="/shop?orderby=date&order=desc" // Example: Link to shop page sorted by newest
            className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
          >
            View All New
          </Link>
        )}
      </div>

      {error && !loading && <p className="text-center text-red-500 py-10">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {loading ? (
          Array.from({ length: numberOfProductsToShow }).map((_, index) => (
            <ShimmerProductCard key={`new-launch-shimmer-${index}`} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          !error && <p className="col-span-full text-center text-brand-foreground/70 py-10">Keep an eye out! New products coming soon.</p>
        )}
      </div>
    </section>
  );
};

export default NewLaunches;