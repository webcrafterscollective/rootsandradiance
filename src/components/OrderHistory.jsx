// // src/components/OrderHistory.jsx
// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_CUSTOMER_ORDERS } from '../graphql/orders.gql';
// import ShimmerPlaceholder from './ShimmerPlaceholder';

// // A simple component to visually track order status
// const OrderTracker = ({ status }) => {
//     const statuses = ['PROCESSING', 'SHIPPED', 'DELIVERED'];
//     // Safely handle status if it's somehow null/undefined
//     const safeStatus = status ? status.toUpperCase() : '';
//     const currentStatusIndex = statuses.findIndex(s => s === safeStatus);

//     // Handle other statuses like PENDING, ON_HOLD, COMPLETED, CANCELLED, FAILED
//     if (currentStatusIndex === -1) {
//         return <p className="mt-2 text-sm font-semibold capitalize text-gray-700">Status: {safeStatus.replace('_', ' ').toLowerCase()}</p>;
//     }

//     return (
//         <div className="w-full mt-4">
//             <div className="flex justify-between items-end">
//                 {statuses.map((s, index) => (
//                     <div key={s} className={`flex-1 text-center ${index <= currentStatusIndex ? 'text-green-600' : 'text-gray-400'}`}>
//                         <div className="relative mb-2">
//                             <div className={`absolute w-full top-1/2 transform -translate-y-1/2 h-1 ${index > 0 ? (index <= currentStatusIndex ? 'bg-green-500' : 'bg-gray-300') : ''}`} style={{ left: '-50%' }}></div>
//                             <div className={`w-6 h-6 rounded-full mx-auto border-2 ${index <= currentStatusIndex ? 'bg-green-600 border-green-700' : 'bg-white border-gray-400'}`}></div>
//                         </div>
//                         <div className="text-xs capitalize">{s.toLowerCase()}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };


// const OrderHistory = () => {
//     const { data, loading, error } = useQuery(GET_CUSTOMER_ORDERS);

//     if (loading) {
//         return <ShimmerPlaceholder className="h-48 w-full" />;
//     }

//     if (error) {
//         console.error("Order History Error:", error);
//         return <p className="text-red-500">Could not load your order history. Please try again later.</p>;
//     }

//     const orders = data?.customer?.orders?.nodes;

//     if (!orders || orders.length === 0) {
//         return <p className="text-gray-600">You have not placed any orders yet.</p>;
//     }

//     return (
//         <div className="space-y-6">
//             {orders.map(order => {
//                 // Filter out null/undefined items before processing
//                 const validLineItems = order.lineItems?.nodes?.filter(item => item != null) || [];
                
//                 return (
//                     <div key={order.id} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
//                         <div className="sm:flex sm:justify-between sm:items-start">
//                             <div className="mb-4 sm:mb-0">
//                                 <h3 className="text-lg font-bold text-gray-800">Order #{order.orderNumber}</h3>
//                                 <p className="text-sm text-gray-500">Date: {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
//                                 <p className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">{order.total}</span></p>
//                             </div>
                            
//                             {/* Product Images */}
//                             <div className="flex items-center space-x-2">
//                                 {validLineItems.slice(0, 3).map((item, index) => {
//                                     // Double-check item exists
//                                     if (!item) return null;
                                    
//                                     // Safely access product node
//                                     const product = item.product?.node;
                                    
//                                     // If product is null (deleted), render a fallback placeholder
//                                     if (!product) {
//                                         return (
//                                             <div 
//                                                 key={`deleted-${order.id}-${index}`} 
//                                                 className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-[10px] text-gray-400" 
//                                                 title="Product Unavailable"
//                                             >
//                                                 N/A
//                                             </div>
//                                         );
//                                     }

//                                     return (
//                                         <img
//                                             key={product.id || `item-${order.id}-${index}`}
//                                             src={product.image?.sourceUrl || '/images/placeholder.png'}
//                                             alt={product.image?.altText || product.name || 'Product Image'}
//                                             className="w-12 h-12 object-contain rounded border"
//                                         />
//                                     );
//                                 })}
                                
//                                 {/* Counter for extra items */}
//                                 {validLineItems.length > 3 && (
//                                     <div className="w-12 h-12 rounded border bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
//                                         +{validLineItems.length - 3}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
                        
//                         <div className="mt-4 border-t pt-4">
//                             <h4 className="text-md font-semibold text-gray-800 mb-2">Track Order</h4>
//                             <OrderTracker status={order.status} />
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default OrderHistory;

