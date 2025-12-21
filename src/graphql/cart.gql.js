// src/graphql/cart.gql.js
import { gql } from '@apollo/client';

// Define fragments for reusable data structures
// FIXED: Use inline fragments for specific cart item types
export const CART_ITEM_FRAGMENT = gql`
  fragment CartItemFragment on CartItem {
    __typename
    key
    quantity
    total(format: FORMATTED)
    subtotal(format: FORMATTED)
    product {
      node {
        __typename
        id
        databaseId
        name
        sku
        slug
        ... on SimpleProduct {
          price(format: RAW)
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
      }
    }
    variation {
      node {
        __typename
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
            label
            value
          }
        }
      }
    }
  }
`;

export const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    __typename
    contents {
      __typename
      itemCount
      productCount
      nodes {
        __typename
        # All cart items are SimpleCartItem type, regardless of product type
        ... on SimpleCartItem {
          key
          quantity
          total(format: FORMATTED)
          subtotal(format: FORMATTED)
          product {
            node {
              __typename
              id
              databaseId
              name
              sku
              slug
              ... on SimpleProduct {
                price(format: RAW)
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
            }
          }
          variation {
            node {
              __typename
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
                  label
                  value
                }
              }
            }
          }
        }
      }
    }
    appliedCoupons {
      __typename
      code
      discountAmount(format: FORMATTED)
    }
    subtotal(format: FORMATTED)
    total(format: FORMATTED)
    shippingTotal(format: FORMATTED)
    needsShippingAddress
    isEmpty
  }
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
        ...CartFragment
      }
      cartItem {
        __typename
        ... on SimpleCartItem {
          key
          quantity
          total(format: FORMATTED)
        }
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Query to get the current cart
export const GET_CART_QUERY = gql`
  query GetCart {
    cart {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
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
      cartItems {
        key
        __typename
      }
    }
  }
  ${CART_FRAGMENT}
`;

// Mutation to update quantities
export const UPDATE_CART_ITEM_QUANTITIES_MUTATION = gql`
  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]!) {
    updateItemQuantities(input: {
      clientMutationId: "updateCartItemQuantities",
      items: $items
    }) {
      cart {
        ...CartFragment
      }
      items {
        __typename
        ... on SimpleCartItem {
          key
          quantity
          total(format: FORMATTED)
        }
      }
    }
  }
  ${CART_FRAGMENT}
`;

// ApplyCoupon Mutation
export const APPLY_COUPON_MUTATION = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code, clientMutationId: "applyCoupon" }) {
      cart {
        ...CartFragment
      }
      applied {
        __typename
        code
      }
    }
  }
  ${CART_FRAGMENT}
`;

// RemoveCoupon Mutation
// export const REMOVE_COUPONS_MUTATION = gql`
//   mutation RemoveCoupons($codes: [String]) {
//     removeCoupons(input: { codes: $codes, clientMutationId: "removeCoupons" }) {
//       cart {
//         ...CartFragment
//       }
//       removed {
//         __typename
//         code
//       }
//     }
//   }
//   ${CART_FRAGMENT}
// `;

export const REMOVE_COUPONS_MUTATION = gql`
  mutation RemoveCoupons($codes: [String]) {
    removeCoupons(input: { codes: $codes, clientMutationId: "removeCoupons" }) {
      cart {
        ...CartFragment
      }
    }
  }
  ${CART_FRAGMENT}
`;