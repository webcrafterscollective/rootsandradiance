// // // src/pages/CartPage.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useCart } from '../context/CartContext';
// // import { Link, useNavigate } from 'react-router-dom';

// // const CartPage = () => {
// //   const {
// //     cart,
// //     loading,
// //     cartLoading,
// //     error,
// //     removeItem,
// //     removingItem,
// //     updateItemQuantities,
// //     updatingItemQuantities,
// //     applyCoupon,
// //     applyingCoupon,
// //     removeCoupon,
// //     removingCoupon,
// //     removeItemError,
// //     updateItemQuantitiesError,
// //     refetchCart
// //   } = useCart();

// //   const navigate = useNavigate();
// //   const [couponCode, setCouponCode] = useState('');
// //   const [couponError, setCouponError] = useState('');

// //   // Ensure cart is fresh when navigating to this page
// //   useEffect(() => {
// //     if (refetchCart) {
// //       refetchCart();
// //     }
// //   }, [refetchCart]);

// //   const handleRemoveItem = (key) => {
// //     if (!key || removingItem) return;
// //     removeItem(key).catch(err => console.error(err));
// //   };

// //   const handleUpdateQuantity = (key, newQuantityStr) => {
// //     const quantity = parseInt(newQuantityStr, 10);
// //     if (!key || isNaN(quantity) || quantity < 0) return;
    
// //     if (quantity === 0) {
// //       handleRemoveItem(key);
// //       return;
// //     }
// //     updateItemQuantities([{ key, quantity }]).catch(err => console.error(err));
// //   };

// //   const handleApplyCoupon = async (e) => {
// //       e.preventDefault();
// //       setCouponError('');
// //       if (!couponCode.trim()) {
// //           setCouponError('Please enter a coupon code.');
// //           return;
// //       }
// //       try {
// //           await applyCoupon(couponCode.trim());
// //           setCouponCode('');
// //       } catch (err) {
// //           setCouponError(err.message || 'Invalid coupon.');
// //       }
// //   };
  
// //   const handleRemoveCoupon = (code) => {
// //       if (removingCoupon) return;
// //       removeCoupon(code).catch(err => console.error(err));
// //   };

// //   const handleProceedToCheckout = () => {
// //       navigate('/checkout'); 
// //   };

// //   // BLOCKING LOAD: Only if we have NO DATA
// //   if (loading && !cart) {
// //     return <div className="container mx-auto px-4 py-10 text-center text-brand-foreground">Loading your cart...</div>;
// //   }

// //   // ERROR STATE
// //   if (error) {
// //     return <div className="container mx-auto px-4 py-10 text-center text-red-600">Unable to load cart. Please refresh.</div>;
// //   }

// //   // EMPTY STATE
// //   if (!cart || cart.isEmpty || !cart.contents?.nodes?.length) {
// //     return (
// //       <div className="container mx-auto px-4 py-10 text-center">
// //         <h1 className="text-2xl font-semibold mb-4 text-brand-heading">Your Cart</h1>
// //         <p className="text-brand-foreground mb-6">Your cart is currently empty.</p>
// //         <Link to="/shop" className="inline-block bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded hover:bg-opacity-90">
// //           Continue Shopping
// //         </Link>
// //       </div>
// //     );
// //   }

// //   // Visual feedback during updates
// //   const isUpdating = updatingItemQuantities || removingItem || cartLoading;
// //   const opacityClass = isUpdating ? 'opacity-60 pointer-events-none' : 'opacity-100';

// //   return (
// //     <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
// //       <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Your Cart</h1>

// //       {removeItemError && <p className='text-red-500 mb-4 text-center'>{removeItemError.message}</p>}
// //       {updateItemQuantitiesError && <p className='text-red-500 mb-4 text-center'>{updateItemQuantitiesError.message}</p>}

// //       {/* Main Content with transition */}
// //       <div className={`transition-opacity duration-200 ${opacityClass}`}>
          
// //           <div className="border rounded-lg shadow-sm overflow-x-auto mb-8 bg-brand-card">
// //             <table className="min-w-full divide-y divide-brand-subtle">
// //               <thead className="bg-brand-subtle/20">
// //                 <tr>
// //                   <th scope="col" colSpan="2" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase">Product</th>
// //                   <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Price</th>
// //                   <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-brand-foreground uppercase">Quantity</th>
// //                   <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Total</th>
// //                   <th scope="col" className="relative py-3 px-4"><span className="sr-only">Remove</span></th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-brand-subtle">
// //                 {cart.contents.nodes.map((item) => {
// //                   if (!item || !item.key) return null;

