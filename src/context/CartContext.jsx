// // // // // // // src/context/CartContext.jsx
// // // // // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // // // // import { useQuery, useMutation, useApolloClient } from '@apollo/client';
// // // // // // import {
// // // // // //     GET_CART_QUERY,
// // // // // //     ADD_TO_CART_MUTATION,
// // // // // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // // // // //     REMOVE_ITEMS_FROM_CART_MUTATION
// // // // // // } from '../graphql/cart.gql'; // Adjust path if needed
// // // // // // import { useAuth } from './AuthContext';

// // // // // // const CartContext = createContext(null);

// // // // // // export const CartProvider = ({ children }) => {
// // // // // //   const [cart, setCart] = useState(null);
// // // // // //   const { isAuthenticated, loading: authLoading, token } = useAuth();
// // // // // //   const client = useApolloClient();

// // // // // //   // Fetch cart data - Keep network-only or switch back if needed
// // // // // //   const { loading: cartLoading, error: cartError, data: cartData, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
// // // // // //     skip: authLoading || !isAuthenticated,
// // // // // //     fetchPolicy: 'network-only', // Or 'cache-and-network'
// // // // // //     notifyOnNetworkStatusChange: true,
// // // // // //     onError: (error) => {
// // // // // //       console.error("Error fetching cart:", error);
// // // // // //        // Basic error handling, potentially clear cart state
// // // // // //        setCart(null);
// // // // // //     },
// // // // // //     onCompleted: (data) => {
// // // // // //        console.log("Cart data received/updated:", data);
// // // // // //        setCart(data?.cart || null); // Update local state representation
// // // // // //     }
// // // // // //   });

// // // // // //   // Refetch cart on auth changes (important fallback)
// // // // // //   useEffect(() => {
// // // // // //       if (!authLoading) {
// // // // // //           if (isAuthenticated) {
// // // // // //               console.log("Attempting to refetch cart due to auth change...");
// // // // // //               refetchCart().catch(err => console.error("Refetch cart failed:", err));
// // // // // //           } else {
// // // // // //                console.log("Clearing cart state due to logout...");
// // // // // //                setCart(null);
// // // // // //           }
// // // // // //       }
// // // // // //   }, [isAuthenticated, authLoading, token, refetchCart]);


// // // // // //   // --- Add Item Mutation with Manual Cache Update ---
// // // // // //   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
// // // // // //     // Instead of refetchQueries, use the update function for immediate cache modification
// // // // // //     update(cache, { data: { addToCart } }) {
// // // // // //       try {
// // // // // //         if (!addToCart?.cart) {
// // // // // //             console.warn("Add to cart mutation response did not contain cart data.");
// // // // // //             // Trigger refetch as fallback if response is incomplete
// // // // // //             refetchCart();
// // // // // //             return;
// // // // // //         }
// // // // // //         // Write the entire new cart object from the mutation response to the cache
// // // // // //         cache.writeQuery({
// // // // // //           query: GET_CART_QUERY,
// // // // // //           data: { cart: addToCart.cart }, // Overwrite cache with the updated cart
// // // // // //         });
// // // // // //         console.log("Apollo cache updated manually after adding item.");
// // // // // //       } catch (e) {
// // // // // //         console.error("Error updating Apollo cache after adding item:", e);
// // // // // //         refetchCart(); // Fallback to refetch if cache update fails
// // // // // //       }
// // // // // //     },
// // // // // //     onError: (error) => {
// // // // // //       console.error("Error adding item to cart mutation:", error);
// // // // // //       // Specific error handling/feedback should occur in the component calling addItem
// // // // // //     }
// // // // // //   });

// // // // // //   // --- Remove Item Mutation with Manual Cache Update ---
// // // // // //   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
// // // // // //     update(cache, { data: { removeItemsFromCart } }) {
// // // // // //         try {
// // // // // //             if (!removeItemsFromCart?.cart) {
// // // // // //                 console.warn("Remove items mutation response did not contain cart data.");
// // // // // //                 refetchCart();
// // // // // //                 return;
// // // // // //             }
// // // // // //             // Overwrite cache with the updated cart from the response
// // // // // //             cache.writeQuery({
// // // // // //                 query: GET_CART_QUERY,
// // // // // //                 data: { cart: removeItemsFromCart.cart },
// // // // // //             });
// // // // // //             console.log("Apollo cache updated manually after removing item(s).");
// // // // // //         } catch (e) {
// // // // // //             console.error("Error updating Apollo cache after removing item(s):", e);
// // // // // //             refetchCart(); // Fallback
// // // // // //         }
// // // // // //     },
// // // // // //     onError: (error) => console.error("Error removing item mutation:", error)
// // // // // //   });

