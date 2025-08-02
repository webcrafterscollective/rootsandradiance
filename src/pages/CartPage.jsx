// // // src/pages/CartPage.jsx
// // import React from 'react';
// // import { useCart } from '../context/CartContext'; // Import the cart context hook
// // import { Link, useNavigate } from 'react-router-dom'; // For links and navigation
// // import { useMutation } from '@apollo/client';

// // // --- Import the necessary GraphQL queries and mutations ---
// // import {
// //     GET_CART_QUERY, // Query needed for refetching
// //     REMOVE_ITEMS_FROM_CART_MUTATION,
// //     UPDATE_CART_ITEM_QUANTITIES_MUTATION
// // } from '../graphql/cart.gql'; // Adjust path if needed

// // const CartPage = () => {
// //   // Get cart state and loading/error status from context
// //   const { cart, loading, error } = useCart();
// //   const navigate = useNavigate(); // Hook for navigation

// //   // --- Setup Mutations ---

// //   // Mutation for removing items
// //   const [removeItem, { loading: removingItem, error: removeItemError }] = useMutation(
// //     REMOVE_ITEMS_FROM_CART_MUTATION, {
// //         // Refetch the cart query after mutation completes
// //         refetchQueries: [{ query: GET_CART_QUERY }],
// //         awaitRefetchQueries: true, // Wait for refetch before resolving mutation promise
// //         onError: (err) => console.error("Error removing item:", err), // Log errors
// //     }
// //   );

// //   // Mutation for updating item quantities
// //   const [updateQuantity, { loading: updatingQuantity, error: updateQuantityError }] = useMutation(
// //     UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
// //         refetchQueries: [{ query: GET_CART_QUERY }],
// //         awaitRefetchQueries: true,
// //         onError: (err) => console.error("Error updating quantity:", err),
// //     }
// //   );

// //   // --- Event Handlers ---

// //   /**
// //    * Handles removing an item from the cart.
// //    * @param {string} key - The unique key of the cart item to remove.
// //    */
// //   const handleRemoveItem = (key) => {
// //     // Prevent action if key is missing or already removing
// //     if (!key || removingItem) return;
// //     // Call the mutation
// //     removeItem({ variables: { keys: [key] } })
// //        .catch(err => alert(`Failed to remove item: ${err.message}`)); // Provide user feedback on failure
// //   };

// //   /**
// //    * Handles updating the quantity of an item in the cart.
// //    * @param {string} key - The unique key of the cart item to update.
// //    * @param {string} newQuantity - The new quantity (as a string from input).
// //    */
// //   const handleUpdateQuantity = (key, newQuantity) => {
// //      // Parse quantity and get current item details
// //      const quantityNum = parseInt(newQuantity, 10);
// //      const currentItem = cart?.contents?.nodes?.find(item => item.key === key);

// //      // Prevent update if: key missing, quantity invalid, already updating, or quantity hasn't changed
// //      if (!key || isNaN(quantityNum) || quantityNum < 0 || updatingQuantity || (currentItem && currentItem.quantity === quantityNum)) {
// //          return;
// //      }
// //      // If quantity is set to 0, treat it as a removal action
// //      if (quantityNum === 0) {
// //          handleRemoveItem(key);
// //          return;
// //      }
// //      // Proceed with update quantity mutation
// //      updateQuantity({ variables: { items: [{ key: key, quantity: quantityNum }] } })
// //          .catch(err => alert(`Failed to update quantity: ${err.message}`)); // Provide user feedback
// //   };

// //   /**
// //    * Handles proceeding to the checkout page (placeholder).
// //    */
// //   const handleProceedToCheckout = () => {
// //       // Placeholder alert - replace with actual navigation
// //       alert("Proceed to Checkout clicked - Next step: Implement Checkout Page/Logic.");
// //       // navigate('/checkout'); // Uncomment this line when '/checkout' route and page exist
// //   };


// //   // --- Render Logic ---

