// src/components/ShopByConcern.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { findAttributeIdBySlug, fetchAttributeTerms } from '../api/woocommerce';

// --- IMPORTANT ---
// Mapping slugs to the images shown in the screenshot.
// Replace these paths with images you upload to your public/images/ folder.
// This is necessary because standard WC Attributes don't have images in the API.
// Using a Custom Taxonomy + ACF Image field is the better way to make this dynamic.
const concernImageMap = {
    'uneven-tone': '/images/concern-uneven-tone.jpg', // Replace with actual image paths
    'acne-control': '/images/concern-acne.jpg',
    'oiliness': '/images/concern-oiliness.jpg',
    'aging-wrinkles': '/images/concern-wrinkles.jpg',
    // Add mappings for other concern slugs you might fetch
};
const defaultConcernImage = '/images/placeholder.png';

const ShopByConcern = () => {
    const [concernTerms, setConcernTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const concernAttributeSlug = 'concern'; // The slug you gave the attribute in WP

    useEffect(() => {
        const loadConcerns = async () => {
            setLoading(true);
            try {
                // 1. Find the ID of the 'concern' attribute
                const attributeId = await findAttributeIdBySlug(concernAttributeSlug);

                if (attributeId) {
                    // 2. Fetch the terms (e.g., Acne Control, Oiliness) for that attribute
                    const params = { per_page: 4, orderby: 'menu_order' }; // Limit to 4 shown in screenshot
                    const terms = await fetchAttributeTerms(attributeId, params);
                    setConcernTerms(terms);
                } else {
                     console.warn(`Attribute "${concernAttributeSlug}" not found.`);
                     setConcernTerms([]); // Ensure it's empty if attribute not found
                }
            } catch (error) {
                console.error("ShopByConcern: Failed to load concerns:", error);
            } finally {
                setLoading(false);
            }
        };
        loadConcerns();
    }, []); // Run once

    if (loading) {
        return <div className="container mx-auto px-6 py-8 text-center">Loading Concerns...</div>;
    }

    if (concernTerms.length === 0) {
        return null; // Don't render if no concerns found or attribute missing
    }

    return (
        <section className="container mx-auto px-4 sm:px-6 py-12">
            <h2 className="text-2xl font-semibold mb-6 text-left">Shop by Concerns</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {concernTerms.map((term) => (
                    // Link destination needs refinement - how will you filter by attribute term?
                    // Option A: Link to shop page with query param: /shop?filter_concern=acne-control
                    // Option B: Link to category page if concerns map well: /category/acne-products
                    // Needs filter implementation on the target page. Using /shop?filter_concern=... for now.
                    <Link
                        key={term.id}
                        to={`/shop?filter_${concernAttributeSlug}=${term.slug}`}
                        className="block rounded-lg overflow-hidden shadow-sm group text-center hover:shadow-lg transition-shadow duration-300"
                    >
                         <div className="aspect-square overflow-hidden">
                            <img
                                // Use hardcoded image based on slug, or default
                                src={concernImageMap[term.slug] || defaultConcernImage}
                                alt={term.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => { e.target.src = defaultConcernImage; }}
                            />
                        </div>
                        <div className="py-3 px-2">
                            <h3 className="text-sm font-medium text-gray-800">
                                {term.name}
                            </h3>
                             {/* Optional: Term description */}
                             {/* <p className="text-xs text-gray-500">{term.description}</p> */}
                        </div>
                    </Link>
                ))}
            </div>
             {/* Optional: Add slider dots/arrows if using a slider */}
        </section>
    );
};

export default ShopByConcern;