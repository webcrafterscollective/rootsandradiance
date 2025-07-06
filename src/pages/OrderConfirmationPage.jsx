import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    // This can happen if the user navigates directly to this page
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
        <p className="mt-2 text-brand-primary-light">Your order is being processed.</p>
        <Link to="/shop" className="inline-block mt-8 bg-brand-primary text-brand-textOnPrimary px-8 py-3 rounded hover:bg-brand-primary-hover">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-brand-accent">Thank You!</h1>
      <p className="text-lg mt-2 text-brand-primary-light">Your order has been placed successfully.</p>
      
      {/* Add text-brand-text-dark to this container */}
      <div className="mt-8 border p-6 rounded-lg max-w-md mx-auto bg-white text-brand-text-dark">
        <h2 className="font-semibold text-xl mb-4">Order Details</h2>
        <p><strong>Order Number:</strong> #{order.orderNumber}</p>
        <p><strong>Total:</strong> {order.total}</p>
      </div>

      <Link to="/shop" className="inline-block mt-8 bg-brand-primary text-brand-textOnPrimary px-8 py-3 rounded font-medium hover:bg-brand-primary-hover">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;