// src/api/woocommerce.js
import axios from 'axios';

// Direct WooCommerce API URL from environment variable
const WOOCOMMERCE_API_URL = `${import.meta.env.VITE_WORDPRESS_API_URL}/wc/v3`;

// --- WARNING: Storing and using the Secret here is insecure and NOT recommended ---
// --- Use a backend proxy or WPGraphQL (preferred) for production environments. ---
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;
// --- End Warning ---

// Axios configuration for Basic Authentication
// Includes `withCredentials: true` which might be necessary for cross-origin authenticated requests,
// assuming the server sends back 'Access-Control-Allow-Credentials: true'.
const axiosConfig = {
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET
  },
  withCredentials: true // Important for sending credentials (like Basic Auth header) cross-origin
};

/**
 * Fetches products directly from WooCommerce using Basic Auth (INSECURE PATTERN).
 * Requires correct CORS headers on the server (including Allow-Credentials).
 * @param {object} params - WooCommerce REST API query parameters
 * @returns {Promise<Array>} - Promise resolving to an array of products
 */
export const fetchProducts = async (params = {}) => {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error("[fetchProducts] Missing WooCommerce credentials in frontend .env file!");
    // Consider throwing an error or returning an empty array depending on desired behavior
    return []; // Return empty array instead of throwing to prevent app crash maybe?
    // throw new Error("Missing WooCommerce credentials.");
  }
  const requestUrl = `${WOOCOMMERCE_API_URL}/products`;
  console.log(`[fetchProducts] Calling WC API directly. URL: ${requestUrl}, Params:`, params);

  try {
    const response = await axios.get(requestUrl, {
      params: params,
      ...axiosConfig
    });
    console.log("[fetchProducts] Received products directly from WC:", response.data);
    if (!Array.isArray(response.data)) {
        console.warn("[fetchProducts] Received non-array data from API:", response.data);
        // Return empty array or throw error
        return [];
        // throw new Error("Received invalid data format (expected array).");
    }
    return response.data;
  } catch (error) {
    console.error(`[fetchProducts] Error fetching products from ${requestUrl}:`, error.response?.data || error.message);
    if (error.response) {
      console.error('[fetchProducts] Backend Error Response:', { status: error.response.status, data: error.response.data });
       if (error.response.status === 401) { console.error("[fetchProducts] Authentication failed (401)!"); }
    } else if (error.request) {
      console.error('[fetchProducts] No response received:', error.request);
      console.error('[fetchProducts] Check Network/CORS.');
    } else {
      console.error('[fetchProducts] Error setting up request:', error.message);
    }
    // throw error; // Or return empty array
    return [];
  }
};

/**
 * Fetches a single product by EITHER its numeric ID OR its slug using Basic Auth (INSECURE PATTERN).
 * @param {number|string} identifier - The numeric ID or the slug of the product.
 * @returns {Promise<object|null>} - Promise resolving to the product object or null if not found.
 */