// //   // Display loading state
// //   if (loading) {
// //     return <div className="container mx-auto px-4 py-10 text-center">Loading cart...</div>;
// //   }

// //   // Display error state if cart fetching failed
// //   if (error) {
// //     console.error("Cart Page Loading Error:", error);
// //     return <div className="container mx-auto px-4 py-10 text-center text-red-600">Error loading cart details. Please try logging in again or contact support if the issue persists.</div>;
// //   }

// //   // Display empty cart message
// //   if (!cart || cart.isEmpty || !cart.contents?.nodes?.length) {
// //     return (
// //       <div className="container mx-auto px-4 py-10 text-center">
// //         <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
// //         <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
// //         <Link to="/shop" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
// //           Continue Shopping
// //         </Link>
// //       </div>
// //     );
// //   }

// //   // --- Render Cart Table and Summary ---
// //   return (
// //     // Added standard padding and margin
// //     <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 font-sans">
// //       <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

// //       {/* Display mutation errors */}
// //       {removeItemError && <p className='text-red-500 mb-4 text-center'>Error removing item: {removeItemError.message}</p>}
// //       {updateQuantityError && <p className='text-red-500 mb-4 text-center'>Error updating quantity: {updateQuantityError.message}</p>}

// //       {/* Cart Items Table Wrapper */}
// //       {/* Removed extra whitespace that could cause hydration issues */}
// //       <div className="border rounded-lg shadow-sm overflow-x-auto mb-8"><table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50"><tr>
// //               <th scope="col" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />{/* Empty header for image col */}
// //               <th scope="col" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
// //               <th scope="col" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Price</th>
// //               <th scope="col" className="py-3 px-2 sm:px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
// //               <th scope="col" className="py-3 px-2 sm:px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Total</th>
// //               <th scope="col" className="relative py-3 px-2 sm:px-6"><span className="sr-only">Remove</span></th>{/* Header for remove button */}
// //           </tr></thead>
// //           <tbody className="bg-white divide-y divide-gray-200">{
// //             // --- Main Cart Item Loop ---
// //             cart.contents.nodes.map((item, index) => { // Add index for placeholder key
// //                 // Check if item or item.key is missing or invalid
// //                 if (!item || typeof item.key !== 'string' || item.key === '') {
// //                     console.warn( // Log improved warning
// //                         `Cart item (index: ${index}) is missing a valid 'key' property. ` +
// //                         `Backend might have returned incomplete data. Rendering placeholder. Item data:`,
// //                         JSON.stringify(item) // Log actual data
// //                     );
// //                     // --- Render a placeholder row ---
// //                     return (
// //                         // Use index for a fallback key ONLY for the placeholder
// //                         <tr key={`invalid-item-${index}`} className="bg-red-50 opacity-75">
// //                             <td colSpan="6" className="py-4 px-2 sm:px-6 text-center text-sm text-red-700 italic">
// //                                 There was an issue loading this cart item. It might be invalid.
// //                             </td>
// //                         </tr>
// //                     );
// //                 }

// //                 // --- Render normal item row ---
// //                 // Safely extract details
// //                 const productNode = item.product?.node;
// //                 const variationNode = item.variation?.node;
// //                 const imageNode = variationNode?.image || productNode?.image;
// //                 const productName = variationNode?.name || productNode?.name || 'Product';
// //                 const productLink = `/products/${productNode?.slug || productNode?.databaseId}`;
// //                 let itemPriceFormatted = 'N/A';
// //                 const rawPrice = variationNode?.price || productNode?.price; // Check variation first
// //                 if (rawPrice) {
// //                     const priceValue = typeof rawPrice === 'string' ? parseFloat(rawPrice.replace(/[^0-9.]/g, '')) : rawPrice;
// //                     if (!isNaN(priceValue)) {
// //                        itemPriceFormatted = `$${priceValue.toFixed(2)}`; // Adjust currency symbol/format as needed
// //                     }
// //                 }

