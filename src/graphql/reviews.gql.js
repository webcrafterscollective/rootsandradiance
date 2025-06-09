// // // // // // // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // // // // // // Fragment for common review fields
// // // // // // // // // // // // // export const REVIEW_FRAGMENT = gql`
// // // // // // // // // // // // //   fragment ReviewFragment on Comment {
// // // // // // // // // // // // //     id
// // // // // // // // // // // // //     databaseId
// // // // // // // // // // // // //     content(format: RENDERED) # Get rendered HTML for content
// // // // // // // // // // // // //     date
// // // // // // // // // // // // //     author {
// // // // // // // // // // // // //       node {
// // // // // // // // // // // // //         name
// // // // // // // // // // // // //         avatar {
// // // // // // // // // // // // //            url
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     ... on ProductReview { # Specific to WooCommerce product reviews if using WooGraphQL
// // // // // // // // // // // // //       rating
// // // // // // // // // // // // //       approved
// // // // // // // // // // // // //       # typeName # Good for debugging
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     # If not using WooGraphQL's ProductReview type, rating might be comment meta.
// // // // // // // // // // // // //     # This part is highly dependent on your specific GraphQL schema for reviews.
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // `;

// // // // // // // // // // // // // // Query to get reviews for a specific product
// // // // // // // // // // // // // // This query assumes reviews are available as a connection on the Product type.
// // // // // // // // // // // // // // Adjust the query based on how your WPGraphQL + WooGraphQL setup exposes reviews.
// // // // // // // // // // // // // export const GET_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // // // // // // //   query GetProductReviews(
// // // // // // // // // // // // //     $productId: ID! # This should be the GraphQL Global ID of the Product
// // // // // // // // // // // // //     $first: Int = 5
// // // // // // // // // // // // //     $after: String
// // // // // // // // // // // // //   ) {
// // // // // // // // // // // // //     product(id: $productId) {
// // // // // // // // // // // // //       id
// // // // // // // // // // // // //       databaseId
// // // // // // // // // // // // //       name
// // // // // // // // // // // // //       reviewCount
// // // // // // // // // // // // //       averageRating
// // // // // // // // // // // // //       reviews(first: $first, after: $after, where: { typeIn: [REVIEW] }) { # WooGraphQL typically uses 'REVIEW' for typeIn
// // // // // // // // // // // // //         nodes {
// // // // // // // // // // // // //           ...ReviewFragment
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         pageInfo {
// // // // // // // // // // // // //           hasNextPage
// // // // // // // // // // // // //           endCursor
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
// // // // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // // // `;

// // // // // // // // // // // // // // Mutation to create a new review (comment)
// // // // // // // // // // // // // // IMPORTANT: This is a generic 'createComment' mutation.
// // // // // // // // // // // // // // You MUST verify if your WooGraphQL setup provides a more specific 'createProductReview' or 'writeReview' mutation
// // // // // // // // // // // // // // that properly handles associating the review with a product AND saving the star rating.
// // // // // // // // // // // // // // If not, the 'metaData' part below is a common pattern but might need backend customization to work.
// // // // // // // // // // // // // export const CREATE_REVIEW_MUTATION = gql`
// // // // // // // // // // // // //   mutation CreateReview(
// // // // // // // // // // // // //     $author: String
// // // // // // // // // // // // //     $authorEmail: String # Required if user is not logged in and your WordPress settings require it
// // // // // // // // // // // // //     $commentOn: Int!     # The WordPress databaseId (Post ID) of the product
// // // // // // // // // // // // //     $content: String!
// // // // // // // // // // // // //     $rating: Int!        # The star rating
// // // // // // // // // // // // //     # $parentId: ID      # For replies to reviews, if supported/needed
// // // // // // // // // // // // //     # $clientMutationId: String # Usually good practice
// // // // // // // // // // // // //   ) {
// // // // // // // // // // // // //     createComment(
// // // // // // // // // // // // //       input: {
// // // // // // // // // // // // //         clientMutationId: "createReview_${Date.now()}" # Make it unique
// // // // // // // // // // // // //         author: $author
// // // // // // // // // // // // //         authorEmail: $authorEmail
// // // // // // // // // // // // //         commentOn: $commentOn
// // // // // // // // // // // // //         content: $content
// // // // // // // // // // // // //         # --- How rating is passed depends on your GraphQL server setup ---
// // // // // // // // // // // // //         # Option 1: If your 'createComment' is extended or WooGraphQL handles it via metaData
// // // // // // // // // // // // //         metaData: [
// // // // // // // // // // // // //           { key: "rating", value: $rating }
// // // // // // // // // // // // //         ]
// // // // // // // // // // // // //         # Option 2: If your mutation has a direct 'rating' input field
// // // // // // // // // // // // //         # rating: $rating
// // // // // // // // // // // // //         # Option 3: If it's a specific 'createProductReview' mutation, it might have a dedicated rating field.
// // // // // // // // // // // // //         # type: "review" # Some mutations might allow/require setting the comment type
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     ) {
// // // // // // // // // // // // //       success
// // // // // // // // // // // // //       comment {
// // // // // // // // // // // // //         ...ReviewFragment
// // // // // // // // // // // // //         # If the mutation creates a specific ProductReview type that's different from Comment:
// // // // // // // // // // // // //         # ... on ProductReview {
// // // // // // // // // // // // //         #   rating # Explicitly query rating again if needed
// // // // // // // // // // // // //         # }
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }
// // // // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // // // `;

// // // // // // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // // // // // Fragment for common review fields
// // // // // // // // // // // // export const REVIEW_FRAGMENT = gql`
// // // // // // // // // // // //   fragment ReviewFragment on Comment {
// // // // // // // // // // // //     id
// // // // // // // // // // // //     databaseId
// // // // // // // // // // // //     content(format: RENDERED) # Get rendered HTML for content
// // // // // // // // // // // //     date
// // // // // // // // // // // //     author {
// // // // // // // // // // // //       node {
// // // // // // // // // // // //         name
// // // // // // // // // // // //         avatar {
// // // // // // // // // // // //            url
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //     # Assuming WooGraphQL adds 'rating' directly to Comment type for product reviews
// // // // // // // // // // // //     # If 'rating' is not a direct field, you might need to query it from metaData
// // // // // // // // // // // //     # e.g., metaData(keys: ["rating"]) { nodes { key value } } - but this is schema-dependent
// // // // // // // // // // // //     rating # Attempt to query rating directly
// // // // // // // // // // // //     approved
// // // // // // // // // // // //     # typeName # Good for debugging to see the actual GraphQL type
// // // // // // // // // // // //   }
// // // // // // // // // // // // `;

// // // // // // // // // // // // // Query to get reviews for a specific product
// // // // // // // // // // // // // This query assumes 'reviews' connection on Product type is provided by WooGraphQL
// // // // // // // // // // // // // and it by default returns product reviews.
// // // // // // // // // // // // export const GET_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // // // // // //   query GetProductReviews(
// // // // // // // // // // // //     $productId: ID! # This should be the GraphQL Global ID of the Product
// // // // // // // // // // // //     $first: Int = 5
// // // // // // // // // // // //     $after: String
// // // // // // // // // // // //   ) {
// // // // // // // // // // // //     product(id: $productId) {
// // // // // // // // // // // //       id
// // // // // // // // // // // //       databaseId
// // // // // // // // // // // //       name
// // // // // // // // // // // //       reviewCount
// // // // // // // // // // // //       averageRating
// // // // // // // // // // // //       reviews(first: $first, after: $after) { # Removed the 'where' clause that caused the error
// // // // // // // // // // // //                                             # If you need to filter by status (e.g., approved),
// // // // // // // // // // // //                                             # check your schema for available args on 'reviews.where'.
// // // // // // // // // // // //                                             # Example: where: { status: "APPROVED" } if supported
// // // // // // // // // // // //         nodes {
// // // // // // // // // // // //           ...ReviewFragment
// // // // // // // // // // // //         }
// // // // // // // // // // // //         pageInfo {
// // // // // // // // // // // //           hasNextPage
// // // // // // // // // // // //           endCursor
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
// // // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // // `;

// // // // // // // // // // // // // Mutation to create a new review (comment)
// // // // // // // // // // // // // IMPORTANT: This is a generic 'createComment' mutation.
// // // // // // // // // // // // // You MUST verify if your WooGraphQL setup provides a more specific 'createProductReview' or 'writeReview' mutation
// // // // // // // // // // // // // that properly handles associating the review with a product AND saving the star rating.
// // // // // // // // // // // // // The 'metaData' part is a common pattern but might need backend customization to work if 'rating' isn't a direct input.
// // // // // // // // // // // // export const CREATE_REVIEW_MUTATION = gql`
// // // // // // // // // // // //   mutation CreateReview(
// // // // // // // // // // // //     $author: String
// // // // // // // // // // // //     $authorEmail: String
// // // // // // // // // // // //     $commentOn: Int!     # The WordPress databaseId (Post ID) of the product
// // // // // // // // // // // //     $content: String!
// // // // // // // // // // // //     $rating: Int!
// // // // // // // // // // // //   ) {
// // // // // // // // // // // //     createComment(
// // // // // // // // // // // //       input: {
// // // // // // // // // // // //         clientMutationId: "createReview_${Date.now()}"
// // // // // // // // // // // //         author: $author
// // // // // // // // // // // //         authorEmail: $authorEmail
// // // // // // // // // // // //         commentOn: $commentOn
// // // // // // // // // // // //         content: $content
// // // // // // // // // // // //         # This 'metaData' input for rating is an assumption.
// // // // // // // // // // // //         # Your backend's 'createComment' mutation (or a specific review mutation)
// // // // // // // // // // // //         # needs to be configured to accept and process this to save the rating.
// // // // // // // // // // // //         # If your mutation directly accepts 'rating', use that instead.
// // // // // // // // // // // //         metaData: [
// // // // // // // // // // // //           { key: "rating", value: $rating }
// // // // // // // // // // // //         ]
// // // // // // // // // // // //         # It's also possible your WooGraphQL provides a specific 'type' input for comments, e.g., type: "REVIEW"
// // // // // // // // // // // //       }
// // // // // // // // // // // //     ) {
// // // // // // // // // // // //       success
// // // // // // // // // // // //       comment {
// // // // // // // // // // // //         ...ReviewFragment
// // // // // // // // // // // //         # Query 'rating' again directly here if it's part of the Comment type in the response
// // // // // // // // // // // //         rating
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
// // // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // // `;

// // // // // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // // // // Fragment for common review fields
// // // // // // // // // // // export const REVIEW_FRAGMENT = gql`
// // // // // // // // // // //   fragment ReviewFragment on Comment {
// // // // // // // // // // //     id
// // // // // // // // // // //     databaseId
// // // // // // // // // // //     content(format: RENDERED)
// // // // // // // // // // //     date
// // // // // // // // // // //     author {
// // // // // // // // // // //       node {
// // // // // // // // // // //         name
// // // // // // // // // // //         avatar {
// // // // // // // // // // //            url
// // // // // // // // // // //         }
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //     approved
// // // // // // // // // // //     # Query comment metadata to find the rating
// // // // // // // // // // //     # The exact field name ('metaData' or 'commentMeta') and structure can vary.
// // // // // // // // // // //     # This is a common pattern:
// // // // // // // // // // //     commentMeta { # Or potentially just 'metaData' - CHECK YOUR SCHEMA
// // // // // // // // // // //       nodes {
// // // // // // // // // // //         key
// // // // // // // // // // //         value
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //     # typeName # Helpful for debugging to confirm the type
// // // // // // // // // // //   }
// // // // // // // // // // // `;

// // // // // // // // // // // // Query to get reviews for a specific product
// // // // // // // // // // // export const GET_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // // // // //   query GetProductReviews(
// // // // // // // // // // //     $productId: ID!
// // // // // // // // // // //     $first: Int = 5
// // // // // // // // // // //     $after: String
// // // // // // // // // // //   ) {
// // // // // // // // // // //     product(id: $productId) {
// // // // // // // // // // //       id
// // // // // // // // // // //       databaseId
// // // // // // // // // // //       name
// // // // // // // // // // //       reviewCount
// // // // // // // // // // //       averageRating # This usually comes directly from the product, pre-calculated
// // // // // // // // // // //       reviews(first: $first, after: $after) {
// // // // // // // // // // //         nodes {
// // // // // // // // // // //           ...ReviewFragment
// // // // // // // // // // //         }
// // // // // // // // // // //         pageInfo {
// // // // // // // // // // //           hasNextPage
// // // // // // // // // // //           endCursor
// // // // // // // // // // //         }
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   }
// // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // `;

