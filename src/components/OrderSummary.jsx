import React from 'react';
import { useCart } from '../context/CartContext';

const OrderSummary = () => {
  const { cart } = useCart();

  if (!cart || cart.isEmpty) {
    return null;
  }

  return (
    <div className="w-full md:max-w-sm space-y-3 p-4 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {cart.contents.nodes.map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={item.product.node.image?.sourceUrl || '/images/placeholder.png'} 
                alt={item.product.node.name} 
                className="w-12 h-12 object-contain rounded border mr-4"
              />
              <div>
                <p className="font-medium text-sm">{item.product.node.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm">{item.total}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 mt-3 space-y-2">
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
          <div className="border-t pt-3 mt-3 space-y-1">
             {cart.appliedCoupons.map(coupon => (
                 <div key={coupon.code} className="flex justify-between text-sm text-green-600">
                     <span>Discount ({coupon.code})</span>
                     <span>-{coupon.discountAmount || 'N/A'}</span>
                </div>
              ))}
         </div>
      )}

        <div className="flex justify-between text-base font-semibold text-gray-900 border-t pt-3 mt-3">
          <span>Total</span>
          <span>{cart.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;