// //                 return (
// //                   // Use the reliable item.key for React's reconciliation
// //                   <tr key={item.key} className="align-middle">
// //                     {/* Image Column */}
// //                     <td className="py-4 px-2 sm:px-6 whitespace-nowrap">
// //                         <Link to={productLink}>
// //                            <img
// //                              className="h-16 w-16 object-contain rounded border flex-shrink-0 hover:opacity-80 transition-opacity"
// //                              src={imageNode?.sourceUrl || '/images/placeholder.png'} // Use optional chaining
// //                              alt={productName}
// //                            />
// //                        </Link>
// //                     </td>
// //                     {/* Product Details Column */}
// //                     <td className="py-4 px-2 sm:px-6"> {/* Allow wrapping */}
// //                       <div className="text-sm font-medium text-gray-900 hover:text-blue-600 mb-1">
// //                            <Link to={productLink}>
// //                                 {productName}
// //                             </Link>
// //                         </div>
// //                         {/* Variation Attributes Loop */}
// //                         {variationNode?.attributes?.nodes?.map(attr => {
// //                             // Add checks and key for nested loop
// //                             if (!attr) return null;
// //                             const attrKey = attr.id || attr.name;
// //                             if (!attrKey) return null;
// //                             return (
// //                                 <div key={attrKey} className="text-xs text-gray-500">
// //                                     {attr.label || attr.name}: {attr.value}
// //                                 </div>
// //                             );
// //                         })}
// //                         {/* Mobile Price/Total */}
// //                         <div className="text-sm text-gray-700 md:hidden mt-1">{itemPriceFormatted}</div>
// //                         <div className="text-sm text-gray-900 md:hidden mt-1">Subtotal: {item.total}</div> {/* Item subtotal */}
// //                          {/* SKU */}
// //                          {productNode?.sku && <div className="text-xs text-gray-500 mt-1">SKU: {productNode.sku}</div>}
// //                     </td>
// //                     {/* Price Column (Desktop) */}
// //                     <td className="py-4 px-2 sm:px-6 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
// //                       {itemPriceFormatted}
// //                     </td>
// //                     {/* Quantity Column */}
// //                     <td className="py-4 px-2 sm:px-6 whitespace-nowrap text-center">
// //                        <input
// //                          type="number"
// //                          min="0" // Allow 0 for removal via handler
// //                          step="1"
// //                          value={item.quantity} // Controlled input
// //                          className="w-16 border border-gray-300 rounded p-1 text-sm text-center focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
// //                          onChange={(e) => handleUpdateQuantity(item.key, e.target.value)}
// //                          disabled={updatingQuantity} // Disable input during update
// //                          aria-label={`Quantity for ${productName}`}
// //                        />
// //                     </td>
// //                     {/* Total Column (Desktop) - Item Subtotal */}
// //                     <td className="py-4 px-2 sm:px-6 whitespace-nowrap text-sm text-gray-900 text-right hidden md:table-cell">{item.total}</td>
// //                     {/* Remove Button Column */}
// //                      <td className="py-4 px-2 sm:px-6 whitespace-nowrap text-center">
// //                        <button
// //                          onClick={() => handleRemoveItem(item.key)}
// //                          disabled={removingItem} // Disable button during removal
// //                          className="text-red-500 hover:text-red-700 text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed p-1" // Style remove button
// //                          title={`Remove ${productName}`}
// //                          aria-label={`Remove ${productName}`}
// //                        >
// //                          &times; {/* Multiplication sign for 'X' */}
// //                        </button>
// //                      </td>
// //                   </tr>
// //                 );
// //             })}
// //           </tbody>
// //         </table></div>