// // // // // // // // // // // // Mutation to create a new review
// // // // // // // // // // // // This mutation structure (passing rating via metaData) is more likely to work
// // // // // // // // // // // // if 'rating' isn't a direct field on Comment.
// // // // // // // // // // // export const CREATE_REVIEW_MUTATION = gql`
// // // // // // // // // // //   mutation CreateReview(
// // // // // // // // // // //     $author: String
// // // // // // // // // // //     $authorEmail: String
// // // // // // // // // // //     $commentOn: Int!
// // // // // // // // // // //     $content: String!
// // // // // // // // // // //     $rating: Int!
// // // // // // // // // // //   ) {
// // // // // // // // // // //     createComment(
// // // // // // // // // // //       input: {
// // // // // // // // // // //         clientMutationId: "createReview_${Date.now()}"
// // // // // // // // // // //         author: $author
// // // // // // // // // // //         authorEmail: $authorEmail
// // // // // // // // // // //         commentOn: $commentOn # Product's WordPress databaseId
// // // // // // // // // // //         content: $content
// // // // // // // // // // //         metaData: [ # Ensure your backend mutation processes this
// // // // // // // // // // //           { key: "rating", value: $rating } 
// // // // // // // // // // //           # WooCommerce might use "rating_score" or just "rating" for the key.
// // // // // // // // // // //         ]
// // // // // // // // // // //       }
// // // // // // // // // // //     ) {
// // // // // // // // // // //       success
// // // // // // // // // // //       comment {
// // // // // // // // // // //         ...ReviewFragment
// // // // // // // // // // //         # After mutation, the new comment (including its metaData) is returned.
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   }
// // // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // // `;

// // // // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // // // Fragment for common review fields
// // // // // // // // // // export const REVIEW_FRAGMENT = gql`
// // // // // // // // // //   fragment ReviewFragment on Comment {
// // // // // // // // // //     id
// // // // // // // // // //     databaseId
// // // // // // // // // //     content(format: RENDERED) # Get rendered HTML for content
// // // // // // // // // //     date
// // // // // // // // // //     author {
// // // // // // // // // //       node {
// // // // // // // // // //         name
// // // // // // // // // //         # If using an avatar plugin that exposes it via GraphQL:
// // // // // // // // // //         avatar(size: 96) { # Request a specific size
// // // // // // // // // //            url
// // // // // // // // // //         }
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //     approved # Useful to know if the comment is live
// // // // // // // // // //     # Attempt to query comment metadata to find the rating.
// // // // // // // // // //     # COMMON PATTERN 1: A 'commentMeta' or 'metaData' connection.
// // // // // // // // // //     # Replace 'commentMeta' with the actual field name from your schema.
// // // // // // // // // //     commentMeta {
// // // // // // // // // //       nodes {
// // // // // // // // // //         key
// // // // // // // // // //         value
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //     # COMMON PATTERN 2: Some schemas might allow querying a single meta value directly.
// // // // // // // // // //     # Example (check if your schema supports this):
// // // // // // // // // //     # ratingMeta: metaValue(key: "rating")

// // // // // // // // // //     # typeName # Helpful for debugging to confirm the GraphQL type of the review object
// // // // // // // // // //   }
// // // // // // // // // // `;

// // // // // // // // // // // Query to get reviews for a specific product
// // // // // // // // // // export const GET_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // // // //   query GetProductReviews(
// // // // // // // // // //     $productId: ID! # This should be the GraphQL Global ID of the Product
// // // // // // // // // //     $first: Int = 5
// // // // // // // // // //     $after: String
// // // // // // // // // //   ) {
// // // // // // // // // //     product(id: $productId) {
// // // // // // // // // //       id
// // // // // // // // // //       databaseId
// // // // // // // // // //       name
// // // // // // // // // //       reviewCount # This usually comes directly from the product
// // // // // // // // // //       averageRating # This also usually comes directly from the product
// // // // // // // // // //       reviews(first: $first, after: $after) { # Assumes 'reviews' connection is pre-filtered for product reviews
// // // // // // // // // //         nodes {
// // // // // // // // // //           ...ReviewFragment
// // // // // // // // // //         }
// // // // // // // // // //         pageInfo {
// // // // // // // // // //           hasNextPage
// // // // // // // // // //           endCursor
// // // // // // // // // //         }
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   }
// // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // `;

