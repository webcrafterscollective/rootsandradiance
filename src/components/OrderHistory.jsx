import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ORDERS } from '../graphql/orders.gql';
import ShimmerPlaceholder from './ShimmerPlaceholder'; // Reusing your shimmer component

// A simple component to visually track order status
const OrderTracker = ({ status }) => {
    const statuses = ['PROCESSING', 'SHIPPED', 'DELIVERED'];
    const currentStatusIndex = statuses.findIndex(s => s === status.toUpperCase());

    // Handle other statuses like PENDING, ON_HOLD, COMPLETED, CANCELLED, FAILED
    if (currentStatusIndex === -1) {
        return <p className="mt-2 text-sm font-semibold capitalize text-gray-700">Status: {status.replace('_', ' ').toLowerCase()}</p>;
    }

    return (
        <div className="w-full mt-4">
            <div className="flex justify-between items-end">
                {statuses.map((s, index) => (
                    <div key={s} className={`flex-1 text-center ${index <= currentStatusIndex ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className="relative mb-2">
                            <div className={`absolute w-full top-1/2 transform -translate-y-1/2 h-1 ${index > 0 ? (index <= currentStatusIndex ? 'bg-green-500' : 'bg-gray-300') : ''}`} style={{ left: '-50%' }}></div>
                            <div className={`w-6 h-6 rounded-full mx-auto border-2 ${index <= currentStatusIndex ? 'bg-green-600 border-green-700' : 'bg-white border-gray-400'}`}></div>
                        </div>
                        <div className="text-xs capitalize">{s.toLowerCase()}</div>
                    </div>
                ))}
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
        return <p className="text-red-500">Could not load your order history. Please try again later.</p>;
    }

    const orders = data?.customer?.orders?.nodes;

    if (!orders || orders.length === 0) {
        return <p className="text-gray-600">You have not placed any orders yet.</p>;
    }

    return (
        <div className="space-y-6">
            {orders.map(order => (
                <div key={order.id} className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="sm:flex sm:justify-between sm:items-start">
                        <div className="mb-4 sm:mb-0">
                            <h3 className="text-lg font-bold text-gray-800">Order #{order.orderNumber}</h3>
                            <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">{order.total}</span></p>
                        </div>
                        <div className="flex items-center space-x-2">
                            {order.lineItems.nodes.slice(0, 3).map(item => (
                                <img
                                    key={item.product.node.id}
                                    src={item.product.node.image?.sourceUrl || '/images/placeholder.png'}
                                    alt={item.product.node.image?.altText || item.product.node.name}
                                    className="w-12 h-12 object-contain rounded border"
                                />
                            ))}
                            {order.lineItems.nodes.length > 3 && (
                                <div className="w-12 h-12 rounded border bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                                    +{order.lineItems.nodes.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 border-t pt-4">
                        <h4 className="text-md font-semibold text-gray-800 mb-2">Track Order</h4>
                        <OrderTracker status={order.status} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;