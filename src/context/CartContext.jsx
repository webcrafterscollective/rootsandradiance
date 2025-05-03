// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import {
    GET_CART_QUERY,
    ADD_TO_CART_MUTATION,
    UPDATE_CART_ITEM_QUANTITIES_MUTATION,
    REMOVE_ITEMS_FROM_CART_MUTATION
} from '../graphql/cart.gql'; // Adjust path if needed
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isAuthenticated, loading: authLoading, token } = useAuth();
  const client = useApolloClient();

  // Fetch cart data - Keep network-only or switch back if needed
  const { loading: cartLoading, error: cartError, data: cartData, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
    skip: authLoading || !isAuthenticated,
    fetchPolicy: 'network-only', // Or 'cache-and-network'
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error("Error fetching cart:", error);
       // Basic error handling, potentially clear cart state
       setCart(null);
    },
    onCompleted: (data) => {
       console.log("Cart data received/updated:", data);
       setCart(data?.cart || null); // Update local state representation
    }
  });

  // Refetch cart on auth changes (important fallback)
  useEffect(() => {
      if (!authLoading) {
          if (isAuthenticated) {
              console.log("Attempting to refetch cart due to auth change...");
              refetchCart().catch(err => console.error("Refetch cart failed:", err));
          } else {
               console.log("Clearing cart state due to logout...");
               setCart(null);
          }
      }
  }, [isAuthenticated, authLoading, token, refetchCart]);


  // --- Add Item Mutation with Manual Cache Update ---
  const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
    // Instead of refetchQueries, use the update function for immediate cache modification
    update(cache, { data: { addToCart } }) {
      try {
        if (!addToCart?.cart) {
            console.warn("Add to cart mutation response did not contain cart data.");
            // Trigger refetch as fallback if response is incomplete
            refetchCart();
            return;
        }
        // Write the entire new cart object from the mutation response to the cache
        cache.writeQuery({
          query: GET_CART_QUERY,
          data: { cart: addToCart.cart }, // Overwrite cache with the updated cart
        });
        console.log("Apollo cache updated manually after adding item.");
      } catch (e) {
        console.error("Error updating Apollo cache after adding item:", e);
        refetchCart(); // Fallback to refetch if cache update fails
      }
    },
    onError: (error) => {
      console.error("Error adding item to cart mutation:", error);
      // Specific error handling/feedback should occur in the component calling addItem
    }
  });

  // --- Remove Item Mutation with Manual Cache Update ---
  const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
    update(cache, { data: { removeItemsFromCart } }) {
        try {
            if (!removeItemsFromCart?.cart) {
                console.warn("Remove items mutation response did not contain cart data.");
                refetchCart();
                return;
            }
            // Overwrite cache with the updated cart from the response
            cache.writeQuery({
                query: GET_CART_QUERY,
                data: { cart: removeItemsFromCart.cart },
            });
            console.log("Apollo cache updated manually after removing item(s).");
        } catch (e) {
            console.error("Error updating Apollo cache after removing item(s):", e);
            refetchCart(); // Fallback
        }
    },
    onError: (error) => console.error("Error removing item mutation:", error)
  });

  // --- Update Quantities Mutation with Manual Cache Update ---
  const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
     update(cache, { data: { updateItemQuantities } }) {
        try {
            if (!updateItemQuantities?.cart) {
                console.warn("Update quantities mutation response did not contain cart data.");
                refetchCart();
                return;
            }
             // Overwrite cache with the updated cart from the response
            cache.writeQuery({
                query: GET_CART_QUERY,
                data: { cart: updateItemQuantities.cart },
            });
            console.log("Apollo cache updated manually after updating quantities.");
        } catch (e) {
            console.error("Error updating Apollo cache after updating quantities:", e);
            refetchCart(); // Fallback
        }
     },
     onError: (error) => console.error("Error updating quantities mutation:", error)
  });


   // --- Wrapper functions remain the same ---
   const addItem = (variables) => {
       if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
       return addItemMutation({ variables });
   };

  const updateItemQuantities = (items) => {
      if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
      return updateItemQuantitiesMutation({ variables: { items } });
  };

  const removeItem = (keys) => {
      if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
      // Ensure keys is always an array
      const keysArray = Array.isArray(keys) ? keys : [keys];
      return removeItemMutation({ variables: { keys: keysArray, all: false } });
  };
  // --- End Wrapper functions ---


  // --- Context Value ---
  const value = {
    cart,
    loading: authLoading || cartLoading,
    error: cartError,
    refetchCart,

    // Actions and their states
    addItem,
    addingItem,
    addItemError,

    updateItemQuantities,
    updatingItemQuantities,
    updateItemQuantitiesError,

    removeItem,
    removingItem,
    removeItemError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook remains the same
export const useCart = () => {
  const context = useContext(CartContext);
   if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider.');
   }
   if (context === null) {
       console.warn('CartContext value is null.');
       return { cart: null, loading: true, error: null, /* provide defaults/stubs */ };
   }
  return context;
};