// // // // // // // // // // // Mutation to create a new review (comment)
// // // // // // // // // // export const CREATE_REVIEW_MUTATION = gql`
// // // // // // // // // //   mutation CreateReview(
// // // // // // // // // //     $author: String
// // // // // // // // // //     $authorEmail: String # Required if user is not logged in and WordPress settings demand it
// // // // // // // // // //     $commentOn: Int!     # The WordPress databaseId (Post ID) of the product
// // // // // // // // // //     $content: String!
// // // // // // // // // //     $rating: Int!        # The star rating
// // // // // // // // // //   ) {
// // // // // // // // // //     createComment(
// // // // // // // // // //       input: {
// // // // // // // // // //         clientMutationId: "createReview_${Date.now()}" # Unique ID for the mutation
// // // // // // // // // //         author: $author
// // // // // // // // // //         authorEmail: $authorEmail
// // // // // // // // // //         commentOn: $commentOn
// // // // // // // // // //         content: $content
// // // // // // // // // //         # Ensure your backend's 'createComment' mutation (or a specific review mutation from WooGraphQL)
// // // // // // // // // //         # is configured to accept 'metaData' input and correctly save the rating.
// // // // // // // // // //         # The 'key' ("rating") must match what WooCommerce expects.
// // // // // // // // // //         metaData: [
// // // // // // // // // //           { key: "rating", value: $rating }
// // // // // // // // // //         ]
// // // // // // // // // //         # If your GraphQL schema requires specifying the comment type for reviews:
// // // // // // // // // //         # type: "review"
// // // // // // // // // //       }
// // // // // // // // // //     ) {
// // // // // // // // // //       success # Indicates if the mutation was processed by the server
// // // // // // // // // //       comment {
// // // // // // // // // //         ...ReviewFragment # Get the full new comment back, including its metadata
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   }
// // // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // // `;

// // // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // // Fragment for common review fields
// // // // // // // // // export const REVIEW_FRAGMENT = gql`
// // // // // // // // //   fragment ReviewFragment on Comment {
// // // // // // // // //     id
// // // // // // // // //     databaseId
// // // // // // // // //     content(format: RENDERED)
// // // // // // // // //     date
// // // // // // // // //     author {
// // // // // // // // //       node { # This node is typically of type Commenter
// // // // // // // // //         name
// // // // // // // // //         avatar { # Removed 'size' argument
// // // // // // // // //            url
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //     approved
// // // // // // // // //     # Attempting to query 'rating' directly on the Comment type again.
// // // // // // // // //     # If WooGraphQL is active, it often adds this field for review-type comments.
// // // // // // // // //     # If this fails again, you MUST inspect your schema to see how rating is exposed.
// // // // // // // // //     rating
// // // // // // // // //     # typeName # Uncomment for debugging to see the actual GraphQL type of these nodes
// // // // // // // // //   }
// // // // // // // // // `;

// // // // // // // // // // Query to get reviews for a specific product
// // // // // // // // // export const GET_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // // //   query GetProductReviews(
// // // // // // // // //     $productId: ID!
// // // // // // // // //     $first: Int = 5
// // // // // // // // //     $after: String
// // // // // // // // //   ) {
// // // // // // // // //     product(id: $productId) {
// // // // // // // // //       id
// // // // // // // // //       databaseId
// // // // // // // // //       name
// // // // // // // // //       reviewCount   # Usually pre-calculated on the Product
// // // // // // // // //       averageRating # Usually pre-calculated on the Product
// // // // // // // // //       reviews(first: $first, after: $after) { # This connection should return review-type comments
// // // // // // // // //         nodes {
// // // // // // // // //           ...ReviewFragment
// // // // // // // // //         }
// // // // // // // // //         pageInfo {
// // // // // // // // //           hasNextPage
// // // // // // // // //           endCursor
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }
// // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // `;

// // // // // // // // // // Mutation to create a new review
// // // // // // // // // export const CREATE_REVIEW_MUTATION = gql`
// // // // // // // // //   mutation CreateReview(
// // // // // // // // //     $author: String
// // // // // // // // //     $authorEmail: String
// // // // // // // // //     $commentOn: Int!
// // // // // // // // //     $content: String!
// // // // // // // // //     $rating: Int! # This rating needs to be saved by the backend mutation
// // // // // // // // //   ) {
// // // // // // // // //     createComment( # Or a more specific review mutation if provided by WooGraphQL
// // // // // // // // //       input: {
// // // // // // // // //         clientMutationId: "createReview_${Date.now()}"
// // // // // // // // //         author: $author
// // // // // // // // //         authorEmail: $authorEmail
// // // // // // // // //         commentOn: $commentOn # Product's WordPress databaseId
// // // // // // // // //         content: $content
// // // // // // // // //         # How the 'rating' variable is processed depends on your backend:
// // // // // // // // //         # 1. If 'createComment' is extended to understand 'rating' (e.g. via metaData or a direct rating arg):
// // // // // // // // //         metaData: [ { key: "rating", value: $rating } ] # Common way to pass custom data
// // // // // // // // //         # 2. If your specific mutation from WooGraphQL has a 'rating' input field:
// // // // // // // // //         # rating: $rating
// // // // // // // // //       }
// // // // // // // // //     ) {
// // // // // // // // //       success
// // // // // // // // //       comment {
// // // // // // // // //         ...ReviewFragment
// // // // // // // // //         rating # Attempt to get rating back for the new comment
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }
// // // // // // // // //   ${REVIEW_FRAGMENT}
// // // // // // // // // `;

// // // // // // // // // src/graphql/reviews.gql.js
// // // // // // // // import { gql } from '@apollo/client';

// // // // // // // // // This fragment assumes WooGraphQL is installed and working,
// // // // // // // // // and that review nodes have a 'rating' field and author avatars might take a 'size'.
// // // // // // // // // YOU MUST VERIFY THESE AGAINST YOUR SCHEMA ONCE IT'S STABLE AND YOU CAN QUERY A REVIEW.
// // // // // // // // export const WOO_REVIEW_FRAGMENT = gql`
// // // // // // // //   fragment WooReviewFragment on Comment { # Or the actual __typename of your review nodes
// // // // // // // //     id
// // // // // // // //     databaseId
// // // // // // // //     content(format: RENDERED)
// // // // // // // //     date
// // // // // // // //     rating # ASSUMPTION: WooGraphQL adds this field. If not, this will error.
// // // // // // // //     approved
// // // // // // // //     author {
// // // // // // // //       node { # Typically a Commenter, User, or similar type
// // // // // // // //         name
// // // // // // // //         avatar(size: 96) { # ASSUMPTION: 'size' argument is supported. If not, remove it.
// // // // // // // //           url
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //     # __typename # Keep for debugging
// // // // // // // //   }
// // // // // // // // `;

// // // // // // // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // // //   query GetWooProductReviews(
// // // // // // // //     $productId: ID! # GraphQL Global ID of the Product
// // // // // // // //     $first: Int = 5
// // // // // // // //     $after: String
// // // // // // // //   ) {
// // // // // // // //     product(id: $productId) {
// // // // // // // //       id
// // // // // // // //       databaseId
// // // // // // // //       name
// // // // // // // //       averageRating # Should be provided by WooGraphQL
// // // // // // // //       reviewCount   # Should be provided by WooGraphQL
// // // // // // // //       reviews(first: $first, after: $after, where: { status: "APPROVE" }) { # Ensure 'status' filter is valid for your schema
// // // // // // // //         pageInfo {
// // // // // // // //           hasNextPage
// // // // // // // //           endCursor
// // // // // // // //         }
// // // // // // // //         edges {
// // // // // // // //           node {
// // // // // // // //             ...WooReviewFragment
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // // // `;

// // // // // // // // // This mutation assumes WooGraphQL provides 'writeReview' or similar.
// // // // // // // // // The input fields, especially for 'rating', MUST match your schema.
// // // // // // // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // // // // // // //   mutation WriteWooReview(
// // // // // // // //     $commentOn: Int! # Product's WordPress databaseId
// // // // // // // //     $rating: Int!
// // // // // // // //     $content: String!
// // // // // // // //     $author: String    # For guest reviews if allowed
// // // // // // // //     $authorEmail: String # For guest reviews if allowed
// // // // // // // //   ) {
// // // // // // // //     # COMMON MUTATION NAME: 'writeReview'. Check your schema for the exact name (e.g., createReview, addProductReview)
// // // // // // // //     writeReview(
// // // // // // // //       input: {
// // // // // // // //         clientMutationId: "WriteWooReviewMutation" # Can be any unique string
// // // // // // // //         commentOn: $commentOn
// // // // // // // //         rating: $rating      # Assumes 'rating' is a direct input field for the mutation
// // // // // // // //         content: $content
// // // // // // // //         author: $author
// // // // // // // //         authorEmail: $authorEmail
// // // // // // // //       }
// // // // // // // //     ) {
// // // // // // // //       clientMutationId
// // // // // // // //       rating # Rating of the submitted review
// // // // // // // //       review { # The actual review/comment object created
// // // // // // // //         ...WooReviewFragment
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // // // `;

// // // // // // // // src/graphql/reviews.gql.js
// // // // // // // import { gql } from '@apollo/client';

// // // // // // // // This fragment assumes WooGraphQL is installed and working.
// // // // // // // // YOU MUST VERIFY THESE AGAINST YOUR SCHEMA ONCE IT'S STABLE AND YOU CAN QUERY A REVIEW.
// // // // // // // export const WOO_REVIEW_FRAGMENT = gql`
// // // // // // //   fragment WooReviewFragment on Comment { # Or the actual __typename of your review nodes
// // // // // // //     id
// // // // // // //     databaseId
// // // // // // //     content(format: RENDERED)
// // // // // // //     date
// // // // // // //     # REMOVED direct rating query here
// // // // // // //     approved
// // // // // // //     author {
// // // // // // //       node { # Typically a Commenter, User, or similar type
// // // // // // //         name
// // // // // // //         avatar { # REMOVED 'size' argument
// // // // // // //           url
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //     # ADDED query for comment metadata to retrieve the rating
// // // // // // //     # Check your schema: this might be 'metaData' or 'commentmetafields' etc.
// // // // // // //     # Also, the structure might be edges { node { key value } } instead of nodes { key value }
// // // // // // //     commentMeta {
// // // // // // //       nodes {
// // // // // // //         key
// // // // // // //         value
// // // // // // //       }
// // // // // // //     }
// // // // // // //     # __typename # Keep for debugging
// // // // // // //   }
// // // // // // // `;

// // // // // // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // // // // // //   query GetWooProductReviews(
// // // // // // //     $productId: ID! # GraphQL Global ID of the Product
// // // // // // //     $first: Int = 5
// // // // // // //     $after: String
// // // // // // //   ) {
// // // // // // //     product(id: $productId) {
// // // // // // //       id
// // // // // // //       databaseId
// // // // // // //       name
// // // // // // //       averageRating # Should be provided by WooGraphQL
// // // // // // //       reviewCount   # Should be provided by WooGraphQL
// // // // // // //       reviews(first: $first, after: $after, where: { status: "APPROVE" }) { # Ensure 'status' filter is valid for your schema
// // // // // // //         pageInfo {
// // // // // // //           hasNextPage
// // // // // // //           endCursor
// // // // // // //         }
// // // // // // //         edges {
// // // // // // //           node {
// // // // // // //             ...WooReviewFragment
// // // // // // //           }
// // // // // // //         }
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
// // // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // // `;

