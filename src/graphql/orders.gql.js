import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation Checkout(
    $billingData: CustomerAddressInput!
    $shippingData: CustomerAddressInput!
    $paymentMethod: String! 
  ) {
    checkout(
      input: {
        billing: $billingData
        shipping: $shippingData
        paymentMethod: $paymentMethod 
      }
    ) {
      clientMutationId
      order {
        databaseId
        orderNumber
        total
      }
      result
      redirect
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders {
    customer {
      orders(first: 100) {
        nodes {
          id
          databaseId
          orderNumber
          date
          status
          total(format: FORMATTED)
          lineItems {
            nodes {
              quantity
              product {
                node {
                  id
                  name
                  image {
                    sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;