// // // // // //   // --- Update Quantities Mutation with Manual Cache Update ---
// // // // // //   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
// // // // // //      update(cache, { data: { updateItemQuantities } }) {
// // // // // //         try {
// // // // // //             if (!updateItemQuantities?.cart) {
// // // // // //                 console.warn("Update quantities mutation response did not contain cart data.");
// // // // // //                 refetchCart();
// // // // // //                 return;
// // // // // //             }
// // // // // //              // Overwrite cache with the updated cart from the response
// // // // // //             cache.writeQuery({
// // // // // //                 query: GET_CART_QUERY,
// // // // // //                 data: { cart: updateItemQuantities.cart },
// // // // // //             });
// // // // // //             console.log("Apollo cache updated manually after updating quantities.");
// // // // // //         } catch (e) {
// // // // // //             console.error("Error updating Apollo cache after updating quantities:", e);
// // // // // //             refetchCart(); // Fallback
// // // // // //         }
// // // // // //      },
// // // // // //      onError: (error) => console.error("Error updating quantities mutation:", error)
// // // // // //   });


// // // // // //    // --- Wrapper functions remain the same ---
// // // // // //    const addItem = (variables) => {
// // // // // //        if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // // //        return addItemMutation({ variables });
// // // // // //    };

// // // // // //   const updateItemQuantities = (items) => {
// // // // // //       if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // // //       return updateItemQuantitiesMutation({ variables: { items } });
// // // // // //   };

// // // // // //   const removeItem = (keys) => {
// // // // // //       if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // // //       // Ensure keys is always an array
// // // // // //       const keysArray = Array.isArray(keys) ? keys : [keys];
// // // // // //       return removeItemMutation({ variables: { keys: keysArray, all: false } });
// // // // // //   };
// // // // // //   // --- End Wrapper functions ---


// // // // // //   // --- Context Value ---
// // // // // //   const value = {
// // // // // //     cart,
// // // // // //     loading: authLoading || cartLoading,
// // // // // //     error: cartError,
// // // // // //     refetchCart,

// // // // // //     // Actions and their states
// // // // // //     addItem,
// // // // // //     addingItem,
// // // // // //     addItemError,

// // // // // //     updateItemQuantities,
// // // // // //     updatingItemQuantities,
// // // // // //     updateItemQuantitiesError,

// // // // // //     removeItem,
// // // // // //     removingItem,
// // // // // //     removeItemError,
// // // // // //   };

// // // // // //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // // // // // };

// // // // // // // Custom hook remains the same
// // // // // // export const useCart = () => {
// // // // // //   const context = useContext(CartContext);
// // // // // //    if (context === undefined) {
// // // // // //       throw new Error('useCart must be used within a CartProvider.');
// // // // // //    }
// // // // // //    if (context === null) {
// // // // // //        console.warn('CartContext value is null.');
// // // // // //        return { cart: null, loading: true, error: null, /* provide defaults/stubs */ };
// // // // // //    }
// // // // // //   return context;
// // // // // // };

// // // // // // src/context/CartContext.jsx
// // // // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // // // import { useQuery, useMutation, useApolloClient } from '@apollo/client';
// // // // // import {
// // // // //     GET_CART_QUERY,
// // // // //     ADD_TO_CART_MUTATION,
// // // // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // // // //     REMOVE_ITEMS_FROM_CART_MUTATION
// // // // // } from '../graphql/cart.gql'; // Adjust path if needed
// // // // // import { useAuth } from './AuthContext';

// // // // // const CartContext = createContext(null);

// // // // // export const CartProvider = ({ children }) => {
// // // // //   const [cart, setCart] = useState(null); // This is the state consumers like Navbar will use
// // // // //   const { isAuthenticated, loading: authLoading, token } = useAuth();
// // // // //   const client = useApolloClient();