// src/components/OrderHistory.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../graphql/orders.gql';
import ShimmerPlaceholder from './ShimmerPlaceholder';

// A simple component to visually track order status
const OrderTracker = ({ status }) => {
    const statuses = ['PROCESSING', 'SHIPPED', 'DELIVERED'];
    
    // Safely handle status
    let safeStatus = status ? status.toUpperCase() : '';

    // FIX: Map 'COMPLETED' to 'DELIVERED' so the tracker shows full progress
    if (safeStatus === 'COMPLETED') {
        safeStatus = 'DELIVERED';
    }

    const currentStatusIndex = statuses.findIndex(s => s === safeStatus);

    // Handle other statuses like PENDING, ON_HOLD, CANCELLED, FAILED, REFUNDED
    if (currentStatusIndex === -1) {
        let statusColor = 'text-gray-700';
        if (['CANCELLED', 'FAILED'].includes(safeStatus)) statusColor = 'text-red-600';
        if (['PENDING', 'ON_HOLD'].includes(safeStatus)) statusColor = 'text-orange-600';
        if (safeStatus === 'REFUNDED') statusColor = 'text-blue-600';

        return <p className={`mt-4 text-sm font-bold capitalize ${statusColor}`}>Status: {safeStatus.replace('_', ' ').toLowerCase()}</p>;
    }

    return (
        <div className="w-full mt-6 mb-2">
            <div className="flex justify-between items-end relative">
                {/* Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded"></div>
                
                {/* Active Line Progress */}
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transform -translate-y-1/2 rounded transition-all duration-500"
                    style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
                ></div>

                {statuses.map((s, index) => {
                    const isActive = index <= currentStatusIndex;
                    return (
                        <div key={s} className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 z-10 ${isActive ? 'bg-green-600 border-green-600' : 'bg-white border-gray-300'}`}></div>
                            <div className={`text-[10px] sm:text-xs font-medium mt-2 capitalize ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                                {s.toLowerCase()}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


const OrderHistory = () => {
    const { data, loading, error } = useQuery(GET_CUSTOMER_ORDERS);

    if (loading) {
        return <ShimmerPlaceholder className="h-48 w-full" />;
    }

    if (error) {
        console.error("Order History Error:", error);
        return <p className="text-red-500 text-center py-8">Could not load your order history. Please try again later.</p>;
    }

    const orders = data?.customer?.orders?.nodes;

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-600">You have not placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map(order => {
                // Filter out null/undefined items before processing
                const validLineItems = order.lineItems?.nodes?.filter(item => item != null) || [];
                
                // Determine Status Badge Color
                const status = order.status?.toUpperCase();
                const statusBadgeClass = 
                    status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                    ['CANCELLED', 'FAILED'].includes(status) ? 'bg-red-100 text-red-800' :
                    ['PENDING', 'ON_HOLD'].includes(status) ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800';

                return (
                    <div key={order.id} className="bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-gray-800">Order #{order.orderNumber}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Date: {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</p>
                                <p className="text-sm text-gray-600 font-medium">Total: <span className="text-gray-900">{order.total}</span></p>
                                {/* ADDED: Payment Method Display */}
                                <p className="text-sm text-gray-600">Payment: <span className="font-medium text-gray-800">{order.paymentMethodTitle || 'N/A'}</span></p>
                            </div>
                            
                            {/* Product Images Preview */}
                            <div className="flex items-center space-x-2">
                                {validLineItems.slice(0, 3).map((item, index) => {
                                    if (!item) return null;
                                    const product = item.product?.node;
                                    
                                    if (!product) {
                                        return (
                                            <div key={`deleted-${order.id}-${index}`} className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded border text-[10px] text-gray-400" title="Product Unavailable">
                                                N/A
                                            </div>
                                        );
                                    }

                                    return (
                                        <img
                                            key={product.id || `item-${order.id}-${index}`}
                                            src={product.image?.sourceUrl || '/images/placeholder.png'}
                                            alt={product.image?.altText || product.name || 'Product'}
                                            className="w-12 h-12 object-contain rounded border border-gray-200 bg-gray-50"
                                            title={product.name}
                                        />
                                    );
                                })}
                                
                                {validLineItems.length > 3 && (
                                    <div className="w-12 h-12 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                                        +{validLineItems.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                            <OrderTracker status={order.status} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderHistory;