// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchProducts } from '../api/woocommerce'; // Your API function
import ProductCard from '../components/ProductCard'; // Your ProductCard component
import { ShimmerProductCard } from '../components/ShimmerPlaceholder'; // Shimmer for loading

// Helper to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const queryParams = useQuery();
  const searchQuery = queryParams.get('q');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0); // Optional: if API returns total

  useEffect(() => {
    if (!searchQuery) {
      setProducts([]);
      setLoading(false);
      setError('Please enter a search term.');
      return;
    }

    const loadSearchResults = async () => {
      setLoading(true);
      setError(null);
      setProducts([]);
      try {
        console.log(`[SearchResultsPage] Fetching products for query: "${searchQuery}"`);
        // The WooCommerce API might return total results in headers (X-WP-Total)
        // For simplicity, we're not handling headers here directly but you could extend axiosConfig
        const fetchedProducts = await fetchProducts({
          search: searchQuery,
          per_page: 12, // Adjust as needed
        });

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
          // To get total results, you might need to inspect response headers if your `WorkspaceProducts` returns them
          // For example: setTotalResults(response.headers['x-wp-total']);
          // Or, if the API doesn't provide it easily, you can use fetchedProducts.length for the current page.
          setTotalResults(fetchedProducts.length); // Placeholder: actual total might be different if pagination is involved
        } else {
          console.warn("[SearchResultsPage] Expected an array of products, got:", fetchedProducts);
          setProducts([]);
          setTotalResults(0);
        }

      } catch (err) {
        console.error("[SearchResultsPage] Failed to load search results:", err);
        setError(`Failed to load search results for "${searchQuery}". Please try again.`);
        setProducts([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [searchQuery]); // Re-run effect when searchQuery changes

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      {searchQuery ? (
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-brand-heading">
          Search Results for: <span className="text-brand-primary">"{searchQuery}"</span>
        </h1>
      ) : (
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-brand-heading">Product Search</h1>
      )}


      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ShimmerProductCard key={`search-shimmer-${index}`} />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-10">
          <p className="text-red-600 text-lg mb-2">{error}</p>
          <Link to="/" className="text-brand-primary hover:underline">
            Go back to Homepage
          </Link>
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <>
              {/* Optional: Display number of results */}
              {/* <p className="text-sm text-gray-600 mb-4">{totalResults} product(s) found.</p> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {/* TODO: Add Pagination controls here if totalResults > products.length */}
            </>
          ) : (
            searchQuery && <p className="text-center py-10 text-gray-600 text-lg">No products found matching your search term "{searchQuery}".</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;