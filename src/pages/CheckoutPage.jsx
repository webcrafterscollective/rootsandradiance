// // src/pages/CheckoutPage.jsx
// import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import CheckoutForm from '../components/CheckoutForm';
// import OrderSummary from '../components/OrderSummary';
// import { useMutation } from '@apollo/client';
// import { CHECKOUT_MUTATION } from '../graphql/orders.gql';
// import { INITIATE_PHONEPE_PAYMENT_MUTATION } from '../graphql/phonepe.gql.js';

// const CheckoutPage = () => {
//     const { cart, clearCart } = useCart();
//     const navigate = useNavigate();
//     const [checkoutError, setCheckoutError] = useState(null);
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//     // Mutation to initiate PhonePe payment
//     const [initiatePhonePePayment, { loading: phonePeLoading }] = useMutation(INITIATE_PHONEPE_PAYMENT_MUTATION, {
//         onCompleted: (data) => {
//             setIsProcessingPayment(false);
//             if (data.initiatePhonePePayment.success && data.initiatePhonePePayment.redirectUrl) {
//                 // Store order details for callback handling
//                 sessionStorage.setItem('phonepe_processing_order', JSON.stringify({
//                     orderId: data.initiatePhonePePayment.merchantOrderId,
//                     timestamp: Date.now()
//                 }));
                
//                 // Redirect to PhonePe payment page
//                 window.location.href = data.initiatePhonePePayment.redirectUrl;
//             } else {
//                 setCheckoutError(data.initiatePhonePePayment.message || 'Failed to initiate payment');
//             }
//         },
//         onError: (error) => {
//             console.error("PhonePe Initiation Error:", error);
//             setCheckoutError('Payment initiation failed. Please try again.');
//             setIsProcessingPayment(false);
//         }
//     });

//     // Mutation to create WooCommerce order
//     const [createOrder, { loading: checkoutLoading }] = useMutation(CHECKOUT_MUTATION, {
//         onCompleted: (data) => {
//             const order = data?.checkout?.order;
            
//             if (!order || !order.databaseId) {
//                 setCheckoutError("Failed to create order. Please try again.");
//                 return;
//             }
            
//             // Always initiate PhonePe payment for now
//             // You can add payment method selection later
//             setIsProcessingPayment(true);
//             setCheckoutError(null);
            
//             initiatePhonePePayment({ 
//                 variables: { orderId: order.databaseId } 
//             });
//         },
//         onError: (error) => {
//             console.error("Order Creation Error:", error);
//             setCheckoutError(error.message || "Could not create your order.");
//         }
//     });

//     const handleCheckout = (formData) => {
//         setCheckoutError(null);
        
//         // For PhonePe, we'll set the payment method as 'phonepe'
//         // You can modify CheckoutForm to include payment method selection
//         createOrder({
//             variables: {
//                 billingData: formData.billing,
//                 shippingData: formData.shipping,
//                 paymentMethod: 'phonepe', // This can be dynamic based on user selection
//             }
//         });
//     };

//     const isLoading = checkoutLoading || isProcessingPayment || phonePeLoading;

//     if (!cart || cart.isEmpty) {
//         return (
//             <div className="container mx-auto text-center py-10">
//                 <h1 className="text-2xl text-brand-heading">Your cart is empty.</h1>
//                 <button 
//                     onClick={() => navigate('/shop')} 
//                     className="mt-4 bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded"
//                 >
//                     Continue Shopping
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
//             <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Checkout</h1>
            
//             <div className="md:flex md:gap-10">
//                 <div className="md:w-2/3">
//                     <CheckoutForm onSubmit={handleCheckout} loading={isLoading} />
                    
//                     {checkoutError && (
//                         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
//                             <p className="text-red-700 font-semibold">{checkoutError}</p>
//                         </div>
//                     )}
                    
//                     {isLoading && (
//                         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
//                             <p className="text-blue-700 font-semibold">
//                                 {isProcessingPayment ? 'Redirecting to payment...' : 'Processing your order...'}
//                             </p>
//                         </div>
//                     )}
//                 </div>
                
//                 <div className="md:w-1/3 mt-10 md:mt-0">
//                     <OrderSummary />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;

// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import { useMutation } from '@apollo/client';
import { CHECKOUT_MUTATION } from '../graphql/orders.gql';
import { INITIATE_PHONEPE_PAYMENT_MUTATION } from '../graphql/phonepe.gql.js';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // Hook to read URL params
    
    // Extract query parameters
    const status = searchParams.get('status');
    const paramMessage = searchParams.get('message');
    const paramError = searchParams.get('error');
    const orderId = searchParams.get('order_id');

    // Initialize error state with URL message if present
    const [checkoutError, setCheckoutError] = useState(
        (status === 'failed' || status === 'error') 
            ? decodeURIComponent(paramMessage || 'Payment failed. Please try again.') 
            : null
    );
    
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Effect: Clear cart if success (just in case it wasn't cleared by callback)
    useEffect(() => {
        if (status === 'success' && cart && !cart.isEmpty) {
            clearCart();
        }
    }, [status, cart, clearCart]);

    // Mutation to initiate PhonePe payment
    const [initiatePhonePePayment, { loading: phonePeLoading }] = useMutation(INITIATE_PHONEPE_PAYMENT_MUTATION, {
        onCompleted: (data) => {
            setIsProcessingPayment(false);
            if (data.initiatePhonePePayment.success && data.initiatePhonePePayment.redirectUrl) {
                sessionStorage.setItem('phonepe_processing_order', JSON.stringify({
                    orderId: data.initiatePhonePePayment.merchantOrderId,
                    timestamp: Date.now()
                }));
                window.location.href = data.initiatePhonePePayment.redirectUrl;
            } else {
                setCheckoutError(data.initiatePhonePePayment.message || 'Failed to initiate payment');
            }
        },
        onError: (error) => {
            console.error("PhonePe Initiation Error:", error);
            setCheckoutError('Payment initiation failed. Please try again.');
            setIsProcessingPayment(false);
        }
    });

    // Mutation to create WooCommerce order
    const [createOrder, { loading: checkoutLoading }] = useMutation(CHECKOUT_MUTATION, {
        onCompleted: (data) => {
            const order = data?.checkout?.order;
            if (!order || !order.databaseId) {
                setCheckoutError("Failed to create order. Please try again.");
                return;
            }
            setIsProcessingPayment(true);
            setCheckoutError(null);
            initiatePhonePePayment({ 
                variables: { orderId: order.databaseId } 
            });
        },
        onError: (error) => {
            console.error("Order Creation Error:", error);
            setCheckoutError(error.message || "Could not create your order.");
        }
    });

    const handleCheckout = (formData) => {
        setCheckoutError(null);
        createOrder({
            variables: {
                billingData: formData.billing,
                shippingData: formData.shipping,
                paymentMethod: 'phonepe',
            }
        });
    };

    const isLoading = checkoutLoading || isProcessingPayment || phonePeLoading;

    // --- VIEW 1: Payment Success ---
    if (status === 'success') {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-brand-heading mb-4">Order Placed Successfully!</h1>
                <p className="text-lg text-brand-foreground mb-2">Thank you for your purchase.</p>
                {orderId && <p className="text-sm text-gray-500 mb-8">Order ID: #{orderId}</p>}
                
                <button 
                    onClick={() => navigate('/shop')} 
                    className="bg-brand-primary text-brand-textOnPrimary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    // --- VIEW 2: Payment Failed + Cart Empty ---
    if ((status === 'failed' || status === 'error') && (!cart || cart.isEmpty)) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-brand-heading mb-4">Payment Failed</h1>
                <p className="text-red-600 font-medium mb-2">{decodeURIComponent(paramMessage || 'Transaction was cancelled or failed.')}</p>
                {paramError && <p className="text-sm text-gray-500 mb-6">Error: {paramError}</p>}
                
                <p className="text-brand-foreground mb-8">Your cart seems to be empty. Please add items to try again.</p>
                
                <button 
                    onClick={() => navigate('/shop')} 
                    className="bg-brand-primary text-brand-textOnPrimary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                >
                    Return to Shop
                </button>
            </div>
        );
    }

    // --- VIEW 3: Standard Empty Cart ---
    if (!cart || cart.isEmpty) {
        return (
            <div className="container mx-auto text-center py-10">
                <h1 className="text-2xl text-brand-heading">Your cart is empty.</h1>
                <button 
                    onClick={() => navigate('/shop')} 
                    className="mt-4 bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    // --- VIEW 4: Checkout Form (Retry or New) ---
    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
            <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Checkout</h1>
            
            <div className="md:flex md:gap-10">
                <div className="md:w-2/3">
                    {/* Display Error Banner if Payment Failed but Cart exists (Retry scenario) */}
                    {checkoutError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div>
                                <h3 className="text-red-800 font-medium">Payment Failed</h3>
                                <p className="text-red-700 text-sm mt-1">{checkoutError}</p>
                            </div>
                        </div>
                    )}

                    <CheckoutForm onSubmit={handleCheckout} loading={isLoading} />
                    
                    {isLoading && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-blue-700 font-semibold">
                                {isProcessingPayment ? 'Redirecting to PhonePe...' : 'Processing your order...'}
                            </p>
                        </div>
                    )}
                </div>
                
                <div className="md:w-1/3 mt-10 md:mt-0">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;