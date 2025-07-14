import { gql } from '@apollo/client';

export const INITIATE_PHONEPE_PAYMENT_MUTATION = gql`
  mutation InitiatePhonePePayment($orderId: Int!) {
    initiatePhonePePayment(input: { orderId: $orderId }) {
      success
      redirectUrl
      message
      merchantOrderId
    }
  }
`;