// // // // //   // Fetch cart data - Keep network-only or switch back if needed
// // // // //   const { loading: cartLoading, error: cartError, data: cartData, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
// // // // //     skip: authLoading || !isAuthenticated,
// // // // //     // Consider changing fetchPolicy if 'network-only' still causes issues after state update fix
// // // // //     // fetchPolicy: 'cache-and-network', // Alternative: try this
// // // // //     fetchPolicy: 'network-only',
// // // // //     notifyOnNetworkStatusChange: true,
// // // // //     onError: (error) => {
// // // // //       console.error("Error fetching cart:", error);
// // // // //        // Basic error handling, potentially clear cart state
// // // // //        setCart(null);
// // // // //     },
// // // // //     onCompleted: (data) => {
// // // // //        console.log("Cart data received/updated via useQuery:", data);
// // // // //        setCart(data?.cart || null); // Update local state representation from query
// // // // //     }
// // // // //   });

// // // // //   // Refetch cart on auth changes (important fallback)
// // // // //   useEffect(() => {
// // // // //       if (!authLoading) {
// // // // //           if (isAuthenticated) {
// // // // //               console.log("Attempting to refetch cart due to auth change...");
// // // // //               refetchCart().catch(err => console.error("Refetch cart failed:", err));
// // // // //           } else {
// // // // //                console.log("Clearing cart state due to logout...");
// // // // //                setCart(null); // Clear local state on logout
// // // // //           }
// // // // //       }
// // // // //   }, [isAuthenticated, authLoading, token, refetchCart]);


// // // // //   // --- Add Item Mutation with Manual Cache & State Update ---
// // // // //   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
// // // // //     update(cache, { data: { addToCart } }) {
// // // // //       try {
// // // // //         const updatedCartData = addToCart?.cart; // Get the updated cart from the response
// // // // //         if (!updatedCartData) {
// // // // //             console.warn("Add to cart mutation response did not contain cart data.");
// // // // //             refetchCart(); // Fallback if response is incomplete
// // // // //             return;
// // // // //         }

// // // // //         // 1. Write the entire new cart object from the mutation response to the cache
// // // // //         cache.writeQuery({
// // // // //           query: GET_CART_QUERY,
// // // // //           data: { cart: updatedCartData }, // Overwrite cache
// // // // //         });
// // // // //         console.log("Apollo cache updated manually after adding item.");

// // // // //         // 2. *** ADDED: Update the local React state directly ***
// // // // //         setCart(updatedCartData);
// // // // //         console.log("CartContext state updated directly after adding item.");

// // // // //       } catch (e) {
// // // // //         console.error("Error updating Apollo cache/state after adding item:", e);
// // // // //         refetchCart(); // Fallback to refetch if update fails
// // // // //       }
// // // // //     },
// // // // //     onError: (error) => {
// // // // //       console.error("Error adding item to cart mutation:", error);
// // // // //       // Specific error handling/feedback should occur in the component calling addItem
// // // // //     }
// // // // //   });

// // // // //   // --- Remove Item Mutation with Manual Cache & State Update ---
// // // // //   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
// // // // //     update(cache, { data: { removeItemsFromCart } }) {
// // // // //         try {
// // // // //             const updatedCartData = removeItemsFromCart?.cart; // Get updated cart
// // // // //             if (!updatedCartData) {
// // // // //                 console.warn("Remove items mutation response did not contain cart data.");
// // // // //                 refetchCart();
// // // // //                 return;
// // // // //             }
// // // // //             // 1. Overwrite cache with the updated cart from the response
// // // // //             cache.writeQuery({
// // // // //                 query: GET_CART_QUERY,
// // // // //                 data: { cart: updatedCartData },
// // // // //             });
// // // // //             console.log("Apollo cache updated manually after removing item(s).");

// // // // //             // 2. *** ADDED: Update the local React state directly ***
// // // // //             setCart(updatedCartData);
// // // // //             console.log("CartContext state updated directly after removing item(s).");

// // // // //         } catch (e) {
// // // // //             console.error("Error updating Apollo cache/state after removing item(s):", e);
// // // // //             refetchCart(); // Fallback
// // // // //         }
// // // // //     },
// // // // //     onError: (error) => console.error("Error removing item mutation:", error)
// // // // //   });

