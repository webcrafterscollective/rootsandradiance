// // src/graphql/categories.gql.js
// import { gql } from '@apollo/client';

// // Fragment for basic category details
// export const CATEGORY_FRAGMENT = gql`
//   fragment CategoryFragment on ProductCategory {
//     id
//     databaseId
//     name
//     slug
//     count # Number of products in this category
//     image {
//         id
//         sourceUrl(size: THUMBNAIL) # Use appropriate size
//         altText
//     }
//     # parentId # Uncomment if you need parent info
//   }
// `;

// // Query to get top-level product categories (those without a parent)
// // You can adjust filters like 'hideEmpty' or add 'first' for pagination
// export const GET_TOP_LEVEL_CATEGORIES_QUERY = gql`
//   query GetTopLevelCategories(
//       $first: Int = 5 # How many categories to fetch
//       $hideEmpty: Boolean = true # Hide categories with no products
//     ) {
//     productCategories(
//         where: {
//             parent: 0, # 0 indicates top-level categories
//             hideEmpty: $hideEmpty,
//             orderby: TERM_ORDER # Or NAME, COUNT etc.
//         }
//         first: $first
//     ) {
//       nodes {
//         ...CategoryFragment
//       }
//     }
//   }
//   ${CATEGORY_FRAGMENT} # Include the fragment definition
// `;

// src/graphql/categories.gql.js
import { gql } from '@apollo/client';

// Fragment for basic category details
export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on ProductCategory {
    id
    databaseId
    name
    slug
    count # Number of products in this category
    image {
        id
        sourceUrl(size: THUMBNAIL) # Use appropriate size
        altText
    }
    # parentId # Uncomment if you need parent info
  }
`;

// Query to get top-level product categories (those without a parent)
// You can adjust filters like 'hideEmpty' or add 'first' for pagination
export const GET_TOP_LEVEL_CATEGORIES_QUERY = gql`
  query GetTopLevelCategories(
      $first: Int = 5 # How many categories to fetch
      $hideEmpty: Boolean = true # Hide categories with no products
    ) {
    productCategories(
        where: {
            parent: 0, # 0 indicates top-level categories
            hideEmpty: $hideEmpty,
            orderby: TERM_ORDER # <--- THIS IS THE KEY FOR YOUR REQUEST
            # order: ASC # Default is ASC, can be explicitly set or changed to DESC
        }
        first: $first
    ) {
      nodes {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT} # Include the fragment definition
`;