// // // // // // // // This mutation assumes WooGraphQL provides 'writeReview' or similar.
// // // // // // // // The input fields, especially for 'rating', MUST match your schema.
// // // // // // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // // // // // //   mutation WriteWooReview(
// // // // // // //     $commentOn: Int! # Product's WordPress databaseId
// // // // // // //     $rating: Int!
// // // // // // //     $content: String!
// // // // // // //     $author: String    # For guest reviews if allowed
// // // // // // //     $authorEmail: String # For guest reviews if allowed
// // // // // // //   ) {
// // // // // // //     # COMMON MUTATION NAME: 'writeReview'. Check your schema for the exact name (e.g., createReview, addProductReview, createComment)
// // // // // // //     # The input for rating might also need to be via metaData if your mutation doesn't directly accept 'rating'
// // // // // // //     # e.g., metaData: [{ key: "rating", value: $rating }]
// // // // // // //     writeReview(
// // // // // // //       input: {
// // // // // // //         clientMutationId: "WriteWooReviewMutation" # Can be any unique string
// // // // // // //         commentOn: $commentOn
// // // // // // //         rating: $rating      # Assumes 'rating' is a direct input field for the mutation and the mutation resolver handles saving it.
// // // // // // //                               # If not, this mutation needs to be adjusted to pass rating via metadata.
// // // // // // //         content: $content
// // // // // // //         author: $author
// // // // // // //         authorEmail: $authorEmail
// // // // // // //       }
// // // // // // //     ) {
// // // // // // //       clientMutationId
// // // // // // //       # rating # The rating of the submitted review, if returned by the mutation
// // // // // // //       review { # The actual review/comment object created
// // // // // // //         ...WooReviewFragment
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
// // // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // // `;

// // // // // // // src/graphql/reviews.gql.js
// // // // // // import { gql } from '@apollo/client';

// // // // // // export const WOO_REVIEW_FRAGMENT = gql`
// // // // // //   fragment WooReviewFragment on Comment {
// // // // // //     id
// // // // // //     databaseId
// // // // // //     content(format: RENDERED)
// // // // // //     date
// // // // // //     approved
// // // // // //     author {
// // // // // //       node {
// // // // // //         name
// // // // // //         avatar { # Removed 'size' argument
// // // // // //           url
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //     # Attempt to get rating. This might be on the Comment type directly
// // // // // //     # if it's specifically a product review comment handled by WooGraphQL or similar.
// // // // // //     rating

// // // // // //     # OR, if 'rating' is on a more specific type that Comment implements (e.g., a 'Review' interface or a 'ProductReview' type)
// // // // // //     # you might need an inline fragment. Replace 'ProductReview' with the actual type name from your schema.
// // // // // //     # ... on ProductReview { # Replace 'ProductReview' with the actual specific review type name from your schema
// // // // // //     #   rating
// // // // // //     # }
// // // // // //     # __typename # Uncomment for debugging to see the actual GraphQL type of these nodes
// // // // // //   }
// // // // // // `;

// // // // // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // // // // //   query GetWooProductReviews(
// // // // // //     $productId: ID!
// // // // // //     $first: Int = 5
// // // // // //     $after: String
// // // // // //   ) {
// // // // // //     product(id: $productId) {
// // // // // //       id
// // // // // //       databaseId
// // // // // //       name
// // // // // //       averageRating
// // // // // //       reviewCount
// // // // // //       reviews(first: $first, after: $after, where: { status: "APPROVE" }) {
// // // // // //         pageInfo {
// // // // // //           hasNextPage
// // // // // //           endCursor
// // // // // //         }
// // // // // //         edges {
// // // // // //           node {
// // // // // //             ...WooReviewFragment
// // // // // //           }
// // // // // //         }
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // `;

// // // // // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // // // // //   mutation WriteWooReview(
// // // // // //     $commentOn: Int!
// // // // // //     $rating: Int!
// // // // // //     $content: String!
// // // // // //     $author: String
// // // // // //     $authorEmail: String
// // // // // //   ) {
// // // // // //     writeReview( # Verify this mutation name and its input structure
// // // // // //       input: {
// // // // // //         clientMutationId: "WriteWooReviewMutation"
// // // // // //         commentOn: $commentOn
// // // // // //         rating: $rating # Assumes the mutation directly accepts 'rating'
// // // // // //         content: $content
// // // // // //         author: $author
// // // // // //         authorEmail: $authorEmail
// // // // // //       }
// // // // // //     ) {
// // // // // //       clientMutationId
// // // // // //       review {
// // // // // //         ...WooReviewFragment
// // // // // //         # Explicitly request rating here again if the fragment might not catch it
// // // // // //         # or if it's on a specific type returned by the mutation
// // // // // //         # rating 
// // // // // //         # ... on ProductReview {
// // // // // //         #   rating
// // // // // //         # }
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // `;

// // // // // // src/graphql/reviews.gql.js
// // // // // import { gql } from '@apollo/client';

// // // // // export const WOO_REVIEW_FRAGMENT = gql`
// // // // //   fragment WooReviewFragment on Comment {
// // // // //     id
// // // // //     databaseId
// // // // //     content(format: RENDERED)
// // // // //     date
// // // // //     approved
// // // // //     author {
// // // // //       node {
// // // // //         name
// // // // //         avatar { # Avatar without the 'size' argument
// // // // //           url
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //     # REMOVED the direct 'rating' field query as it does not exist on type Comment
// // // // //     # __typename # Keep this uncommented for now when you inspect your schema!
// // // // //   }
// // // // // `;

// // // // // // GET_WOO_PRODUCT_REVIEWS_QUERY remains the same, using the modified fragment above
// // // // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // // // //   query GetWooProductReviews(
// // // // //     $productId: ID!
// // // // //     $first: Int = 5
// // // // //     $after: String
// // // // //   ) {
// // // // //     product(id: $productId) {
// // // // //       id
// // // // //       databaseId
// // // // //       name
// // // // //       averageRating # This comes from the product itself
// // // // //       reviewCount   # This comes from the product itself
// // // // //       reviews(first: $first, after: $after, where: { status: "APPROVE" }) {
// // // // //         pageInfo {
// // // // //           hasNextPage
// // // // //           endCursor
// // // // //         }
// // // // //         edges {
// // // // //           node {
// // // // //             ...WooReviewFragment
// // // // //           }
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   }
// // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // `;