// // // // //   // --- Update Quantities Mutation with Manual Cache & State Update ---
// // // // //   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
// // // // //      update(cache, { data: { updateItemQuantities } }) {
// // // // //         try {
// // // // //             const updatedCartData = updateItemQuantities?.cart; // Get updated cart
// // // // //             if (!updatedCartData) {
// // // // //                 console.warn("Update quantities mutation response did not contain cart data.");
// // // // //                 refetchCart();
// // // // //                 return;
// // // // //             }
// // // // //              // 1. Overwrite cache with the updated cart from the response
// // // // //             cache.writeQuery({
// // // // //                 query: GET_CART_QUERY,
// // // // //                 data: { cart: updatedCartData },
// // // // //             });
// // // // //             console.log("Apollo cache updated manually after updating quantities.");

// // // // //             // 2. *** ADDED: Update the local React state directly ***
// // // // //             setCart(updatedCartData);
// // // // //             console.log("CartContext state updated directly after updating quantity.");

// // // // //         } catch (e) {
// // // // //             console.error("Error updating Apollo cache/state after updating quantities:", e);
// // // // //             refetchCart(); // Fallback
// // // // //         }
// // // // //      },
// // // // //      onError: (error) => console.error("Error updating quantities mutation:", error)
// // // // //   });


// // // // //    // --- Wrapper functions remain the same ---
// // // // //    const addItem = (variables) => {
// // // // //        if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // //        return addItemMutation({ variables });
// // // // //    };

// // // // //   const updateItemQuantities = (items) => {
// // // // //       if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // //       return updateItemQuantitiesMutation({ variables: { items } });
// // // // //   };

// // // // //   const removeItem = (keys) => {
// // // // //       if (!isAuthenticated) return Promise.reject(new Error("User not authenticated"));
// // // // //       // Ensure keys is always an array
// // // // //       const keysArray = Array.isArray(keys) ? keys : [keys];
// // // // //       return removeItemMutation({ variables: { keys: keysArray, all: false } });
// // // // //   };
// // // // //   // --- End Wrapper functions ---


// // // // //   // --- Context Value ---
// // // // //   // Provide the cart state variable and loading/error states
// // // // //   const value = {
// // // // //     cart, // Provide the local state 'cart'
// // // // //     loading: authLoading || cartLoading, // Combine loading states
// // // // //     error: cartError, // Provide cart query error
// // // // //     refetchCart,

// // // // //     // Actions and their states
// // // // //     addItem,
// // // // //     addingItem,
// // // // //     addItemError,

// // // // //     updateItemQuantities,
// // // // //     updatingItemQuantities,
// // // // //     updateItemQuantitiesError,

// // // // //     removeItem,
// // // // //     removingItem,
// // // // //     removeItemError,
// // // // //   };

// // // // //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // // // // };

// // // // // // Custom hook remains the same
// // // // // export const useCart = () => {
// // // // //   const context = useContext(CartContext);
// // // // //    if (context === undefined) {
// // // // //       throw new Error('useCart must be used within a CartProvider.');
// // // // //    }
// // // // //    // It's okay if context is null initially or after logout
// // // // //    // Components consuming the context should handle the null case gracefully
// // // // //    // if (context === null) {
// // // // //    //     console.warn('CartContext value is null.');
// // // // //    //     return { cart: null, loading: true, error: null, /* provide defaults/stubs */ };
// // // // //    // }
// // // // //   return context;
// // // // // };

// // // // // src/context/CartContext.jsx
// // // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // // import { useQuery, useMutation } from '@apollo/client';
// // // // import {
// // // //     GET_CART_QUERY,
// // // //     ADD_TO_CART_MUTATION,
// // // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // // //     REMOVE_ITEMS_FROM_CART_MUTATION
// // // // } from '../graphql/cart.gql';
// // // // import { useAuth } from './AuthContext';

// // // // const CartContext = createContext(null);

// // // // export const CartProvider = ({ children }) => {
// // // //   const [cart, setCart] = useState(null);
// // // //   const { isAuthenticated, loading: authLoading, token } = useAuth();

// // // //   const { loading: cartLoading, error: cartError, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
// // // //     skip: authLoading || !isAuthenticated,
// // // //     fetchPolicy: 'network-only',
// // // //     onCompleted: (data) => setCart(data?.cart || null),
// // // //     onError: (error) => setCart(null)
// // // //   });

// // // //   useEffect(() => {
// // // //     if (!authLoading) {
// // // //       isAuthenticated ? refetchCart() : setCart(null);
// // // //     }
// // // //   }, [isAuthenticated, authLoading, token, refetchCart]);

