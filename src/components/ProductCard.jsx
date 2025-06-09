// // // src/components/ProductCard.jsx
// // import React from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { FaStar, FaRegStar } from 'react-icons/fa';
// // import { useAuth } from '../context/AuthContext';
// // import { useCart } from '../context/CartContext';

// // // Simple Star Rating Component - Keep yellow color for stars generally
// // const StarRating = ({ rating = 0 }) => {
// //     const totalStars = 5;
// //     const numericRating = parseFloat(rating) || 0;
// //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// //     return (
// //         <div className="flex text-yellow-400 my-1.5">
// //             {[...Array(fullStars)].map((_, i) => ( <FaStar key={`full-${i}`} size={14} /> ))}
// //             {[...Array(totalStars - fullStars)].map((_, i) => ( <FaRegStar key={`empty-${i}`} size={14} /> ))}
// //         </div>
// //     );
// // };

// // const ProductCard = ({ product }) => {
// //   const { isAuthenticated, loading: authLoading, logout } = useAuth();
// //   const { addItem, addingItem, addItemError } = useCart();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   if (!product) return null;

// //   // --- Prepare Product Data ---
// //   const imageUrl = product.images?.[0]?.src || '/images/placeholder.png';
// //   const imageAlt = product.images?.[0]?.alt || product.name || 'Product image';
// //   const productDatabaseId = product.databaseId || product.id;
// //   const productIdForLink = product.slug || product.id;
// //   const isVariable = product.type === 'variable';
// //   const isInStock = product.stock_status === 'instock';
// //   const stripHtml = (html) => {
// //     if (!html) return '';
// //     const doc = new DOMParser().parseFromString(html, 'text/html');
// //     return doc.body?.textContent ?? "";
// //   }
// //   const shortDescText = stripHtml(product.short_description);

// //   // --- Button Logic ---
// //   let buttonText = 'View Product';
// //   let buttonDisabled = authLoading || addingItem;
// //   let buttonOnClick = (e) => {
// //       e.preventDefault(); e.stopPropagation(); navigate(`/products/${productIdForLink}`);
// //   };
// //   let buttonTitle = "View product details";

// //   if (isVariable) {
// //     buttonText = "Select Options";
// //     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate(`/products/${productIdForLink}`); };
// //     buttonTitle = "Select product options";
// //     buttonDisabled = false;
// //   } else if (!isInStock) {
// //     buttonText = "Out of Stock";
// //     buttonDisabled = true;
// //     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); };
// //     buttonTitle = "This product is out of stock";
// //   } else if (!isAuthenticated && !authLoading) {
// //     buttonText = "Login to Add";
// //     buttonDisabled = false;
// //     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/login', { state: { from: location } }); };
// //     buttonTitle = "Login required to add to cart";
// //   } else if (isAuthenticated) {
// //     buttonText = addingItem ? "Adding..." : "Add to Cart";
// //     buttonTitle = addingItem ? "Adding item to your cart" : "Add this item to your cart";
// //     buttonDisabled = addingItem;
// //     buttonOnClick = (e) => {
// //       e.preventDefault(); e.stopPropagation();
// //       if (!productDatabaseId) { console.error("Product ID missing."); alert("INFO: Cannot add item: Product ID missing."); return; }
// //       addItem({ productId: productDatabaseId, quantity: 1 })
// //         .then(() => { alert(`INFO: ${product.name || 'Item'} added to cart!`); })
// //         .catch(err => {
// //             console.error("Error adding item from Product Card:", err);
// //             const isAuthError = err.message.includes("Expired token") || err.message.includes("invalid session") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
// //             if (isAuthError) {
// //                 alert("INFO: Your session has expired. Please log in again.");
// //                 logout();
// //                 navigate('/login', { replace: true, state: { from: location } });
// //             } else {
// //                 alert(`INFO: Failed to add item: ${err.message}`);
// //             }
// //         });
// //     };
// //   }