// //                   const product = item.product?.node;
// //                   const variation = item.variation?.node;
// //                   const image = variation?.image || product?.image;
// //                   const name = variation?.name || product?.name || 'Product';
// //                   const link = `/products/${product?.slug || product?.databaseId}`;
                  
// //                   const rawTotal = parseFloat(item.total?.replace(/[^0-9.]/g, '') || 0);
// //                   const singlePrice = (item.quantity > 0) ? (rawTotal / item.quantity).toFixed(2) : '0.00';
// //                   const displaySinglePrice = item.total?.includes('₹') ? `₹${singlePrice}` : `$${singlePrice}`;

// //                   return (
// //                     <tr key={item.key}>
// //                       <td className="py-4 pl-4 pr-2 w-16">
// //                         <Link to={link}>
// //                             <img className="h-16 w-16 object-contain rounded border border-brand-subtle" src={image?.sourceUrl || '/images/placeholder.png'} alt={name}/>
// //                         </Link>
// //                       </td>
// //                       <td className="py-4 px-4">
// //                         <Link to={link} className="text-sm font-medium text-brand-heading hover:text-brand-primary">{name}</Link>
// //                         {variation && variation.attributes && (
// //                             <div className="text-xs text-brand-foreground/70 mt-1">
// //                                 {variation.attributes.nodes.map(attr => (
// //                                     <span key={attr.id} className="mr-2">{attr.label}: {attr.value}</span>
// //                                 ))}
// //                             </div>
// //                         )}
// //                       </td>
// //                       <td className="py-4 px-4 text-sm hidden md:table-cell text-brand-foreground">{displaySinglePrice}</td>
// //                       <td className="py-4 px-4 text-center">
// //                         <input 
// //                             type="number" 
// //                             min="0" 
// //                             value={item.quantity} 
// //                             className="w-16 border border-brand-subtle rounded p-1 text-sm text-center bg-brand-background text-brand-foreground"
// //                             onChange={(e) => handleUpdateQuantity(item.key, e.target.value)} 
// //                             disabled={isUpdating} 
// //                         />
// //                       </td>
// //                       <td className="py-4 px-4 text-sm text-right hidden md:table-cell text-brand-foreground">{item.total}</td>
// //                       <td className="py-4 px-4 text-center">
// //                         <button 
// //                             onClick={() => handleRemoveItem(item.key)} 
// //                             disabled={isUpdating} 
// //                             className="text-red-500 hover:text-red-700 text-xl disabled:opacity-50"
// //                         >
// //                             &times;
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
          
// //           <div className="md:flex md:justify-between items-start gap-8">
// //             <div className="w-full md:max-w-md mb-6 md:mb-0">
// //                 <h2 className="text-lg font-semibold mb-2 text-brand-heading">Have a Coupon?</h2>
// //                 <form onSubmit={handleApplyCoupon} className="flex gap-2">
// //                     <input 
// //                         type="text" 
// //                         value={couponCode} 
// //                         onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
// //                         placeholder="Enter coupon code"
// //                         className="flex-grow border border-brand-subtle rounded p-2 text-sm shadow-sm bg-brand-background text-brand-foreground"
// //                         disabled={applyingCoupon}
// //                     />
// //                     <button type="submit" className="bg-brand-heading text-brand-textOnPrimary px-5 py-2 rounded text-sm font-medium hover:opacity-90 disabled:opacity-60" disabled={applyingCoupon}>
// //                         {applyingCoupon ? '...' : 'Apply'}
// //                     </button>
// //                 </form>
// //                 {couponError && <p className='text-red-500 mt-2 text-sm'>{couponError}</p>}
// //             </div>

// //             <div className="w-full md:max-w-sm space-y-3 p-4 border border-brand-subtle rounded-lg shadow-sm bg-brand-card">
// //                <h2 className="text-lg font-semibold mb-4 text-brand-heading">Cart Summary</h2>
// //                <div className="flex justify-between text-sm text-brand-foreground">
// //                    <span>Subtotal</span>
// //                    <span>{cart.subtotal}</span>
// //                </div>