export const fetchProductById = async (identifier) => {
  if (!identifier) {
    console.warn("[fetchProductById] No identifier (ID or slug) provided.");
    return null; // Return null instead of throwing
    // throw new Error("No product identifier provided.");
  }
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error("[fetchProductById] Missing WooCommerce credentials in frontend .env file!");
    return null; // Return null
    // throw new Error("Missing WooCommerce credentials.");
  }

  // Check if the identifier looks like a numeric ID or a slug
  const isNumericId = /^\d+$/.test(identifier);
  let requestUrl = '';
  let requestParams = {}; // Initialize as empty object

  if (isNumericId) {
    // Fetch by numeric ID
    requestUrl = `${WOOCOMMERCE_API_URL}/products/${identifier}`;
    console.log(`[fetchProductById] Calling WC API by ID: ${identifier}. URL: ${requestUrl}`);
    // requestParams = { ...axiosConfig }; // No query params needed for direct ID fetch
    requestParams = { ...axiosConfig, params: {} }; // Ensure params object exists even if empty
  } else {
    // Fetch by slug
    requestUrl = `${WOOCOMMERCE_API_URL}/products`;
    // Set params specifically for slug query
    requestParams = {
      params: { slug: identifier },
      ...axiosConfig, // Spread auth config here
    };
    console.log(`[fetchProductById] Calling WC API by slug: ${identifier}. URL: ${requestUrl}, Params:`, requestParams.params);
  }


  try {
    // Pass the fully constructed requestParams object
    const response = await axios.get(requestUrl, requestParams);

    if (isNumericId) {
      // If fetched by ID, response.data is the product object
      console.log(`[fetchProductById] Received single product by ID (${identifier}):`, response.data);
      if (typeof response.data === 'object' && response.data !== null && response.data.id) {
        // Ensure databaseId exists for GraphQL compatibility later, if possible
        if (!response.data.databaseId && response.data.id) {
            response.data.databaseId = response.data.id;
        }
        return response.data;
      } else {
         console.error(`[fetchProductById] Invalid data received for product ID ${identifier}.`);
         return null; // Return null on invalid data
         // throw new Error(`Invalid data received for product ${identifier}.`);
      }
    } else {
      // If fetched by slug, response.data is an ARRAY of products
      console.log(`[fetchProductById] Received products array by slug (${identifier}):`, response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Return the first product found matching the slug
        const foundProduct = response.data[0];
        console.log(`[fetchProductById] Found product match by slug:`, foundProduct);
         // Ensure databaseId exists for GraphQL compatibility later, if possible
        if (!foundProduct.databaseId && foundProduct.id) {
            foundProduct.databaseId = foundProduct.id;
        }
        return foundProduct;
      } else {
        // No product found with that slug
        console.warn(`[fetchProductById] No product found with slug "${identifier}"`);
        return null; // Explicitly return null if slug not found
      }
    }
  } catch (error) {
    console.error(`[fetchProductById] Error fetching product ${identifier} from ${requestUrl}:`, error.response?.data || error.message);
    if (error.response) {
        if (error.response.status === 404) {
            console.error(`[fetchProductById] Product with identifier '${identifier}' not found (404).`);
        } else {
            console.error('[fetchProductById] Backend Error Response:', { status: error.response.status, data: error.response.data });
        }
    } else if (error.request) {
      console.error('[fetchProductById] No response received.');
    } else {
      console.error('[fetchProductById] Error setting up request:', error.message);
    }
    // Return null on error instead of throwing to allow graceful handling in component
    return null;
  }
};


/**
 * Fetches product categories from WooCommerce using Basic Auth (INSECURE PATTERN).
 * Requires correct CORS headers on the server (including Allow-Credentials).
 * @param {object} params - WooCommerce REST API query parameters for categories
 * @returns {Promise<Array>} - Promise resolving to an array of category objects
 */
export const fetchCategories = async (params = {}) => {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error("[fetchCategories] Missing WooCommerce credentials.");
    return []; // Return empty array
    // throw new Error("Missing WooCommerce credentials.");
  }

  const requestUrl = `${WOOCOMMERCE_API_URL}/products/categories`;
  console.log(`[fetchCategories] Calling WC API. URL: ${requestUrl}, Params:`, params);

  try {
    const response = await axios.get(requestUrl, {
      params: params,
      ...axiosConfig
    });
    console.log("[fetchCategories] Received categories:", response.data);
    if (!Array.isArray(response.data)) {
        console.warn("[fetchCategories] Received non-array data from API:", response.data);
        return []; // Return empty array
        // throw new Error("Received invalid category data format.");
    }
    return response.data;
  } catch (error) {
    console.error(`[fetchCategories] Error fetching categories from ${requestUrl}:`, error.response?.data || error.message);
    if (error.response) {
      console.error('[fetchCategories] Backend Error Response:', { status: error.response.status, data: error.response.data });
       if (error.response.status === 400 && error.response.data?.message) {
           console.error(`[fetchCategories] Bad Request (400): ${error.response.data.message}`, error.response.data);
       } else if (error.response.status === 401) { console.error("[fetchCategories] Authentication failed (401)."); }
    } else if (error.request) {
      console.error('[fetchCategories] No response received. Check Network/CORS.');
    } else {
      console.error('[fetchCategories] Error setting up request:', error.message);
    }
    // throw error; // Or return empty array
    return [];
  }
};