// //   // --- Render Logic with Theme Colors ---
// //   return (
// //      // --- UPDATE Card Border/BG ---
// //     <div className="border border-brand-subtle rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col h-full bg-white"> {/* Keep white BG for card or use bg-brand-background */}
// //       <Link to={`/products/${productIdForLink}`} className="block flex-grow flex flex-col" title={product.name || 'View Product'}>
// //         {/* Image */}
// //          {/* --- UPDATE Image Placeholder BG (optional) --- */}
// //         <div className="w-full h-48 bg-gray-50 flex items-center justify-center overflow-hidden p-2 relative"> {/* Keep light gray or use e.g. bg-brand-primary/5 */}
// //             <img
// //                 src={imageUrl} alt={imageAlt}
// //                 className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
// //                 loading="lazy" onError={(e) => { e.target.src = '/images/placeholder.png'; }}
// //             />
// //         </div>
// //         {/* Content */}
// //          {/* --- UPDATE Text Colors --- */}
// //         <div className="p-3 flex flex-col flex-grow">
// //           {/* Use brand-foreground for main title */}
// //           <h2 className="text-sm font-semibold mb-1 text-brand-foreground line-clamp-2 flex-grow min-h-[2.5rem]" title={product.name}>
// //             {product.name || 'Product Name'}
// //           </h2>
// //            {/* Keep description lighter gray */}
// //           {shortDescText && ( <p className="text-xs text-gray-500 my-1 line-clamp-2 min-h-[2rem]"> {shortDescText} </p> )}
// //           {product.average_rating != null && ( <StarRating rating={product.average_rating} /> )}
// //           {/* Price */}
// //           {product.price_html ? (
// //              // Use brand-foreground for price
// //              <div
// //                 className="text-sm font-medium text-brand-foreground my-2"
// //                 dangerouslySetInnerHTML={{ __html: product.price_html }}
// //              />
// //            ) : ( <p className="text-sm text-gray-500 my-2">Price unavailable</p> )}
// //         </div>
// //       </Link>
// //        {/* Button Section */}
// //        <div className="p-3 pt-0 mt-auto">
// //             {/* --- UPDATE Button Colors --- */}
// //            <button
// //                 className={`w-full text-white py-2 px-4 rounded text-xs sm:text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed ${
// //                     buttonDisabled
// //                     ? 'bg-gray-400 opacity-70' // Disabled style (grayed out)
// //                     : 'bg-brand-primary hover:bg-brand-primary-hover' // Active style uses theme colors
// //                 }`}
// //                 disabled={buttonDisabled}
// //                 onClick={buttonOnClick}
// //                 title={buttonTitle}
// //             >
// //                 {buttonText}
// //             </button>
// //              {/* Display general add to cart error state */}
// //              {addItemError && !addItemError.message.includes("Expired token") && !isVariable && isInStock && isAuthenticated && (
// //                  <p className="text-red-500 text-xs mt-1 text-center">Error: {addItemError.message}</p>
// //              )}
// //         </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;

// // src/components/ProductCard.jsx
// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FaStar, FaRegStar } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';

// // Star Rating Component - Now uses brand-primary (gold) for stars
// const StarRating = ({ rating = 0 }) => {
//     const totalStars = 5;
//     const numericRating = parseFloat(rating) || 0;
//     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
//     return (
//         <div className="flex text-brand-primary my-1.5"> {/* Gold stars */}
//             {[...Array(fullStars)].map((_, i) => ( <FaStar key={`full-${i}`} size={14} /> ))}
//             {[...Array(totalStars - fullStars)].map((_, i) => ( <FaRegStar key={`empty-${i}`} size={14} /> ))}
//         </div>
//     );
// };

// const ProductCard = ({ product }) => {
//   const { isAuthenticated, loading: authLoading, logout } = useAuth();
//   const { addItem, addingItem, addItemError } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation();

//   if (!product) return null;