// //                {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
// //                    <div className="flex justify-between text-sm text-brand-foreground">
// //                       <span>Shipping</span>
// //                       <span>{cart.shippingTotal}</span>
// //                   </div>
// //                )}
               
// //                {cart.appliedCoupons?.length > 0 && (
// //                     <div className="border-t border-brand-subtle pt-3 mt-3 space-y-2">
// //                        {cart.appliedCoupons.map(coupon => (
// //                            <div key={coupon.code} className="flex justify-between items-center text-sm text-green-600">
// //                                <span>Discount ({coupon.code})</span>
// //                                <div className="flex items-center gap-2">
// //                                    <span>-{coupon.discountAmount || 'N/A'}</span>
// //                                    <button onClick={() => handleRemoveCoupon(coupon.code)} disabled={removingCoupon} className="text-red-400 hover:text-red-600 text-lg font-bold disabled:opacity-50">&times;</button>
// //                                </div>
// //                           </div>
// //                        ))}
// //                    </div>
// //                 )}
               
// //                <div className="flex justify-between text-base font-semibold text-brand-heading border-t border-brand-subtle pt-3 mt-3">
// //                    <span>Total</span>
// //                    <span>{cart.total}</span>
// //                </div>
               
// //                 <div className="mt-6">
// //                     <button
// //                        onClick={handleProceedToCheckout}
// //                        disabled={cart.isEmpty || cart.contents?.itemCount === 0}
// //                        className="w-full bg-brand-primary text-brand-textOnPrimary py-2.5 px-4 rounded font-medium hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                         Proceed to Checkout
// //                     </button>
// //                 </div>
// //             </div>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPage;

// // src/pages/CartPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useCart } from '../context/CartContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaMinus, FaPlus } from 'react-icons/fa'; // Import icons

// const CartPage = () => {
//   const {
//     cart,
//     loading,
//     cartLoading,
//     error,
//     removeItem,
//     removingItem,
//     updateItemQuantities,
//     updatingItemQuantities,
//     applyCoupon,
//     applyingCoupon,
//     removeCoupon,
//     removingCoupon,
//     removeItemError,
//     updateItemQuantitiesError,
//     refetchCart
//   } = useCart();

//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState('');
//   const [couponError, setCouponError] = useState('');

//   // Ensure cart is fresh when navigating to this page
//   useEffect(() => {
//     if (refetchCart) {
//       refetchCart();
//     }
//   }, [refetchCart]);

//   const handleRemoveItem = (key) => {
//     if (!key || removingItem) return;
//     removeItem(key).catch(err => console.error(err));
//   };

//   const handleUpdateQuantity = (key, newQuantityStr) => {
//     const quantity = parseInt(newQuantityStr, 10);
//     if (!key || isNaN(quantity) || quantity < 0) return;
    
//     if (quantity === 0) {
//       handleRemoveItem(key);
//       return;
//     }
//     updateItemQuantities([{ key, quantity }]).catch(err => console.error(err));
//   };

//   const handleApplyCoupon = async (e) => {
//       e.preventDefault();
//       setCouponError('');
//       if (!couponCode.trim()) {
//           setCouponError('Please enter a coupon code.');
//           return;
//       }
//       try {
//           await applyCoupon(couponCode.trim());
//           setCouponCode('');
//       } catch (err) {
//           setCouponError(err.message || 'Invalid coupon.');
//       }
//   };
  
//   const handleRemoveCoupon = (code) => {
//       if (removingCoupon) return;
//       removeCoupon(code).catch(err => console.error(err));
//   };

//   const handleProceedToCheckout = () => {
//       navigate('/checkout'); 
//   };

//   // BLOCKING LOAD: Only if we have NO DATA
//   if (loading && !cart) {
//     return <div className="container mx-auto px-4 py-10 text-center text-brand-foreground">Loading your cart...</div>;
//   }

//   // ERROR STATE
//   if (error) {
//     return <div className="container mx-auto px-4 py-10 text-center text-red-600">Unable to load cart. Please refresh.</div>;
//   }