// //       {/* Cart Totals & Actions Section */}
// //       <div className="md:flex md:justify-end items-start gap-8">
// //             {/* Cart Summary Box */}
// //             <div className="w-full md:max-w-sm space-y-3 p-4 border rounded-lg shadow-sm bg-gray-50">
// //                <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
// //                {/* Subtotal */}
// //                <div className="flex justify-between text-sm text-gray-700">
// //                    <span>Subtotal</span>
// //                    <span>{cart.subtotal}</span>
// //                </div>
// //                {/* Shipping */}
// //                {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
// //                    <div className="flex justify-between text-sm text-gray-700">
// //                       <span>Shipping</span>
// //                       <span>{cart.shippingTotal}</span>
// //                   </div>
// //                )}
// //                {/* Applied Coupons Loop */}
// //                 {cart.appliedCoupons?.length > 0 && (
// //                     <div className="border-t pt-3 mt-3 space-y-1">
// //                        {cart.appliedCoupons.map(coupon => {
// //                            // Add checks and key for nested loop
// //                            if (!coupon || !coupon.code) return null;
// //                            return (
// //                                // Use coupon.code as the key
// //                                <div key={coupon.code} className="flex justify-between text-sm text-green-600">
// //                                    <span>Discount ({coupon.code})</span>
// //                                    <span>-{coupon.discountAmount || 'N/A'}</span>
// //                               </div>
// //                            );
// //                         })}
// //                    </div>
// //                 )}
// //                {/* TODO: Add Tax display if needed */}

// //                {/* Grand Total */}
// //                <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-3 mt-3">
// //                    <span>Total</span>
// //                    <span>{cart.total}</span>
// //                </div>
// //                {/* Checkout Button */}
// //                 <div className="mt-6">
// //                     <button
// //                        onClick={handleProceedToCheckout}
// //                        // Disable button if cart is logically empty
// //                        disabled={cart.isEmpty || cart.contents?.itemCount === 0}
// //                        className="w-full bg-green-600 text-white py-2.5 px-4 rounded font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                         Proceed to Checkout
// //                     </button>
// //                 </div>
// //             </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPage;
// // src/pages/CartPage.jsx
// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { Link, useNavigate } from 'react-router-dom';

// const CartPage = () => {
//   const {
//     cart,
//     loading,
//     error,
//     removeItem,
//     removingItem,
//     updateItemQuantities,
//     updatingItemQuantities,
//     removeItemError,
//     updateItemQuantitiesError
//   } = useCart();

//   const navigate = useNavigate();

//   /**
//    * CORRECTED: Handles removing an item from the cart.
//    * It now correctly passes the key to the `removeItem` function.
//    */
//   const handleRemoveItem = (key) => {
//     if (!key || removingItem) return;
//     removeItem(key) // Pass the key directly
//       .catch(err => {
//         console.error("Failed to remove item:", err);
//         alert(`Failed to remove item: ${err.message}`);
//       });
//   };

//   const handleUpdateQuantity = (key, newQuantityStr) => {
//     const quantity = parseInt(newQuantityStr, 10);
//     const currentItem = cart?.contents?.nodes?.find(item => item.key === key);

//     if (!key || isNaN(quantity) || quantity < 0 || updatingItemQuantities || currentItem?.quantity === quantity) {
//       return;
//     }

//     if (quantity === 0) {
//       handleRemoveItem(key);
//       return;
//     }

//     updateItemQuantities([{ key, quantity }])
//       .catch(err => {
//         console.error("Failed to update quantity:", err);
//         alert(`Failed to update quantity: ${err.message}`);
//       });
//   };

//   const handleProceedToCheckout = () => {
//       alert("Proceed to Checkout clicked - Next step: Implement Checkout Page/Logic.");
//       // When ready, you can uncomment the next line to navigate.
//       // navigate('/checkout'); 
//   };

//   if (loading && !cart) {
//     return <div className="container mx-auto px-4 py-10 text-center">Loading cart...</div>;
//   }

//   if (error) {
//     return <div className="container mx-auto px-4 py-10 text-center text-red-600">Error loading cart details.</div>;
//   }