// // // //   const createMutationOptions = (getCartFromResponse) => ({
// // // //     update(cache, { data }) {
// // // //       const updatedCartData = getCartFromResponse(data);
// // // //       if (updatedCartData) {
// // // //         cache.writeQuery({
// // // //           query: GET_CART_QUERY,
// // // //           data: { cart: updatedCartData },
// // // //         });
// // // //         setCart(updatedCartData);
// // // //       }
// // // //     }
// // // //   });

// // // //   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(
// // // //     ADD_TO_CART_MUTATION,
// // // //     createMutationOptions(data => data?.addToCart?.cart)
// // // //   );

// // // //   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(
// // // //     REMOVE_ITEMS_FROM_CART_MUTATION,
// // // //     createMutationOptions(data => data?.removeItemsFromCart?.cart)
// // // //   );

// // // //   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(
// // // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // // //     createMutationOptions(data => data?.updateItemQuantities?.cart)
// // // //   );

// // // //   const value = {
// // // //     cart,
// // // //     loading: authLoading || cartLoading,
// // // //     error: cartError,
// // // //     refetchCart,
// // // //     addItem: (variables) => addItemMutation({ variables }),
// // // //     addingItem,
// // // //     addItemError,
// // // //     removeItem: (keys) => removeItemMutation({ variables: { keys } }),
// // // //     removingItem,
// // // //     removeItemError,
// // // //     updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
// // // //     updatingItemQuantities,
// // // //     updateItemQuantitiesError,
// // // //   };

// // // //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // // // };

// // // // export const useCart = () => useContext(CartContext);


// // // // src/context/CartContext.jsx
// // // import React, { createContext, useState, useContext, useEffect } from 'react';
// // // import { useQuery, useMutation } from '@apollo/client';
// // // import {
// // //     GET_CART_QUERY,
// // //     ADD_TO_CART_MUTATION,
// // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // //     REMOVE_ITEMS_FROM_CART_MUTATION
// // // } from '../graphql/cart.gql';
// // // import { useAuth } from './AuthContext';

// // // const CartContext = createContext(null);

// // // export const CartProvider = ({ children }) => {
// // //   const [cart, setCart] = useState(null);
// // //   const { isAuthenticated, loading: authLoading, token } = useAuth();

// // //   const { loading: cartLoading, error: cartError, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
// // //     skip: authLoading || !isAuthenticated,
// // //     fetchPolicy: 'network-only',
// // //     onCompleted: (data) => setCart(data?.cart || null),
// // //     onError: (error) => setCart(null)
// // //   });

// // //   useEffect(() => {
// // //     if (!authLoading) {
// // //       isAuthenticated ? refetchCart() : setCart(null);
// // //     }
// // //   }, [isAuthenticated, authLoading, token, refetchCart]);

// // //   const createMutationOptions = (getCartFromResponse) => ({
// // //     update(cache, { data }) {
// // //       const updatedCartData = getCartFromResponse(data);
// // //       if (updatedCartData) {
// // //         cache.writeQuery({
// // //           query: GET_CART_QUERY,
// // //           data: { cart: updatedCartData },
// // //         });
// // //         setCart(updatedCartData);
// // //       }
// // //     }
// // //   });

// // //   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(
// // //     ADD_TO_CART_MUTATION,
// // //     createMutationOptions(data => data?.addToCart?.cart)
// // //   );

// // //   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(
// // //     REMOVE_ITEMS_FROM_CART_MUTATION,
// // //     createMutationOptions(data => data?.removeItemsFromCart?.cart)
// // //   );

// // //   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(
// // //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// // //     createMutationOptions(data => data?.updateItemQuantities?.cart)
// // //   );

// // //   const value = {
// // //     cart,
// // //     loading: authLoading || cartLoading,
// // //     error: cartError,
// // //     refetchCart,
// // //     addItem: (variables) => addItemMutation({ variables }),
// // //     addingItem,
// // //     addItemError,
// // //     removeItem: (keys) => removeItemMutation({ variables: { keys } }),
// // //     removingItem,
// // //     removeItemError,
// // //     updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
// // //     updatingItemQuantities,
// // //     updateItemQuantitiesError,
// // //   };

// // //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // // };

// // // export const useCart = () => useContext(CartContext);

// // // src/context/CartContext.jsx
// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import { useQuery, useMutation } from '@apollo/client';
// // import {
// //     GET_CART_QUERY,
// //     ADD_TO_CART_MUTATION,
// //     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
// //     REMOVE_ITEMS_FROM_CART_MUTATION
// // } from '../graphql/cart.gql';
// // import { useAuth } from './AuthContext';

