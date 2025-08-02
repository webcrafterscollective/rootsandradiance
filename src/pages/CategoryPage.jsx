// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategories, fetchProducts } from '../api/woocommerce';
import ProductCard from '../components/ProductCard'; // Import reusable card

const CategoryPage = () => {
    const { categorySlug } = useParams();
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const productsPerPage = 12;

    // Placeholder states for filters (will be implemented later)
    const [sortBy, setSortBy] = useState('menu_order'); // Default sort
    const [activeFilters, setActiveFilters] = useState({}); // e.g., { attribute_pa_color: 'red', min_price: 100 }

    // Fetch category details and initial products
    useEffect(() => {
        const loadData = async () => {
            if (!categorySlug) return;
            setLoading(true);
            setError(null);
            setCategory(null);
            setProducts([]);
            setPage(1); // Reset page on slug change

            try {
                // Fetch category details to get ID and name
                const categories = await fetchCategories({ slug: categorySlug });
                if (!categories || categories.length === 0) throw new Error(`Category "${categorySlug}" not found.`);
                const currentCategory = categories[0];
                setCategory(currentCategory);

                // Fetch first page of products for this category
                const productParams = {
                    category: currentCategory.id,
                    per_page: productsPerPage,
                    page: 1,
                    orderby: sortBy.includes('price') ? 'price' : sortBy, // Adjust orderby if needed
                    order: sortBy.includes('price-desc') ? 'desc' : 'asc', // Adjust order
                    // TODO: Add filter parameters based on activeFilters state
                    // Example: attribute: 'pa_color', attribute_term: activeFilters['attribute_pa_color'], etc.
                };
                const fetchedProducts = await fetchProducts(productParams);
                setProducts(fetchedProducts);
                setHasMore(fetchedProducts.length === productsPerPage);

            } catch (err) {
                console.error("Error loading category page:", err);
                setError(err.message || "Failed to load category products.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    // Effect dependencies: Re-run if slug, sort order, or filters change
    }, [categorySlug, sortBy, activeFilters]); // Add sortBy and activeFilters here


    // TODO: Implement loadMoreProducts function for pagination/infinite scroll
    const loadMoreProducts = async () => {
         if (loading || !hasMore || !category) return; // Prevent multiple loads
         setLoading(true); // Indicate loading more
         const nextPage = page + 1;
         try {
             const productParams = {
                category: category.id, per_page: productsPerPage, page: nextPage,
                orderby: sortBy.includes('price') ? 'price' : sortBy,
                order: sortBy.includes('price-desc') ? 'desc' : 'asc',
                // ... add filter params ...
             };
             const fetchedProducts = await fetchProducts(productParams);
             setProducts(prev => [...prev, ...fetchedProducts]); // Append new products
             setPage(nextPage);
             setHasMore(fetchedProducts.length === productsPerPage);
         } catch(err) {
              console.error("Failed to load more products:", err);
              // Optionally set an error state specific to loading more
         } finally {
            setLoading(false); // Stop loading indicator
         }
    }

    // TODO: Implement handleSortChange and handleFilterChange functions

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8">
            {/* Page Title and Description */}
            <h1 className="text-3xl font-bold mb-2">
                {category ? category.name : `Category: ${categorySlug}`}
            </h1>
            {category?.description && (
                <div className="mb-6 text-sm text-gray-600 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: category.description }} />
            )}

             {/* Error Display */}
             {error && !loading && <p className="text-center text-red-600 py-10">{error}</p>}

            {/* Main Content Grid (Products + Filters Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* --- Filters Sidebar (Right Column on Large Screens) --- */}
                <aside className="lg:col-span-1 lg:order-last">
                     <div className="sticky top-24 p-4 border rounded-lg shadow-sm bg-white"> {/* Sticky positioning */}
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>
                        {/* Sorting Dropdown */}
                        <div className="mb-6">
                             <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                             <select
                                id="sort-by" name="sort-by"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                             >
                                <option value="menu_order">Default</option>
                                <option value="popularity">Popularity</option>
                                <option value="rating">Average rating</option>
                                <option value="date">Newness</option>
                                <option value="price">Price: low to high</option>
                                <option value="price-desc">Price: high to low</option>
                             </select>
                        </div>

                        {/* Placeholder for Filter Options */}
                        <div className="space-y-4">
                             <p className="text-sm text-gray-500 text-center">(Soting as per your preference)</p>
                             {/* Example Filter Group */}
                             <div>
                                 <label className="flex items-center space-x-2 text-sm">
                                     <input type="checkbox" className="rounded" />
                                     <span style={{ color:'grey' }}>In Stock</span>
                                 </label>
                                 
                                 <h3 className="font-medium text-sm mt-2 mb-2">Availability</h3>
                             </div>
                             {/* Add more filter sections */}
                        </div>
                         <button className="mt-6 w-full text-sm text-center text-gray-600 hover:text-black focus:ring-0 hover:bg-transparent" onClick={() => {setActiveFilters({}); setSortBy('menu_order');}}>
                             Clear Filters
                         </button>
                     </div>
                </aside>

                {/* --- Products Grid (Main Column) --- */}
                <main className="lg:col-span-3">
                    {loading && products.length === 0 && <p className="text-center py-10">Loading products...</p>}

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        !loading && <p>No products found matching your criteria.</p>
                    )}

                    {/* Load More Button */}
                    <div className="text-center mt-10">
                        {hasMore && (
                            <button
                                onClick={loadMoreProducts}
                                disabled={loading}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Load More Products'}
                            </button>
                        )}
                        {!hasMore && products.length > 0 && (
                            <p className="text-gray-500">You've reached the end.</p>
                        )}
                    </div>
                </main>

            </div> {/* End Main Content Grid */}
        </div> // End Container
    );
};

export default CategoryPage;