//   if (!cart || cart.isEmpty) {
//     return (
//       <div className="container mx-auto px-4 py-10 text-center">
//         <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
//         <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
//         <Link to="/shop" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
//       <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

//       {removeItemError && <p className='text-red-500 mb-4 text-center'>Error removing item: {removeItemError.message}</p>}
//       {updateItemQuantitiesError && <p className='text-red-500 mb-4 text-center'>Error updating quantity: {updateItemQuantitiesError.message}</p>}

//       <div className="border rounded-lg shadow-sm overflow-x-auto mb-8">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" colSpan="2" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
//               <th scope="col" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Price</th>
//               <th scope="col" className="py-3 px-2 sm:px-6 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
//               <th scope="col" className="py-3 px-2 sm:px-6 text-right text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Total</th>
//               <th scope="col" className="relative py-3 px-2 sm:px-6"><span className="sr-only">Remove</span></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {cart.contents.nodes.map((item, index) => {
//               if (!item || typeof item.key !== 'string' || item.key === '') {
//                 return (
//                   <tr key={`invalid-item-${index}`} className="bg-red-50">
//                     <td colSpan="6" className="py-4 px-2 text-center text-sm text-red-700 italic">
//                       There was an issue loading this cart item. It might be invalid.
//                     </td>
//                   </tr>
//                 );
//               }

//               const productNode = item.product?.node;
//               const variationNode = item.variation?.node;
//               const imageNode = variationNode?.image || productNode?.image;
//               const productName = variationNode?.name || productNode?.name || 'Product';
//               const productLink = `/products/${productNode?.slug || productNode?.databaseId}`;
//               const itemPrice = item.total && item.quantity ? `$${(parseFloat(item.total.replace(/[^0-9.]/g, '')) / item.quantity).toFixed(2)}` : 'N/A';

//               return (
//                 <tr key={item.key}>
//                   <td className="py-4 pl-4 pr-2 w-16"><Link to={productLink}><img className="h-16 w-16 object-contain rounded border" src={imageNode?.sourceUrl || '/images/placeholder.png'} alt={productName}/></Link></td>
//                   <td className="py-4 px-2 sm:px-6"><Link to={productLink} className="text-sm font-medium text-gray-900 hover:text-blue-600">{productName}</Link></td>
//                   <td className="py-4 px-2 sm:px-6 text-sm hidden md:table-cell">{itemPrice}</td>
//                   <td className="py-4 px-2 sm:px-6 text-center"><input type="number" min="0" value={item.quantity} className="w-16 border rounded p-1 text-sm text-center" onChange={(e) => handleUpdateQuantity(item.key, e.target.value)} disabled={updatingItemQuantities} /></td>
//                   <td className="py-4 px-2 sm:px-6 text-sm text-right hidden md:table-cell">{item.total}</td>
//                   <td className="py-4 px-2 sm:px-6 text-center"><button onClick={() => handleRemoveItem(item.key)} disabled={removingItem} className="text-red-500 hover:text-red-700 text-xl">&times;</button></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Summary Box */}
//       <div className="md:flex md:justify-end items-start gap-8">
//         <div className="w-full md:max-w-sm space-y-3 p-4 border rounded-lg shadow-sm bg-gray-50">
//            <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
//            <div className="flex justify-between text-sm text-gray-700">
//                <span>Subtotal</span>
//                <span>{cart.subtotal}</span>
//            </div>

//            {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
//                <div className="flex justify-between text-sm text-gray-700">
//                   <span>Shipping</span>
//                   <span>{cart.shippingTotal}</span>
//               </div>
//            )}
           
//            {cart.appliedCoupons?.length > 0 && (
//                 <div className="border-t pt-3 mt-3 space-y-1">
//                    {cart.appliedCoupons.map(coupon => {
//                        if (!coupon || !coupon.code) return null;
//                        return (
//                            <div key={coupon.code} className="flex justify-between text-sm text-green-600">
//                                <span>Discount ({coupon.code})</span>
//                                <span>-{coupon.discountAmount || 'N/A'}</span>
//                           </div>
//                        );
//                     })}
//                </div>
//             )}
           
