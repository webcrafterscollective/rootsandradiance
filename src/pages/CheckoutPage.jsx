// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import { useMutation } from '@apollo/client';
import { CHECKOUT_MUTATION } from '../graphql/orders.gql';
import { INITIATE_PHONEPE_PAYMENT_MUTATION } from '../graphql/phonepe.gql.js';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [checkoutError, setCheckoutError] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Mutation to initiate PhonePe payment
    const [initiatePhonePePayment, { loading: phonePeLoading }] = useMutation(INITIATE_PHONEPE_PAYMENT_MUTATION, {
        onCompleted: (data) => {
            setIsProcessingPayment(false);
            if (data.initiatePhonePePayment.success && data.initiatePhonePePayment.redirectUrl) {
                // Store order details for callback handling
                sessionStorage.setItem('phonepe_processing_order', JSON.stringify({
                    orderId: data.initiatePhonePePayment.merchantOrderId,
                    timestamp: Date.now()
                }));
                
                // Redirect to PhonePe payment page
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
            
            // Always initiate PhonePe payment for now
            // You can add payment method selection later
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
        
        // For PhonePe, we'll set the payment method as 'phonepe'
        // You can modify CheckoutForm to include payment method selection
        createOrder({
            variables: {
                billingData: formData.billing,
                shippingData: formData.shipping,
                paymentMethod: 'phonepe', // This can be dynamic based on user selection
            }
        });
    };

    const isLoading = checkoutLoading || isProcessingPayment || phonePeLoading;

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

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
            <h1 className="text-3xl font-semibold mb-6 text-brand-heading">Checkout</h1>
            
            <div className="md:flex md:gap-10">
                <div className="md:w-2/3">
                    <CheckoutForm onSubmit={handleCheckout} loading={isLoading} />
                    
                    {checkoutError && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 font-semibold">{checkoutError}</p>
                        </div>
                    )}
                    
                    {isLoading && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-blue-700 font-semibold">
                                {isProcessingPayment ? 'Redirecting to payment...' : 'Processing your order...'}
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