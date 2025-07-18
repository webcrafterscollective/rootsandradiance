// import React, { useState, useEffect } from 'react';
// import { fetchProducts } from '../api/woocommerce'; // Import the API function
// import { Link } from 'react-router-dom';

// const ShopPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const fetchedProducts = await fetchProducts({ per_page: 12 }); // Fetch first 12 products
//         setProducts(fetchedProducts);
//       } catch (err) {
//          // Error is already logged in the api function, but set state here
//          setError('Failed to load products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []); // Empty dependency array means this runs once on mount

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold mb-6">Shop All Products</h1>

//       {loading && <p className="text-center">Loading products...</p>}
//       {error && <p className="text-center text-red-600">{error}</p>}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
//                 {/* Basic Product Card Structure */}
//                 <Link to={`/products/${product.id}`}> {/* Link to potential product detail page */}
//                    {product.images && product.images.length > 0 && (
//                       <img
//                         src={product.images[0].src}
//                         alt={product.images[0].alt || product.name}
//                         className="w-full h-48 object-cover" // Adjust height as needed
//                         loading="lazy"
//                       />
//                    )}
//                    <div className="p-4">
//                      <h2 className="text-lg font-semibold mb-1 truncate" title={product.name}>{product.name}</h2>
//                      {/* WooCommerce price is often HTML, parse carefully or use raw dangerouslySetInnerHTML (with caution!) */}
//                      <div
//                         className="text-gray-700 mb-2"
//                         dangerouslySetInnerHTML={{ __html: product.price_html || `${product.price} ${product.currency_symbol || ''}` }}
//                      />
//                      {/* Add to Cart button - Will require backend later */}
//                      <button
//                          className="mt-2 w-full bg-gray-800 text-white py-2 px-4 rounded text-sm hover:bg-black transition-colors disabled:opacity-50"
//                          // onClick={() => handleAddToCart(product.id)} // Requires backend implementation
//                          disabled // Disable until backend is ready
//                        >
//                          Add to Cart (Requires Backend)
//                      </button>
//                    </div>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       )}
//        {/* Add Pagination controls here later */}
//     </div>
//   );
// };

// export default ShopPage;

// src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/woocommerce';
import ProductCard from '../components/ProductCard';
import { ShimmerProductCard } from '../components/ShimmerPlaceholder';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // You can adjust per_page to control how many products load initially
        const fetchedProducts = await fetchProducts({ per_page: 12 });
        setProducts(fetchedProducts);
      } catch (err) {
         setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8 text-brand-heading text-center">Shop All Products</h1>

      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {loading ? (
          // Display shimmer placeholders while products are loading
          Array.from({ length: 8 }).map((_, index) => (
            <ShimmerProductCard key={`shop-shimmer-${index}`} />
          ))
        ) : products.length > 0 ? (
          // Map over the fetched products and render a ProductCard for each one
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Display a message if no products are found and there's no error
          !error && <p className="col-span-full text-center py-10 text-brand-foreground/80">No products found.</p>
        )}
      </div>

       {/* You can add pagination controls here in the future */}
    </div>
  );
};

export default ShopPage;