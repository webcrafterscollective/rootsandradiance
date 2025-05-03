// src/graphql/cart.gql.js
import { gql } from '@apollo/client';

// Define fragments for reusable data structures
export const CART_ITEM_FRAGMENT = gql`
  fragment CartItemFragment on CartItem {
    __typename # Explicitly add typename
    key        # Explicitly list key again
    quantity
    total(format: FORMATTED) # Get formatted total for display
    subtotal(format: FORMATTED) # Get formatted subtotal for display
    product {
      node {
        __typename # Also add here for debugging product type
        id
        databaseId
        name
        sku
        slug # Added slug for linking
        ... on SimpleProduct {
          price(format: RAW) # Use RAW for calculations if needed
          regularPrice(format: RAW)
          salePrice(format: RAW)
           image {
             id
             sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
             altText
          }
        }
        ... on VariableProduct {
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
           image {
             id
             sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
             altText
          }
        }
        # Add other product fields if needed
      }
    }
    variation {
       node {
          __typename # Also add here for debugging variation type
          id
          databaseId
          name
          price(format: RAW)
          regularPrice(format: RAW)
          salePrice(format: RAW)
           image {
             id
             sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
             altText
          }
          attributes {
            nodes {
               id
               name
               value # Attribute value (e.g., 'Red', 'Large')
               # label # Attribute label (e.g., 'Color', 'Size')
            }
          }
       }
    }
    # Add other cart item fields if necessary
  }
`;

export const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    __typename # Explicitly add typename
    contents {
      __typename # Explicitly add typename
      itemCount
      productCount
      nodes {
        ...CartItemFragment # Apply the modified fragment
      }
    }
    appliedCoupons {
       __typename # Explicitly add typename
       code
       discountAmount(format: FORMATTED)
    }
    subtotal(format: FORMATTED)
    total(format: FORMATTED)
    shippingTotal(format: FORMATTED)
    needsShippingAddress
    isEmpty
  }
  ${CART_ITEM_FRAGMENT} # Include the fragment definition
`;


// Mutation to add item
export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: Int!, $quantity: Int!) {
    addToCart(input: {
      clientMutationId: "addToCart",
      productId: $productId,
      quantity: $quantity
    }) {
      cart {
        ...CartFragment # Reuse the cart fragment
      }
      cartItem {
         ...CartItemFragment # Get details of the added/updated item
      }
    }
  }
  ${CART_FRAGMENT}
  ${CART_ITEM_FRAGMENT}
`;

// Query to get the current cart
export const GET_CART_QUERY = gql`
  query GetCart {
    cart {
       ...CartFragment # Apply the modified fragment
    }
  }
  ${CART_FRAGMENT} # Include fragment definitions
`;

// Mutation to remove item
export const REMOVE_ITEMS_FROM_CART_MUTATION = gql`
  mutation RemoveItemsFromCart($keys: [ID!]!, $all: Boolean = false) {
    removeItemsFromCart(input: {
      clientMutationId: "removeItemsFromCart",
      keys: $keys,
      all: $all
    }) {
      cart {
        ...CartFragment
      }
      cartItems { # Items that were removed
          key
          __typename # Add typename
      }
    }
  }
   ${CART_FRAGMENT}
`;

// Mutation to update quantities
export const UPDATE_CART_ITEM_QUANTITIES_MUTATION = gql`
  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]!) {
     updateItemQuantities(input: {
         clientMutationId:"updateCartItemQuantities",
         items: $items
     }) {
         cart {
            ...CartFragment
         }
         items { # Items that were updated
             ...CartItemFragment
         }
     }
  }
  ${CART_FRAGMENT}
  ${CART_ITEM_FRAGMENT}
`;

// Example: ApplyCoupon Mutation
export const APPLY_COUPON_MUTATION = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code, clientMutationId: "applyCoupon" }) {
      cart {
        ...CartFragment
      }
      applied {
        __typename # Add typename
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Example: RemoveCoupon Mutation
export const REMOVE_COUPONS_MUTATION = gql`
  mutation RemoveCoupons($codes: [String]) {
    removeCoupons(input: { codes: $codes, clientMutationId: "removeCoupons" }) {
       cart {
        ...CartFragment
      }
      removed {
         __typename # Add typename
         code
      }
    }
  }
   ${CART_FRAGMENT}
`;