//   const imageUrl = product.images?.[0]?.src || '/images/placeholder-dark.png'; // Consider a placeholder for dark themes
//   const imageAlt = product.images?.[0]?.alt || product.name || 'Product image';
//   const productDatabaseId = product.databaseId || product.id;
//   const productIdForLink = product.slug || product.id;
//   const isVariable = product.type === 'variable';
//   const isInStock = product.stock_status === 'instock';

//   const stripHtml = (html) => {
//     if (!html) return '';
//     const doc = new DOMParser().parseFromString(html, 'text/html');
//     return doc.body?.textContent ?? "";
//   }
//   const shortDescText = stripHtml(product.short_description);

//   let buttonText = 'View Product';
//   let buttonDisabled = authLoading || addingItem;
//   let buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate(`/products/${productIdForLink}`); };
//   let buttonTitle = "View product details";

//   if (isVariable) {
//     buttonText = "Select Options";
//     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate(`/products/${productIdForLink}`); };
//     buttonTitle = "Select product options";
//     buttonDisabled = false;
//   } else if (!isInStock) {
//     buttonText = "Out of Stock";
//     buttonDisabled = true;
//     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); };
//     buttonTitle = "This product is out of stock";
//   } else if (!isAuthenticated && !authLoading) {
//     buttonText = "Login to Add";
//     buttonDisabled = false;
//     buttonOnClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/login', { state: { from: location } }); };
//     buttonTitle = "Login required to add to cart";
//   } else if (isAuthenticated) {
//     buttonText = addingItem ? "Adding..." : "Add to Cart";
//     buttonTitle = addingItem ? "Adding item to your cart" : "Add this item to your cart";
//     buttonDisabled = addingItem;
//     buttonOnClick = (e) => {
//       e.preventDefault(); e.stopPropagation();
//       if (!productDatabaseId) { console.error("Product ID missing."); alert("INFO: Cannot add item: Product ID missing."); return; }
//       addItem({ productId: productDatabaseId, quantity: 1 })
//         .then(() => { /* alert(`${product.name || 'Item'} added to cart!`); */ }) // Consider a less obtrusive notification
//         .catch(err => {
//             console.error("Error adding item from Product Card:", err);
//             const isAuthError = err.message.includes("Expired token") || err.message.includes("invalid session") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
//             if (isAuthError) {
//                 // alert("INFO: Your session has expired. Please log in again.");
//                 logout();
//                 navigate('/login', { replace: true, state: { from: location } });
//             } else {
//                 // alert(`INFO: Failed to add item: ${err.message}`);
//             }
//         });
//     };
//   }

//   return (
//     <div className="border border-brand-subtle rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group flex flex-col h-full bg-brand-card text-brand-foreground"> {/* Card BG, Text Foreground */}
//       <Link to={`/products/${productIdForLink}`} className="block flex-grow flex flex-col" title={product.name || 'View Product'}>
//         <div className="w-full h-48 bg-brand-subtle/30 flex items-center justify-center overflow-hidden p-2 relative"> {/* Image area BG */}
//             <img
//                 src={imageUrl} alt={imageAlt}
//                 className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                 loading="lazy" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }} // Dark theme placeholder
//             />
//         </div>
//         <div className="p-3 flex flex-col flex-grow">
//           <h2 className="text-sm font-semibold mb-1 text-brand-foreground line-clamp-2 flex-grow min-h-[2.5rem]" title={product.name}>
//             {product.name || 'Product Name'}
//           </h2>
//           {shortDescText && ( <p className="text-xs text-gray-400 my-1 line-clamp-2 min-h-[2rem]"> {shortDescText} </p> )} {/* Muted description */}
//           {product.average_rating != null && ( <StarRating rating={product.average_rating} /> )}
//           {product.price_html ? (
//              <div
//                 className="text-sm font-medium text-brand-primary-light my-2" /* Price light gold */
//                 dangerouslySetInnerHTML={{ __html: product.price_html }}
//              />
//            ) : ( <p className="text-sm text-gray-500 my-2">Price unavailable</p> )}
//         </div>
//       </Link>
//        <div className="p-3 pt-0 mt-auto">
//            <button
//                 className={`w-full text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover py-2 px-4 rounded text-xs sm:text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed ${
//                     buttonDisabled
//                     ? 'bg-brand-subtle text-gray-500' // Disabled style for dark theme
//                     : 'bg-brand-primary hover:bg-brand-primary-hover text-brand-textOnPrimary' // Gold button, dark text
//                 }`}
//                 disabled={buttonDisabled}
//                 onClick={buttonOnClick}
//                 title={buttonTitle}
//             >
//                 {buttonText}
//             </button>
//              {addItemError && !addItemError.message.includes("Expired token") && !isVariable && isInStock && isAuthenticated && (
//                  <p className="text-red-500 text-xs mt-1 text-center">Error: {addItemError.message}</p> // Error text can remain red
//              )}
//         </div>
//     </div>
//   );
// };