// // // // // // WRITE_WOO_REVIEW_MUTATION also remains the same for now.
// // // // // // The critical part here is that your *backend mutation* must correctly
// // // // // // accept the 'rating' input and save it.
// // // // // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // // // // //   mutation WriteWooReview(
// // // // // //     $commentOn: Int!
// // // // // //     $rating: Int!
// // // // // //     $content: String!
// // // // // //     $author: String
// // // // // //     $authorEmail: String
// // // // // //   ) {
// // // // // //     writeReview( # Verify this mutation name and its input structure from your schema
// // // // // //       input: {
// // // // // //         clientMutationId: "WriteWooReviewMutation"
// // // // // //         commentOn: $commentOn
// // // // // //         rating: $rating # This assumes your 'writeReview' mutation directly accepts a 'rating' argument
// // // // // //         content: $content
// // // // // //         author: $author
// // // // // //         authorEmail: $authorEmail
// // // // // //       }
// // // // // //     ) {
// // // // // //       clientMutationId
// // // // // //       review {
// // // // // //         ...WooReviewFragment
// // // // // //       }
// // // // // //     }
// // // // // //   }
// // // // // //   ${WOO_REVIEW_FRAGMENT}
// // // // // // `;

// // // // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // // // //   mutation WriteWooReview(
// // // // //     $commentOn: Int!
// // // // //     $rating: Int!
// // // // //     $content: String!
// // // // //     $author: String
// // // // //     $authorEmail: String
// // // // //   ) {
// // // // //     writeReview( # Verify this mutation name and its input structure
// // // // //       input: {
// // // // //         clientMutationId: "WriteWooReviewMutation"
// // // // //         commentOn: $commentOn
// // // // //         rating: $rating # This is a key area to verify
// // // // //         content: $content
// // // // //         author: $author
// // // // //         authorEmail: $authorEmail
// // // // //       }
// // // // //     ) {
// // // // //       clientMutationId
// // // // //       # SIMPLIFIED RESPONSE:
// // // // //       # Instead of:
// // // // //       # review {
// // // // //       #   ...WooReviewFragment
// // // // //       # }
// // // // //       # Let's just ask for the success status or basic review ID if available
// // // // //       # Check your schema for what fields are directly under 'writeReview' output type
// // // // //       # For example, if it returns a 'success' boolean:
// // // // //       # success
// // // // //       # Or, if it directly returns the comment/review object that might have an ID:
// // // // //       review {
// // // // //          id # Try asking for just the ID first
// // // // //          # databaseId # Then maybe this
// // // // //       }
// // // // //       # If the above still errors, try an even simpler field if your mutation returns one, e.g., a success boolean
// // // // //       # success # (Uncomment this and comment out 'review' block if 'review {id}' still fails)
// // // // //     }
// // // // //   }
// // // // //   # ${WOO_REVIEW_FRAGMENT} # Temporarily remove fragment usage from mutation response for debugging
// // // // // `;

// // // // src/graphql/reviews.gql.js
// // // import { gql } from '@apollo/client';

// // // export const WOO_REVIEW_FRAGMENT = gql`
// // //   fragment WooReviewFragment on Comment {
// // //     id
// // //     databaseId
// // //     content(format: RENDERED)
// // //     date
// // //     approved
// // //     author {
// // //       node {
// // //         name
// // //         avatar { # Avatar without the 'size' argument
// // //           url
// // //         }
// // //       }
// // //     }
// // //     __typename # Good for debugging what type of node this is
// // //   }
// // // `;

// // // // GET_WOO_PRODUCT_REVIEWS_QUERY remains the same, using the fragment above
// // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // //   query GetWooProductReviews(
// // //     $productId: ID!
// // //     $first: Int = 5
// // //     $after: String
// // //   ) {
// // //     product(id: $productId) {
// // //       id
// // //       databaseId
// // //       name
// // //       averageRating
// // //       reviewCount
// // //       reviews(first: $first, after: $after, where: { status: "APPROVE" }) {
// // //         pageInfo {
// // //           hasNextPage
// // //           endCursor
// // //         }
// // //         edges {
// // //           node {
// // //             ...WooReviewFragment
// // //           }
// // //         }
// // //       }
// // //     }
// // //   }
// // //   ${WOO_REVIEW_FRAGMENT}
// // // `;

// // // //WRITE_WOO_REVIEW_MUTATION will now use the fragment again
// // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // //   mutation WriteWooReview(
// // //     $commentOn: Int!
// // //     $rating: Int!
// // //     $content: String!
// // //     $author: String
// // //     $authorEmail: String
// // //   ) {
// // //     writeReview( # Verify this mutation name and its input structure
// // //       input: {
// // //         clientMutationId: "WriteWooReviewMutation"
// // //         commentOn: $commentOn
// // //         rating: $rating # This is a key area to verify for server-side handling
// // //         content: $content
// // //         author: $author
// // //         authorEmail: $authorEmail
// // //       }
// // //     ) {
// // //       clientMutationId
// // //       review { # Request the review object in the response
// // //         ...WooReviewFragment # Use the fragment here
// // //       }
// // //       # success # You might also have a success boolean here, check your schema
// // //     }
// // //   }
// // //   ${WOO_REVIEW_FRAGMENT} # Make sure the fragment is included after the mutation definition
// // // `;

// // // // src/graphql/reviews.gql.js
// // // import { gql } from '@apollo/client';

// // // // FRAGMENT: Added the 'rating' field to fetch the star value for each review.
// // // export const WOO_REVIEW_FRAGMENT = gql`
// // //   fragment WooReviewFragment on Comment {
// // //     id
// // //     databaseId
// // //     content(format: RENDERED)
// // //     date
// // //     rating
// // //     approved
// // //     author {
// // //       node {
// // //         name
// // //         avatar {
// // //           url
// // //         }
// // //       }
// // //     }
// // //   }
// // // `;

// // // // QUERY: Modified to use the database ID, which is more reliable.
// // // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// // //   query GetWooProductReviews($id: ID!) {
// // //     product(id: $id, idType: DATABASE_ID) {
// // //       id
// // //       databaseId
// // //       name
// // //       averageRating
// // //       reviewCount
// // //       reviews(first: 10, where: { status: "APPROVE" }) {
// // //         edges {
// // //           node {
// // //             ...WooReviewFragment
// // //           }
// // //         }
// // //         pageInfo {
// // //           hasNextPage
// // //           endCursor
// // //         }
// // //       }
// // //     }
// // //   }
// // //   ${WOO_REVIEW_FRAGMENT}
// // // `;

