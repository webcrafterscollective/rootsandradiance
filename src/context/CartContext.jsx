// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_CART_QUERY,
    ADD_TO_CART_MUTATION,
    UPDATE_CART_ITEM_QUANTITIES_MUTATION,
    REMOVE_ITEMS_FROM_CART_MUTATION,
    APPLY_COUPON_MUTATION,
    REMOVE_COUPONS_MUTATION
} from '../graphql/cart.gql.js';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isAuthenticated, loading: authLoading, token } = useAuth();

  const { 
    loading: cartLoading, 
    error: cartError, 
    data: cartData,
    refetch: refetchCart 
  } = useQuery(GET_CART_QUERY, {
    skip: authLoading || !isAuthenticated,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  // Sync cart state whenever Apollo's cartData changes
  useEffect(() => {
    if (cartData?.cart) {
      setCart(cartData.cart);
    } else if (cartData && !cartData.cart) {
      setCart(null);
    }
  }, [cartData]);

  // Handle authentication changes
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        refetchCart();
      } else {
        setCart(null);
      }
    }
  }, [isAuthenticated, authLoading, refetchCart]);

  // Common mutation completion handler
  const handleMutationComplete = async () => {
    try {
      await refetchCart();
    } catch (error) {
      console.error("Error refetching cart:", error);
    }
  };

  const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
    onCompleted: handleMutationComplete,
    onError: (error) => console.error("Error adding item:", error)
  });

  const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
    onCompleted: handleMutationComplete,
    onError: (error) => console.error("Error removing item:", error)
  });

  const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
    onCompleted: handleMutationComplete,
    onError: (error) => console.error("Error updating quantity:", error)
  });

  const [applyCouponMutation, { loading: applyingCoupon, error: applyCouponError }] = useMutation(APPLY_COUPON_MUTATION, {
      onCompleted: handleMutationComplete,
      onError: (error) => {
        console.error("Error applying coupon:", error);
        throw new Error(error.message);
      }
  });
  
  const [removeCouponsMutation, { loading: removingCoupon, error: removeCouponError }] = useMutation(REMOVE_COUPONS_MUTATION, {
      onCompleted: handleMutationComplete,
      onError: (error) => {
        console.error("Error removing coupon:", error);
        throw new Error(error.message);
      }
  });

  const clearCart = () => {
    const emptyCart = {
        contents: { nodes: [], itemCount: 0, productCount: 0 },
        appliedCoupons: [],
        isEmpty: true,
        total: '$0.00',
        subtotal: '$0.00',
        shippingTotal: '$0.00'
    };
    setCart(emptyCart);
  };

  const value = {
    cart,
    loading: (authLoading || cartLoading) && !cart,
    cartLoading,
    error: cartError,
    
    addItem: (variables) => addItemMutation({ variables }),
    addingItem,
    addItemError,
    removeItem: (key) => removeItemMutation({ variables: { keys: [key] } }),
    removingItem,
    removeItemError,
    updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
    updatingItemQuantities,
    updateItemQuantitiesError,
    applyCoupon: (couponCode) => applyCouponMutation({ variables: { code: couponCode } }),
    applyingCoupon,
    applyCouponError,
    removeCoupon: (couponCode) => removeCouponsMutation({ variables: { codes: [couponCode] } }),
    removingCoupon,
    removeCouponError,
    clearCart,
    refetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);