// // const CartContext = createContext(null);

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState(null);
// //   const { isAuthenticated, loading: authLoading, token } = useAuth();

// //   const { loading: cartLoading, error: cartError, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
// //     skip: authLoading || !isAuthenticated,
// //     fetchPolicy: 'network-only',
// //     notifyOnNetworkStatusChange: true,
// //     onCompleted: (data) => {
// //       console.log("Cart state updated via GET_CART_QUERY:", data);
// //       setCart(data?.cart || null);
// //     },
// //     onError: (error) => {
// //       console.error("Error fetching cart:", error);
// //       setCart(null);
// //     }
// //   });

// //   useEffect(() => {
// //     if (!authLoading) {
// //       if (isAuthenticated) {
// //         refetchCart();
// //       } else {
// //         setCart(null);
// //       }
// //     }
// //   }, [isAuthenticated, authLoading, token, refetchCart]);
  
// //   // This function will be called on completion of any cart mutation.
// //   // It triggers a refetch after a short delay to avoid server-side race conditions.
// //   const onMutationCompleted = () => {
// //     setTimeout(() => {
// //       console.log("Mutation completed. Refetching cart after delay.");
// //       refetchCart();
// //     }, 150); // 150ms delay
// //   };

// //   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
// //     onCompleted: onMutationCompleted,
// //     onError: (error) => console.error("Error adding item:", error)
// //   });

// //   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
// //     onCompleted: onMutationCompleted,
// //     onError: (error) => console.error("Error removing item:", error)
// //   });

// //   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
// //     onCompleted: onMutationCompleted,
// //     onError: (error) => console.error("Error updating quantity:", error)
// //   });

// //   const value = {
// //     cart,
// //     loading: authLoading || cartLoading,
// //     error: cartError,
// //     addItem: (variables) => addItemMutation({ variables }),
// //     addingItem,
// //     addItemError,
// //     removeItem: (key) => removeItemMutation({ variables: { keys: [key] } }),
// //     removingItem,
// //     removeItemError,
// //     updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
// //     updatingItemQuantities,
// //     updateItemQuantitiesError,
// //   };

// //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // };

// // export const useCart = () => useContext(CartContext);

// // src/context/CartContext.jsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import {
//     GET_CART_QUERY,
//     ADD_TO_CART_MUTATION,
//     UPDATE_CART_ITEM_QUANTITIES_MUTATION,
//     REMOVE_ITEMS_FROM_CART_MUTATION,
//     APPLY_COUPON_MUTATION,
//     REMOVE_COUPONS_MUTATION
// } from '../graphql/cart.gql.js';
// import { useAuth } from './AuthContext';

// const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(null);
//   const { isAuthenticated, loading: authLoading, token } = useAuth();

//   const { loading: cartLoading, error: cartError, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
//     skip: authLoading || !isAuthenticated,
//     fetchPolicy: 'network-only',
//     notifyOnNetworkStatusChange: true,
//     onCompleted: (data) => {
//       setCart(data?.cart || null);
//     },
//     onError: (error) => {
//       console.error("Error fetching cart:", error);
//       setCart(null);
//     }
//   });

//   useEffect(() => {
//     if (!authLoading) {
//       if (isAuthenticated) {
//         refetchCart();
//       } else {
//         setCart(null);
//       }
//     }
//   }, [isAuthenticated, authLoading, token, refetchCart]);
  
//   // This function triggers a refetch after any cart mutation to ensure data is fresh.
//   const onMutationCompleted = () => {
//     setTimeout(() => {
//       refetchCart();
//     }, 150);
//   };

//   const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
//     onCompleted: onMutationCompleted,
//     onError: (error) => console.error("Error adding item:", error)
//   });

//   const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
//     onCompleted: onMutationCompleted,
//     onError: (error) => console.error("Error removing item:", error)
//   });

//   const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
//     onCompleted: onMutationCompleted,
//     onError: (error) => console.error("Error updating quantity:", error)
//   });

//   // --- NEW: Mutations for Coupons ---
//   const [applyCouponMutation, { loading: applyingCoupon, error: applyCouponError }] = useMutation(APPLY_COUPON_MUTATION, {
//       onCompleted: onMutationCompleted,
//       // We also want to re-throw the error so the component can catch it for specific feedback
//       onError: (error) => {
//         console.error("Error applying coupon:", error);
//         throw new Error(error.message);
//       }
//   });
  