//   // EMPTY STATE
//   if (!cart || cart.isEmpty || !cart.contents?.nodes?.length) {
//     return (
//       <div className="container mx-auto px-4 py-10 text-center">
//         <h1 className="text-2xl font-semibold mb-4 text-brand-heading">Your Cart</h1>
//         <p className="text-brand-foreground mb-6">Your cart is currently empty.</p>
//         <Link to="/shop" className="inline-block bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded hover:bg-opacity-90">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   // Visual feedback during updates
//   const isUpdating = updatingItemQuantities || removingItem || cartLoading;
//   const opacityClass = isUpdating ? 'opacity-60 pointer-events-none' : 'opacity-100';

//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
//       <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Your Cart</h1>

//       {removeItemError && <p className='text-red-500 mb-4 text-center'>{removeItemError.message}</p>}
//       {updateItemQuantitiesError && <p className='text-red-500 mb-4 text-center'>{updateItemQuantitiesError.message}</p>}

//       {/* Main Content with transition */}
//       <div className={`transition-opacity duration-200 ${opacityClass}`}>
          
//           <div className="border rounded-lg shadow-sm overflow-x-auto mb-8 bg-brand-card">
//             <table className="min-w-full divide-y divide-brand-subtle">
//               <thead className="bg-brand-subtle/20">
//                 <tr>
//                   <th scope="col" colSpan="2" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase">Product</th>
//                   <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Price</th>
//                   <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-brand-foreground uppercase">Quantity</th>
//                   <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Total</th>
//                   <th scope="col" className="relative py-3 px-4"><span className="sr-only">Remove</span></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-brand-subtle">
//                 {cart.contents.nodes.map((item) => {
//                   if (!item || !item.key) return null;

//                   const product = item.product?.node;
//                   const variation = item.variation?.node;
//                   const image = variation?.image || product?.image;
//                   const name = variation?.name || product?.name || 'Product';
//                   const link = `/products/${product?.slug || product?.databaseId}`;
                  
//                   const rawTotal = parseFloat(item.total?.replace(/[^0-9.]/g, '') || 0);
//                   const singlePrice = (item.quantity > 0) ? (rawTotal / item.quantity).toFixed(2) : '0.00';
//                   const displaySinglePrice = item.total?.includes('₹') ? `₹${singlePrice}` : `$${singlePrice}`;

//                   return (
//                     <tr key={item.key}>
//                       <td className="py-4 pl-4 pr-2 w-16">
//                         <Link to={link}>
//                             <img className="h-16 w-16 object-contain rounded border border-brand-subtle" src={image?.sourceUrl || '/images/placeholder.png'} alt={name}/>
//                         </Link>
//                       </td>
//                       <td className="py-4 px-4">
//                         <Link to={link} className="text-sm font-medium text-brand-heading hover:text-brand-primary">{name}</Link>
//                         {variation && variation.attributes && (
//                             <div className="text-xs text-brand-foreground/70 mt-1">
//                                 {variation.attributes.nodes.map(attr => (
//                                     <span key={attr.id} className="mr-2">{attr.label}: {attr.value}</span>
//                                 ))}
//                             </div>
//                         )}
//                       </td>
//                       <td className="py-4 px-4 text-sm hidden md:table-cell text-brand-foreground">{displaySinglePrice}</td>
//                       <td className="py-4 px-4 text-center">
//                         {/* QUANTITY RECTIFICATION START */}
//                         <div className="flex items-center justify-center">
//                             <div className="flex items-center border border-brand-subtle rounded bg-brand-background">
//                                 <button
//                                     type="button"
//                                     onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
//                                     className="px-2 py-1 text-brand-foreground hover:bg-brand-subtle/20 transition-colors disabled:opacity-50"
//                                     disabled={isUpdating}
//                                     aria-label="Decrease quantity"
//                                 >
//                                     <FaMinus size={10} />
//                                 </button>
//                                 <span className="w-8 text-center text-sm text-brand-foreground font-medium">
//                                     {item.quantity}
//                                 </span>
//                                 <button
//                                     type="button"
//                                     onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
//                                     className="px-2 py-1 text-brand-foreground hover:bg-brand-subtle/20 transition-colors disabled:opacity-50"
//                                     disabled={isUpdating}
//                                     aria-label="Increase quantity"
//                                 >
//                                     <FaPlus size={10} />
//                                 </button>
//                             </div>
//                         </div>
//                         {/* QUANTITY RECTIFICATION END */}
//                       </td>
//                       <td className="py-4 px-4 text-sm text-right hidden md:table-cell text-brand-foreground">{item.total}</td>
//                       <td className="py-4 px-4 text-center">
//                         <button 
//                             onClick={() => handleRemoveItem(item.key)} 
//                             disabled={isUpdating} 
//                             className="text-red-500 hover:text-red-700 text-xl disabled:opacity-50"
//                         >
//                             &times;
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="md:flex md:justify-between items-start gap-8">
//             <div className="w-full md:max-w-md mb-6 md:mb-0">
//                 <h2 className="text-lg font-semibold mb-2 text-brand-heading">Have a Coupon?</h2>
//                 <form onSubmit={handleApplyCoupon} className="flex gap-2">
//                     <input 
//                         type="text" 
//                         value={couponCode} 
//                         onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
//                         placeholder="Enter coupon code"
//                         className="flex-grow border border-brand-subtle rounded p-2 text-sm shadow-sm bg-brand-background text-brand-foreground"
//                         disabled={applyingCoupon}
//                     />
//                     <button type="submit" className="bg-brand-heading text-brand-textOnPrimary px-5 py-2 rounded text-sm font-medium hover:opacity-90 disabled:opacity-60" disabled={applyingCoupon}>
//                         {applyingCoupon ? '...' : 'Apply'}
//                     </button>
//                 </form>
//                 {couponError && <p className='text-red-500 mt-2 text-sm'>{couponError}</p>}
                