//            <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-3 mt-3">
//                <span>Total</span>
//                <span>{cart.total}</span>
//            </div>
           
//             <div className="mt-6">
//                 <button
//                    onClick={handleProceedToCheckout}
//                    disabled={cart.isEmpty || cart.contents?.itemCount === 0}
//                    className="w-full bg-green-600 text-white py-2.5 px-4 rounded font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     Proceed to Checkout
//                 </button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cart,
    loading,
    error,
    removeItem,
    removingItem,
    updateItemQuantities,
    updatingItemQuantities,
    // Coupon hooks
    applyCoupon,
    applyingCoupon,
    removeCoupon,
    removingCoupon,
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleRemoveItem = (key) => {
    if (!key || removingItem) return;
    removeItem(key).catch(err => {
        console.error("Failed to remove item:", err);
        alert(`Failed to remove item: ${err.message}`);
    });
  };

  const handleUpdateQuantity = (key, newQuantityStr) => {
    const quantity = parseInt(newQuantityStr, 10);
    const currentItem = cart?.contents?.nodes?.find(item => item.key === key);

    if (!key || isNaN(quantity) || quantity < 0 || updatingItemQuantities || currentItem?.quantity === quantity) {
      return;
    }

    if (quantity === 0) {
      handleRemoveItem(key);
      return;
    }

    updateItemQuantities([{ key, quantity }]).then(() => {
      // ✅ Reload the page after successful update
      window.location.reload();
    }).catch(err => {
        console.error("Failed to update quantity:", err);
        alert(`Failed to update quantity: ${err.message}`);
    });
  };

  const handleApplyCoupon = async (e) => {
      e.preventDefault();
      setCouponError('');
      if (!couponCode.trim()) {
          setCouponError('Please enter a coupon code.');
          return;
      }
      try {
          await applyCoupon(couponCode.trim());
          setCouponCode(''); // Clear input on success
      } catch (err) {
          // Set local error state from the error thrown by the context
          setCouponError(err.message || 'The coupon code is invalid.');
      }
  };
  
  const handleRemoveCoupon = (code) => {
      if (removingCoupon) return;
      removeCoupon(code).catch(err => {
          console.error("Failed to remove coupon:", err);
          alert(`Failed to remove coupon: ${err.message}`);
      });
  };

  const handleProceedToCheckout = () => {
      // Navigate to the checkout page
      navigate('/checkout'); 
  };

  if (loading && !cart) {
    return <div className="container mx-auto px-4 py-10 text-center">Loading cart...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-10 text-center text-red-600">Error loading cart details.</div>;
  }

  if (!cart || cart.isEmpty) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
        <Link to="/shop" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      <div className="border rounded-lg shadow-sm overflow-x-auto mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" colSpan="2" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th scope="col" className="py-3 px-2 sm:px-6 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Price</th>
              <th scope="col" className="py-3 px-2 sm:px-6 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th scope="col" className="py-3 px-2 sm:px-6 text-right text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Total</th>
              <th scope="col" className="relative py-3 px-2 sm:px-6"><span className="sr-only">Remove</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cart.contents.nodes.map((item, index) => {
              if (!item || typeof item.key !== 'string' || item.key === '') {
                 console.error(`Invalid cart item at index ${index}. The item is missing a 'key' property. Item data:`, item);
                 return null;
              }

              const productNode = item.product?.node;
              const variationNode = item.variation?.node;
              const imageNode = variationNode?.image || productNode?.image;
              const productName = variationNode?.name || productNode?.name || 'Product';
              const productLink = `/products/${productNode?.slug || productNode?.databaseId}`;
              const itemPrice = item.total && item.quantity ? `₹${(parseFloat(item.total.replace(/[^0-9.]/g, '')) / item.quantity).toFixed(2)}` : 'N/A';

              return (
                <tr key={item.key}>
                  <td className="py-4 pl-4 pr-2 w-16"><Link to={productLink}><img className="h-16 w-16 object-contain rounded border" src={imageNode?.sourceUrl || '/images/placeholder.png'} alt={productName}/></Link></td>
                  <td className="py-4 px-2 sm:px-6"><Link to={productLink} className="text-sm text-black font-bold hover:text-yellow-600" style={{ color: '#fae315ff' }}>{productName}</Link></td>
                  <td className="py-4 px-2 sm:px-6 text-sm hidden md:table-cell text-black font-bold">{itemPrice}</td>
                  {/* <td className="py-4 px-2 sm:px-6 text-center"><input type="number" min="0" value={item.quantity} className="w-16 border rounded p-1 text-sm text-center" onChange={(e) => handleUpdateQuantity(item.key, e.target.value)} disabled={updatingItemQuantities || removingItem} /></td> */}
                  <td className="py-4 px-2 sm:px-6 text-center"><input type="number" min="0" value={item.quantity} className="w-16 border rounded p-1 text-sm text-center" onChange={(e) => handleUpdateQuantity(item.key, e.target.value)} disabled={updatingItemQuantities || removingItem}/></td>
                  <td className="py-4 px-2 sm:px-6 text-sm text-right hidden md:table-cell text-black font-bold">{item.total}</td>
                  <td className="py-4 px-2 sm:px-6 text-center"><button onClick={() => handleRemoveItem(item.key)} disabled={removingItem || updatingItemQuantities} className="text-red-500 hover:text-red-700 text-xl disabled:opacity-50">&times;</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="md:flex md:justify-between items-start gap-8">
        {/* Coupon Section */}
        <div className="w-full md:max-w-md mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Have a Coupon?</h2>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input 
                    type="text" 
                    value={couponCode} 
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                    placeholder="Enter coupon code"
                    className="flex-grow border rounded p-2 text-sm shadow-sm"
                    disabled={applyingCoupon}
                />
                <button type="submit" className="bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium hover:bg-black disabled:opacity-60" disabled={applyingCoupon}>
                    {applyingCoupon ? 'Applying...' : 'Apply'}
                </button>
            </form>
            {couponError && <p className='text-red-500 mt-2 text-sm'>{couponError}</p>}
        </div>

        {/* Summary Box */}
        <div className="w-full md:max-w-sm space-y-3 p-4 border rounded-lg shadow-sm bg-gray-50">
           <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
           <div className="flex justify-between text-sm text-gray-700">
               <span>Subtotal</span>
               <span>{cart.subtotal}</span>
           </div>

           {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
               <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span>{cart.shippingTotal}</span>
              </div>
           )}
           
           {cart.appliedCoupons?.length > 0 && (
                <div className="border-t pt-3 mt-3 space-y-2">
                   {cart.appliedCoupons.map(coupon => {
                       if (!coupon || !coupon.code) return null;
                       return (
                           <div key={coupon.code} className="flex justify-between items-center text-sm text-green-600">
                               <span>Discount ({coupon.code})</span>
                               <div className="flex items-center gap-2">
                                   <span>-{coupon.discountAmount || 'N/A'}</span>
                                   <button onClick={() => handleRemoveCoupon(coupon.code)} disabled={removingCoupon} className="text-red-400 hover:text-red-600 text-lg font-bold disabled:opacity-50" title="Remove coupon">&times;</button>
                               </div>
                          </div>
                       );
                    })}
               </div>
            )}
           
           <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-3 mt-3">
               <span>Total</span>
               <span>{cart.total}</span>
           </div>
           
            <div className="mt-6">
                <button
                   onClick={handleProceedToCheckout}
                   disabled={cart.isEmpty || cart.contents?.itemCount === 0}
                   className="w-full bg-green-600 text-white py-2.5 px-4 rounded font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;