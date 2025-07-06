import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';
import { useMutation } from '@apollo/client';
import { CHECKOUT_MUTATION } from '../graphql/orders.gql';
import { INITIATE_PHONEPE_PAYMENT_MUTATION } from '../graphql/phonepe.gql.js'; // Ensure .js extension is there if applicable

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [checkoutError, setCheckoutError] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // Mutation to initiate the PhonePe payment AFTER an order is created
    const [initiatePhonePePayment, { loading: phonePeLoading }] = useMutation(INITIATE_PHONEPE_PAYMENT_MUTATION, {
        onCompleted: (data) => {
            setIsProcessingPayment(false); // Stop processing indicator
            if (data.initiatePhonePePayment.success && data.initiatePhonePePayment.redirectUrl) {
                // Redirect the user to the PhonePe payment page
                window.location.href = data.initiatePhonePePayment.redirectUrl;
            } else {
                // If the mutation reports failure, show the message
                setCheckoutError(data.initiatePhonePePayment.message || 'Failed to prepare your payment. Please try another method.');
            }
        },
        onError: (error) => {
            console.error("PhonePe Initiation GraphQL Error:", error);
            setCheckoutError(error.message || 'An unknown error occurred while setting up your payment.');
            setIsProcessingPayment(false);
        }
    });

    // Mutation to create the WooCommerce order
    const [createOrder, { loading: checkoutLoading }] = useMutation(CHECKOUT_MUTATION, {
        onCompleted: (data) => {
            const order = data?.checkout?.order;
            const paymentMethod = data?.checkout?.paymentMethod; // Make sure your CHECKOUT_MUTATION returns this

            if (!order || !order.databaseId) {
                setCheckoutError("Failed to create order. Please try again.");
                return;
            }
            
            // Check if the chosen payment method was PhonePe
            if (paymentMethod === 'phonepe') {
                setIsProcessingPayment(true); // Show a processing state to the user
                setCheckoutError(null); // Clear previous errors
                // Initiate the PhonePe payment with the new order ID
                initiatePhonePePayment({ variables: { orderId: order.databaseId } });
            } else {
                // For other payment methods like COD
                clearCart();
                navigate('/order-confirmation', { state: { order } });
            }
        },
        onError: (error) => {
            console.error("Order Creation Error:", error);
            setCheckoutError(error.message || "Could not create your order. Please check your details.");
        }
    });

    // This function is passed to the CheckoutForm
    const handleCheckout = (formData) => {
        setCheckoutError(null); // Reset error on new submission
        createOrder({
            variables: {
                billingData: formData.billing,
                shippingData: formData.shipping,
                paymentMethod: formData.paymentMethod,
            }
        });
    };

    const isLoading = checkoutLoading || isProcessingPayment || phonePeLoading;

    if (!cart || cart.isEmpty) {
        return (
            <div className="container mx-auto text-center py-10">
                <h1 className="text-2xl">Your cart is empty.</h1>
                <button onClick={() => navigate('/shop')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
            <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
            
            <div className="md:flex md:gap-10">
                <div className="md:w-2/3">
                    <CheckoutForm onSubmit={handleCheckout} loading={isLoading} />
                    {checkoutError && <p className="text-red-500 mt-4 font-semibold">{checkoutError}</p>}
                    {isLoading && <p className="text-blue-600 mt-4 font-semibold">Processing your order, please wait...</p>}
                </div>
                <div className="md:w-1/3 mt-10 md:mt-0">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;