//                 {/* ADDED COUPON TERMS TEXT */}
//                 <div className="mt-3 text-xs text-brand-foreground/70 bg-brand-subtle/10 p-2 rounded border border-brand-subtle/30">
//                     <p><strong>Note:</strong> Coupons are applicable only on a minimum cart value of <strong>₹800</strong>.</p>
//                 </div>
//             </div>

//             <div className="w-full md:max-w-sm space-y-3 p-4 border border-brand-subtle rounded-lg shadow-sm bg-brand-card">
//                <h2 className="text-lg font-semibold mb-4 text-brand-heading">Cart Summary</h2>
//                <div className="flex justify-between text-sm text-brand-foreground">
//                    <span>Subtotal</span>
//                    <span>{cart.subtotal}</span>
//                </div>

//                {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
//                    <div className="flex justify-between text-sm text-brand-foreground">
//                       <span>Shipping</span>
//                       <span>{cart.shippingTotal}</span>
//                   </div>
//                )}
               
//                {cart.appliedCoupons?.length > 0 && (
//                     <div className="border-t border-brand-subtle pt-3 mt-3 space-y-2">
//                        {cart.appliedCoupons.map(coupon => (
//                            <div key={coupon.code} className="flex justify-between items-center text-sm text-green-600">
//                                <span>Discount ({coupon.code})</span>
//                                <div className="flex items-center gap-2">
//                                    <span>-{coupon.discountAmount || 'N/A'}</span>
//                                    <button onClick={() => handleRemoveCoupon(coupon.code)} disabled={removingCoupon} className="text-red-400 hover:text-red-600 text-lg font-bold disabled:opacity-50">&times;</button>
//                                </div>
//                           </div>
//                        ))}
//                    </div>
//                 )}
               
//                <div className="flex justify-between text-base font-semibold text-brand-heading border-t border-brand-subtle pt-3 mt-3">
//                    <span>Total</span>
//                    <span>{cart.total}</span>
//                </div>
               