/**
 * Fetches terms for a specific product attribute ID using Basic Auth (INSECURE PATTERN).
 * Requires correct CORS headers on the server.
 * @param {number|string} attributeId - The ID of the attribute (e.g., ID for "Concern").
 * @param {object} params - Additional query parameters (e.g., { per_page: 100 })
 * @returns {Promise<Array>} - Promise resolving to an array of attribute term objects
 */
export const fetchAttributeTerms = async (attributeId, params = {}) => {
  if (!attributeId) {
      console.warn("[fetchAttributeTerms] No attributeId provided.");
      return []; // Return empty array
      // throw new Error("No attribute ID provided.");
  }
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("[fetchAttributeTerms] Missing WooCommerce credentials.");
       return []; // Return empty array
      // throw new Error("Missing WooCommerce credentials.");
  }

  const requestUrl = `${WOOCOMMERCE_API_URL}/products/attributes/${attributeId}/terms`;
  console.log(`[fetchAttributeTerms] Calling WC API. URL: ${requestUrl}, Params:`, params);

  try {
      const response = await axios.get(requestUrl, {
          params: params,
          ...axiosConfig
      });
      console.log(`[fetchAttributeTerms] Received terms for attribute ${attributeId}:`, response.data);
      if (!Array.isArray(response.data)) {
          console.warn("[fetchAttributeTerms] Received non-array data from API:", response.data);
          return []; // Return empty array
          // throw new Error("Received invalid attribute term data format.");
      }
      return response.data;
  } catch (error) {
      console.error(`[fetchAttributeTerms] Error fetching terms for attribute ${attributeId}:`, error.response?.data || error.message);
      if (error.response) {
        console.error('[fetchAttributeTerms] Backend Error Response:', { status: error.response.status, data: error.response.data });
         if (error.response.status === 401) { console.error("[fetchAttributeTerms] Authentication failed (401)."); }
      } else if (error.request) {
        console.error('[fetchAttributeTerms] No response received. Check Network/CORS.');
      } else {
        console.error('[fetchAttributeTerms] Error setting up request:', error.message);
      }
      // throw error; // Or return empty array
      return [];
  }
};

/**
* Fetches attribute details to find an ID by slug using Basic Auth (INSECURE PATTERN).
* This is inefficient; consider creating a dedicated proxy endpoint or hardcoding known IDs.
* @param {string} attributeSlug - The slug of the attribute (e.g., 'concern').
* @returns {Promise<number|null>} - Promise resolving to the attribute ID or null.
*/
export const findAttributeIdBySlug = async (attributeSlug) => {
   if (!attributeSlug) return null;
   if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.error("[findAttributeIdBySlug] Missing WooCommerce credentials.");
      return null; // Return null
      // throw new Error("Missing WooCommerce credentials.");
   }

   // This fetches ALL attributes - potentially cache this result client-side if needed often
   const requestUrl = `${WOOCOMMERCE_API_URL}/products/attributes`;
   console.log(`[findAttributeIdBySlug] Fetching all attributes to find slug: ${attributeSlug}`);
   try {
      const response = await axios.get(requestUrl, axiosConfig);
      const attributes = response.data;
      if (!Array.isArray(attributes)) {
         console.warn("[findAttributeIdBySlug] Received non-array data for attributes:", attributes);
         return null;
      }
      const foundAttribute = attributes.find(attr => attr.slug === attributeSlug);
      if (foundAttribute) {
          console.log(`[findAttributeIdBySlug] Found ID ${foundAttribute.id} for slug ${attributeSlug}`);
          return foundAttribute.id;
      } else {
          console.warn(`[findAttributeIdBySlug] Attribute with slug "${attributeSlug}" not found.`);
          return null;
      }
   } catch (error) {
       console.error(`[findAttributeIdBySlug] Error fetching attributes:`, error.response?.data || error.message);
       // Handle specific errors if needed
       return null;
   }
};

// --- CART / CHECKOUT Functions ---
// NOTE: This file SHOULD NOT contain cart/checkout logic when using the insecure direct API approach.
// You should use WPGraphQL or CoCart (via direct calls or proxy) for cart operations.
// The AddToCart logic now resides in CartContext.js using GraphQL mutations.