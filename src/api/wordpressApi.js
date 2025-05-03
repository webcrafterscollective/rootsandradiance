// src/api/wordpressApi.js
import axios from 'axios';

const WP_API_URL = `${import.meta.env.VITE_WORDPRESS_API_URL}/wp/v2`;

/**
 * Fetches a single page by its slug.
 * @param {string} slug - The slug of the page (e.g., 'about-us').
 * @returns {Promise<object|null>} - Promise resolving to the page object or null if not found/error.
 */
export const fetchPageBySlug = async (slug) => {
  if (!slug) return null;
  try {
    // Fetch pages with the specific slug. Should return an array, usually with one item.
    const response = await axios.get(`${WP_API_URL}/pages`, {
      params: {
        slug: slug,
        // '_embed': true // Optionally embed linked data like featured images
      }
    });

    // If the response includes data and the array isn't empty, return the first page found.
    if (response.data && response.data.length > 0) {
      console.log(`Workspaceed page data for slug "${slug}":`, response.data[0]);
      return response.data[0];
    } else {
      console.warn(`No page found with slug "${slug}"`);
      return null; // No page found with that slug
    }
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error.response ? error.response.data : error.message);
    return null; // Return null on error
  }
};