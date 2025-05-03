// src/components/ShopByCategory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/woocommerce';
import ShimmerPlaceholder from './ShimmerPlaceholder'; // Import default shimmer

const ShopByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const numPlaceholders = 4; // Number of placeholders

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            setCategories([]);
            try {
                console.log("[ShopByCategory] Fetching categories...");
                // Fetch top-level categories
                const params = { parent: 0, per_page: numPlaceholders, orderby: 'name' };
                const fetchedCategories = await fetchCategories(params);
                console.log("[ShopByCategory] Raw fetched:", fetchedCategories);
                const filteredCategories = fetchedCategories.filter(cat => cat.slug !== 'uncategorized');
                setCategories(filteredCategories);
                console.log("[ShopByCategory] Filtered categories:", filteredCategories);
            } catch (error) {
                console.error("[ShopByCategory] Failed to load categories:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const getUnsplashImageUrl = (categoryName) => `https://source.unsplash.com/400x400/?${encodeURIComponent(categoryName || 'pattern')}`;

    return (
        <section className="container mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-semibold mb-6 text-left">Shop by Category</h2>
             {/* Error display could be added here if needed */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"> {/* Reduced gap */}
                {loading ? (
                    // Render Shimmer Placeholders
                    Array.from({ length: numPlaceholders }).map((_, index) => (
                       <div key={`shimmer-cat-${index}`} className="aspect-square rounded-lg overflow-hidden">
                            <ShimmerPlaceholder type="box" className="h-full" />
                       </div>
                    ))
                ) : categories.length > 0 ? (
                    // Render Actual Category Cards
                    categories.map((category) => {
                        const imageUrl = category.image?.src || getUnsplashImageUrl(category.name);
                        const imageAlt = category.image?.alt || category.name || 'Category image';
                        return (
                            <Link
                                key={category.id}
                                to={`/category/${category.slug}`}
                                className="block relative rounded-lg overflow-hidden shadow-sm group aspect-square hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                                {/* Centered Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
                                    <h3 className="text-white text-base md:text-lg lg:text-xl font-bold drop-shadow-md"> {/* Slightly smaller text */}
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    // No Categories Message
                     <p className="col-span-full text-center text-gray-500 py-10">No categories to display.</p>
                )}
            </div>
        </section>
    );
};

export default ShopByCategory;