// export default ProductCard;

// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

// This component displays a star rating based on a numeric value.
const StarRating = ({ rating = 0 }) => {
    const totalStars = 5;
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
    return (
        <div className="flex text-brand-primary my-1.5"> {/* Stars use the primary theme color */}
            {[...Array(fullStars)].map((_, i) => ( <FaStar key={`full-${i}`} size={14} /> ))}
            {[...Array(totalStars - fullStars)].map((_, i) => ( <FaRegStar key={`empty-${i}`} size={14} /> ))}
        </div>
    );
};

const ProductCard = ({ product }) => {
  // If no product data is passed, render nothing.
  if (!product) return null;

  // Prepare product data for display
  const imageUrl = product.images?.[0]?.src || '/images/placeholder-dark.png';
  const imageAlt = product.images?.[0]?.alt || product.name || 'Product image';
  const productIdForLink = product.slug || product.id;

  // Helper function to remove HTML tags from descriptions
  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body?.textContent ?? "";
  }
  const shortDescText = stripHtml(product.short_description);

  return (
    // The main card container, using theme colors for border, background, and text
    <div className="border border-brand-subtle rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group flex flex-col h-full bg-brand-card text-brand-foreground">
      {/* The entire top section is a link to the product's detail page */}
      <Link to={`/products/${productIdForLink}`} className="block flex-grow flex flex-col" title={product.name || 'View Product'}>
        <div className="w-full h-48 bg-brand-subtle/30 flex items-center justify-center overflow-hidden p-2 relative">
            <img
                src={imageUrl} alt={imageAlt}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}
            />
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <h2 className="text-sm font-semibold mb-1 text-brand-foreground line-clamp-2 flex-grow min-h-[2.5rem]" title={product.name}>
            {product.name || 'Product Name'}
          </h2>
          {shortDescText && ( <p className="text-xs text-gray-400 my-1 line-clamp-2 min-h-[2rem]"> {shortDescText} </p> )}
          {product.average_rating != null && ( <StarRating rating={product.average_rating} /> )}
          {product.price_html ? (
             <div
                className="text-sm font-medium text-brand-primary-light my-2"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
             />
           ) : ( <p className="text-sm text-gray-500 my-2">Price unavailable</p> )}
        </div>
      </Link>
       
       {/* Button Section */}
       <div className="p-3 pt-0 mt-auto">
           {/* MODIFIED: This is now a simple Link styled as a button, replacing the complex "Add to Cart" logic. */}
           <Link
                to={`/products/${productIdForLink}`}
                className="block w-full text-center text-brand-textOnPrimary bg-brand-primary hover:bg-brand-primary-hover py-2 px-4 rounded text-xs sm:text-sm font-medium transition-colors duration-200"
                title="View product details"
            >
                View Product
            </Link>
        </div>
    </div>
  );
};

export default ProductCard;