//                 <div className="mt-6">
//                     <button
//                        onClick={handleProceedToCheckout}
//                        disabled={cart.isEmpty || cart.contents?.itemCount === 0}
//                        className="w-full bg-brand-primary text-brand-textOnPrimary py-2.5 px-4 rounded font-medium hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Proceed to Checkout
//                     </button>
//                 </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartPage = () => {
  const {
    cart,
    loading,
    cartLoading,
    error,
    removeItem,
    removingItem,
    updateItemQuantities,
    updatingItemQuantities,
    applyCoupon,
    applyingCoupon,
    removeCoupon,
    removingCoupon,
    removeItemError,
    updateItemQuantitiesError,
    refetchCart
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    if (refetchCart) {
      refetchCart();
    }
  }, [refetchCart]);

  const handleRemoveItem = (key) => {
    if (!key || removingItem) return;
    removeItem(key).catch(err => console.error(err));
  };

  const handleUpdateQuantity = (key, newQuantityStr) => {
    const quantity = parseInt(newQuantityStr, 10);
    if (!key || isNaN(quantity) || quantity < 0) return;
    
    if (quantity === 0) {
      handleRemoveItem(key);
      return;
    }
    updateItemQuantities([{ key, quantity }]).catch(err => console.error(err));
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
          setCouponCode('');
      } catch (err) {
          // Store the error message (which might contain HTML)
          setCouponError(err.message || 'Invalid coupon.');
      }
  };
  
  const handleRemoveCoupon = (code) => {
      if (removingCoupon) return;
      removeCoupon(code).catch(err => console.error(err));
  };

  const handleProceedToCheckout = () => {
      navigate('/checkout'); 
  };

  if (loading && !cart) {
    return <div className="container mx-auto px-4 py-10 text-center text-brand-foreground">Loading your cart...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-10 text-center text-red-600">Unable to load cart. Please refresh.</div>;
  }

  if (!cart || cart.isEmpty || !cart.contents?.nodes?.length) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-brand-heading">Your Cart</h1>
        <p className="text-brand-foreground mb-6">Your cart is currently empty.</p>
        <Link to="/shop" className="inline-block bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded hover:bg-opacity-90">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isUpdating = updatingItemQuantities || removingItem || cartLoading;
  const opacityClass = isUpdating ? 'opacity-60 pointer-events-none' : 'opacity-100';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
      <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Your Cart</h1>

      {removeItemError && <p className='text-red-500 mb-4 text-center'>{removeItemError.message}</p>}
      {updateItemQuantitiesError && <p className='text-red-500 mb-4 text-center'>{updateItemQuantitiesError.message}</p>}

      <div className={`transition-opacity duration-200 ${opacityClass}`}>
          
          {/* Cart Items Table */}
          <div className="border rounded-lg shadow-sm overflow-x-auto mb-8 bg-brand-card">
            <table className="min-w-full divide-y divide-brand-subtle">
              <thead className="bg-brand-subtle/20">
                <tr>
                  <th scope="col" colSpan="2" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase">Product</th>
                  <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Price</th>
                  <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-brand-foreground uppercase">Quantity</th>
                  <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-brand-foreground uppercase hidden md:table-cell">Total</th>
                  <th scope="col" className="relative py-3 px-4"><span className="sr-only">Remove</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-subtle">
                {cart.contents.nodes.map((item) => {
                  if (!item || !item.key) return null;

                  const product = item.product?.node;
                  const variation = item.variation?.node;
                  const image = variation?.image || product?.image;
                  const name = variation?.name || product?.name || 'Product';
                  const link = `/products/${product?.slug || product?.databaseId}`;
                  
                  const rawTotal = parseFloat(item.total?.replace(/[^0-9.]/g, '') || 0);
                  const singlePrice = (item.quantity > 0) ? (rawTotal / item.quantity).toFixed(2) : '0.00';
                  const displaySinglePrice = item.total?.includes('₹') ? `₹${singlePrice}` : `$${singlePrice}`;

                  return (
                    <tr key={item.key}>
                      <td className="py-4 pl-4 pr-2 w-16">
                        <Link to={link}>
                            <img className="h-16 w-16 object-contain rounded border border-brand-subtle" src={image?.sourceUrl || '/images/placeholder.png'} alt={name}/>
                        </Link>
                      </td>
                      <td className="py-4 px-4">
                        <Link to={link} className="text-sm font-medium text-brand-heading hover:text-brand-primary">{name}</Link>
                        {variation && variation.attributes && (
                            <div className="text-xs text-brand-foreground/70 mt-1">
                                {variation.attributes.nodes.map(attr => (
                                    <span key={attr.id} className="mr-2">{attr.label}: {attr.value}</span>
                                ))}
                            </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm hidden md:table-cell text-brand-foreground">{displaySinglePrice}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center border border-brand-subtle rounded bg-brand-background">
                                <button
                                    type="button"
                                    onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
                                    className="px-2 py-1 text-brand-foreground hover:bg-brand-subtle/20 transition-colors disabled:opacity-50"
                                    disabled={isUpdating}
                                    aria-label="Decrease quantity"
                                >
                                    <FaMinus size={10} />
                                </button>
                                <span className="w-8 text-center text-sm text-brand-foreground font-medium">
                                    {item.quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
                                    className="px-2 py-1 text-brand-foreground hover:bg-brand-subtle/20 transition-colors disabled:opacity-50"
                                    disabled={isUpdating}
                                    aria-label="Increase quantity"
                                >
                                    <FaPlus size={10} />
                                </button>
                            </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-right hidden md:table-cell text-brand-foreground">{item.total}</td>
                      <td className="py-4 px-4 text-center">
                        <button 
                            onClick={() => handleRemoveItem(item.key)} 
                            disabled={isUpdating} 
                            className="text-red-500 hover:text-red-700 text-xl disabled:opacity-50"
                        >
                            &times;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Bottom Section: Coupon & Summary */}
          <div className="md:flex md:justify-between items-start gap-8">
            
            {/* Coupon Section */}
            <div className="w-full md:max-w-md mb-6 md:mb-0">
                <h2 className="text-lg font-semibold mb-2 text-brand-heading">Have a Coupon?</h2>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input 
                        type="text" 
                        value={couponCode} 
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                        placeholder="Enter coupon code"
                        className="flex-grow border border-brand-subtle rounded p-2 text-sm shadow-sm bg-brand-background text-brand-foreground"
                        disabled={applyingCoupon}
                    />
                    <button type="submit" className="bg-brand-heading text-brand-textOnPrimary px-5 py-2 rounded text-sm font-medium hover:opacity-90 disabled:opacity-60" disabled={applyingCoupon}>
                        {applyingCoupon ? '...' : 'Apply'}
                    </button>
                </form>
                
                {/* FIX 1: Properly Render HTML Error Messages */}
                {couponError && (
                    <div 
                        className='text-red-500 mt-2 text-sm' 
                        dangerouslySetInnerHTML={{ __html: couponError }} 
                    />
                )}
                
                <div className="mt-3 text-xs text-brand-foreground/70 bg-brand-subtle/10 p-2 rounded border border-brand-subtle/30">
                    <p><strong>Note:</strong> Coupons are applicable only on a minimum cart value of <strong>₹800</strong>.</p>
                </div>
            </div>

            {/* Cart Summary Section */}
            <div className="w-full md:max-w-sm space-y-3 p-4 border border-brand-subtle rounded-lg shadow-sm bg-brand-card">
               <h2 className="text-lg font-semibold mb-4 text-brand-heading">Cart Summary</h2>
               
               <div className="flex justify-between text-sm text-brand-foreground">
                   <span>Subtotal</span>
                   <span>{cart.subtotal}</span>
               </div>

               {cart.shippingTotal && cart.shippingTotal !== '$0.00' && (
                   <div className="flex justify-between text-sm text-brand-foreground">
                      <span>Shipping</span>
                      <span>{cart.shippingTotal}</span>
                  </div>
               )}
               
               {/* FIX 2: Applied Coupons & Removal */}
               {cart.appliedCoupons?.length > 0 && (
                    <div className="border-t border-brand-subtle pt-3 mt-3 space-y-2">
                       {cart.appliedCoupons.map(coupon => (
                           <div key={coupon.code} className="flex justify-between items-center text-sm text-green-600 bg-green-50 p-2 rounded border border-green-100">
                               <span className="font-medium">Coupon: {coupon.code}</span>
                               <div className="flex items-center gap-2">
                                   <span>-{coupon.discountAmount || ''}</span>
                                   <button 
                                      onClick={() => handleRemoveCoupon(coupon.code)} 
                                      disabled={removingCoupon} 
                                      className="text-red-500 hover:text-red-700 ml-2 font-bold px-1"
                                      title="Remove Coupon"
                                   >
                                      &times;
                                   </button>
                               </div>
                          </div>
                       ))}
                   </div>
                )}
               
               <div className="flex justify-between text-base font-semibold text-brand-heading border-t border-brand-subtle pt-3 mt-3">
                   <span>Total</span>
                   <span>{cart.total}</span>
               </div>
               
                <div className="mt-6">
                    <button
                       onClick={handleProceedToCheckout}
                       disabled={cart.isEmpty || cart.contents?.itemCount === 0}
                       className="w-full bg-brand-primary text-brand-textOnPrimary py-2.5 px-4 rounded font-medium hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CartPage;