// // // // MUTATION: This remains the same, as it already uses the database ID.
// // // export const WRITE_WOO_REVIEW_MUTATION = gql`
// // //   mutation WriteWooReview(
// // //     $commentOn: Int!
// // //     $rating: Int!
// // //     $content: String!
// // //     $author: String
// // //     $authorEmail: String
// // //   ) {
// // //     writeReview(
// // //       input: {
// // //         clientMutationId: "WriteWooReviewMutation"
// // //         commentOn: $commentOn
// // //         rating: $rating
// // //         content: $content
// // //         author: $author
// // //         authorEmail: $authorEmail
// // //       }
// // //     ) {
// // //       review {
// // //         ...WooReviewFragment
// // //       }
// // //     }
// // //   }
// // //   ${WOO_REVIEW_FRAGMENT}
// // // `;


// // // src/graphql/reviews.gql.js
// // import { gql } from '@apollo/client';

// // // FRAGMENT: REMOVED the 'rating' field and ADDED 'commentMeta' to get the rating from metadata.
// // export const WOO_REVIEW_FRAGMENT = gql`
// //   fragment WooReviewFragment on Comment {
// //     id
// //     databaseId
// //     content(format: RENDERED)
// //     date
// //     approved
// //     author {
// //       node {
// //         name
// //         avatar {
// //           url
// //         }
// //       }
// //     }
// //     commentMeta {
// //       nodes {
// //         key
// //         value
// //       }
// //     }
// //   }
// // `;

// // // QUERY: This query is now correct as it uses the databaseId.
// // export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
// //   query GetWooProductReviews($id: ID!) {
// //     product(id: $id, idType: DATABASE_ID) {
// //       id
// //       databaseId
// //       name
// //       averageRating
// //       reviewCount
// //       reviews(first: 10, where: { status: "APPROVE" }) {
// //         edges {
// //           node {
// //             ...WooReviewFragment
// //           }
// //         }
// //         pageInfo {
// //           hasNextPage
// //           endCursor
// //         }
// //       }
// //     }
// //   }
// //   ${WOO_REVIEW_FRAGMENT}
// // `;

// // // MUTATION: This remains correct.
// // export const WRITE_WOO_REVIEW_MUTATION = gql`
// //   mutation WriteWooReview(
// //     $commentOn: Int!
// //     $rating: Int!
// //     $content: String!
// //     $author: String
// //     $authorEmail: String
// //   ) {
// //     writeReview(
// //       input: {
// //         clientMutationId: "WriteWooReviewMutation"
// //         commentOn: $commentOn
// //         rating: $rating
// //         content: $content
// //         author: $author
// //         authorEmail: $authorEmail
// //       }
// //     ) {
// //       review {
// //         ...WooReviewFragment
// //       }
// //     }
// //   }
// //   ${WOO_REVIEW_FRAGMENT}
// // `;

// // src/graphql/reviews.gql.js
// import { gql } from '@apollo/client';

// // FRAGMENT: REMOVED `commentMeta` as it does not exist on your schema.
// export const WOO_REVIEW_FRAGMENT = gql`
//   fragment WooReviewFragment on Comment {
//     id
//     databaseId
//     content(format: RENDERED)
//     date
//     approved
//     author {
//       node {
//         name
//         avatar {
//           url
//         }
//       }
//     }
//   }
// `;

// // QUERY: This is correct and will now use the valid fragment.
// export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
//   query GetWooProductReviews($id: ID!) {
//     product(id: $id, idType: DATABASE_ID) {
//       id
//       databaseId
//       name
//       averageRating
//       reviewCount
//       reviews(first: 10, where: { status: "APPROVE" }) {
//         edges {
//           node {
//             ...WooReviewFragment
//           }
//         }
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//       }
//     }
//   }
//   ${WOO_REVIEW_FRAGMENT}
// `;

// // MUTATION: This remains correct.
// export const WRITE_WOO_REVIEW_MUTATION = gql`
//   mutation WriteWooReview($commentOn: Int!, $rating: Int!, $content: String!) {
//     writeReview(
//       input: {
//         clientMutationId: "WriteWooReviewMutation"
//         commentOn: $commentOn
//         rating: $rating
//         content: $content
//       }
//     ) {
//       review {
//         ...WooReviewFragment
//       }
//     }
//   }
//   ${WOO_REVIEW_FRAGMENT}
// `;

// src/graphql/reviews.gql.js
import { gql } from '@apollo/client';

// FRAGMENT: We are now adding the `rating` field because the PHP code makes it available.
export const WOO_REVIEW_FRAGMENT = gql`
  fragment WooReviewFragment on Comment {
    id
    databaseId
    content(format: RENDERED)
    date
    rating # The new field registered by the PHP code
    approved
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
  }
`;

// QUERY: This uses the corrected fragment and the reliable databaseId. No changes needed here.
export const GET_WOO_PRODUCT_REVIEWS_QUERY = gql`
  query GetWooProductReviews($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      name
      averageRating
      reviewCount
      reviews(first: 10, where: { status: "APPROVE" }) {
        edges {
          node {
            ...WooReviewFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${WOO_REVIEW_FRAGMENT}
`;

// MUTATION: This also uses the corrected fragment. No changes needed here.
export const WRITE_WOO_REVIEW_MUTATION = gql`
  mutation WriteWooReview($commentOn: Int!, $rating: Int!, $content: String!) {
    writeReview(
      input: {
        clientMutationId: "WriteWooReviewMutation"
        commentOn: $commentOn
        rating: $rating
        content: $content
      }
    ) {
      review {
        ...WooReviewFragment
      }
    }
  }
  ${WOO_REVIEW_FRAGMENT}
`;