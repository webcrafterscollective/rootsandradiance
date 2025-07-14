// src/pages/PaymentCallbackPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Processing your payment...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const orderId = searchParams.get('order_id');
                
                if (!orderId) {
                    setStatus('error');
                    setMessage('Invalid payment callback - missing order ID');
                    return;
                }

                // Get stored order info from session
                const storedOrder = sessionStorage.getItem('phonepe_processing_order');
                if (storedOrder) {
                    sessionStorage.removeItem('phonepe_processing_order');
                }

                // Since WordPress callback will handle the redirect,
                // this component mainly handles edge cases
                setStatus('success');
                setMessage('Payment processed successfully! Redirecting...');
                
                // Clear cart and redirect
                clearCart();
                
                setTimeout(() => {
                    navigate('/account', { replace: true });
                }, 2000);
                
            } catch (error) {
                console.error('Payment callback error:', error);
                setStatus('error');
                setMessage('Payment verification failed. Please check your order status.');
                
                setTimeout(() => {
                    navigate('/account', { replace: true });
                }, 3000);
            }
        };

        handleCallback();
    }, [searchParams, navigate, clearCart]);

    const renderStatus = () => {
        switch (status) {
            case 'processing':
                return (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-brand-heading mb-2">Processing Payment</h2>
                        <p className="text-brand-foreground">{message}</p>
                    </div>
                );
                
            case 'success':
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-brand-heading mb-2">Payment Successful!</h2>
                        <p className="text-brand-foreground">{message}</p>
                    </div>
                );
                
            case 'error':
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-brand-heading mb-2">Payment Issue</h2>
                        <p className="text-brand-foreground">{message}</p>
                        <button 
                            onClick={() => navigate('/account')}
                            className="mt-4 bg-brand-primary text-brand-textOnPrimary px-6 py-2 rounded"
                        >
                            Check Order Status
                        </button>
                    </div>
                );
                
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-background">
            <div className="max-w-md w-full mx-4 p-8 bg-brand-card rounded-lg shadow-lg">
                {renderStatus()}
            </div>
        </div>
    );
};

export default PaymentCallbackPage;