//   const [removeCouponsMutation, { loading: removingCoupon, error: removeCouponError }] = useMutation(REMOVE_COUPONS_MUTATION, {
//       onCompleted: onMutationCompleted,
//       onError: (error) => {
//         console.error("Error removing coupon:", error);
//         throw new Error(error.message);
//       }
//   });


//   const value = {
//     cart,
//     loading: authLoading || cartLoading,
//     error: cartError,
//     // Item actions
//     addItem: (variables) => addItemMutation({ variables }),
//     addingItem,
//     addItemError,
//     removeItem: (key) => removeItemMutation({ variables: { keys: [key] } }),
//     removingItem,
//     removeItemError,
//     updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
//     updatingItemQuantities,
//     updateItemQuantitiesError,
//     // Coupon actions
//     applyCoupon: (couponCode) => applyCouponMutation({ variables: { code: couponCode } }),
//     applyingCoupon,
//     applyCouponError,
//     removeCoupon: (couponCode) => removeCouponsMutation({ variables: { codes: [couponCode] } }),
//     removingCoupon,
//     removeCouponError,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => useContext(CartContext);

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

  const { loading: cartLoading, error: cartError, refetch: refetchCart } = useQuery(GET_CART_QUERY, {
    skip: authLoading || !isAuthenticated,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setCart(data?.cart || null);
    },
    onError: (error) => {
      console.error("Error fetching cart:", error);
      setCart(null);
    }
  });

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        refetchCart();
      } else {
        setCart(null);
      }
    }
  }, [isAuthenticated, authLoading, token, refetchCart]);
  
  const onMutationCompleted = () => {
    setTimeout(() => {
      refetchCart();
    }, 150);
  };

  const [addItemMutation, { loading: addingItem, error: addItemError }] = useMutation(ADD_TO_CART_MUTATION, {
    onCompleted: onMutationCompleted,
    onError: (error) => console.error("Error adding item:", error)
  });

  const [removeItemMutation, { loading: removingItem, error: removeItemError }] = useMutation(REMOVE_ITEMS_FROM_CART_MUTATION, {
    onCompleted: onMutationCompleted,
    onError: (error) => console.error("Error removing item:", error)
  });

  const [updateItemQuantitiesMutation, { loading: updatingItemQuantities, error: updateItemQuantitiesError }] = useMutation(UPDATE_CART_ITEM_QUANTITIES_MUTATION, {
    onCompleted: onMutationCompleted,
    onError: (error) => console.error("Error updating quantity:", error)
  });

  const [applyCouponMutation, { loading: applyingCoupon, error: applyCouponError }] = useMutation(APPLY_COUPON_MUTATION, {
      onCompleted: onMutationCompleted,
      onError: (error) => {
        console.error("Error applying coupon:", error);
        throw new Error(error.message);
      }
  });
  
  const [removeCouponsMutation, { loading: removingCoupon, error: removeCouponError }] = useMutation(REMOVE_COUPONS_MUTATION, {
      onCompleted: onMutationCompleted,
      onError: (error) => {
        console.error("Error removing coupon:", error);
        throw new Error(error.message);
      }
  });

  // --- ADD THIS FUNCTION ---
  const clearCart = () => {
    // This is a client-side clearing of the cart after a successful checkout.
    // The next time GET_CART_QUERY runs, it will fetch the new, empty cart from the server.
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
    loading: authLoading || cartLoading,
    error: cartError,
    // Item actions
    addItem: (variables) => addItemMutation({ variables }),
    addingItem,
    addItemError,
    removeItem: (key) => removeItemMutation({ variables: { keys: [key] } }),
    removingItem,
    removeItemError,
    updateItemQuantities: (items) => updateItemQuantitiesMutation({ variables: { items } }),
    updatingItemQuantities,
    updateItemQuantitiesError,
    // Coupon actions
    applyCoupon: (couponCode) => applyCouponMutation({ variables: { code: couponCode } }),
    applyingCoupon,
    applyCouponError,
    removeCoupon: (couponCode) => removeCouponsMutation({ variables: { codes: [couponCode] } }),
    removingCoupon,
    removeCouponError,
    // --- EXPORT THE NEW FUNCTION ---
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);