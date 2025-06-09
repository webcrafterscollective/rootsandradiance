// // // // // // // // // // src/components/ProductReviews.jsx
// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { useQuery, useMutation } from '@apollo/client';
// // // // // // // // // import { GET_PRODUCT_REVIEWS_QUERY, CREATE_REVIEW_MUTATION } from '../graphql/reviews.gql';
// // // // // // // // // import { useAuth } from '../context/AuthContext'; // To get user info

// // // // // // // // // // --- StarRating Component (can be moved to its own file if preferred) ---
// // // // // // // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // // // // // // //     const totalStars = 5;
// // // // // // // // //     const numericRating = parseFloat(rating) || 0;
// // // // // // // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // // // // // // // //     const partialStar = numericRating % 1; // For half stars, not implemented here but possible

// // // // // // // // //     return (
// // // // // // // // //         <div className="flex items-center">
// // // // // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // // // // //                 const starValue = index + 1;
// // // // // // // // //                 return (
// // // // // // // // //                     <span
// // // // // // // // //                         key={starValue}
// // // // // // // // //                         className={`${size} ${starValue <= fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-600'}`}
// // // // // // // // //                     >
// // // // // // // // //                         &#9733; {/* Unicode star */}
// // // // // // // // //                     </span>
// // // // // // // // //                 );
// // // // // // // // //             })}
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // // // // // // //     const totalStars = 5;
// // // // // // // // //     return (
// // // // // // // // //         <div className="flex">
// // // // // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // // // // //                 const starValue = index + 1;
// // // // // // // // //                 return (
// // // // // // // // //                     <button
// // // // // // // // //                         key={starValue}
// // // // // // // // //                         type="button"
// // // // // // // // //                         onClick={() => setRating(starValue)}
// // // // // // // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // // // // // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`}
// // // // // // // // //                     >
// // // // // // // // //                         &#9733;
// // // // // // // // //                     </button>
// // // // // // // // //                 );
// // // // // // // // //             })}
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };


// // // // // // // // // // --- ReviewForm Component ---
// // // // // // // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // // // // // // //     const { isAuthenticated, user } = useAuth();
// // // // // // // // //     const [name, setName] = useState('');
// // // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // // //     const [rating, setRating] = useState(0);
// // // // // // // // //     const [comment, setComment] = useState('');

// // // // // // // // //     const [
// // // // // // // // //         createReviewMutation,
// // // // // // // // //         { loading: submittingReview, error: submitError }
// // // // // // // // //     ] = useMutation(CREATE_REVIEW_MUTATION);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         if (isAuthenticated && user) {
// // // // // // // // //             setName(user.firstName || user.nicename || user.username || '');
// // // // // // // // //             setEmail(user.email || '');
// // // // // // // // //         } else {
// // // // // // // // //             setName('');
// // // // // // // // //             setEmail('');
// // // // // // // // //         }
// // // // // // // // //     }, [isAuthenticated, user]);

// // // // // // // // //     const handleSubmit = async (e) => {
// // // // // // // // //         e.preventDefault();
// // // // // // // // //         if (!rating) {
// // // // // // // // //             showNotification("Please select a star rating.", 'error');
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //         if (!isAuthenticated && (!name.trim() || !email.trim())) {
// // // // // // // // //             showNotification("Please provide your name and email.", 'error');
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //         if (!comment.trim()) {
// // // // // // // // //             showNotification("Please write a comment for your review.", 'error');
// // // // // // // // //             return;
// // // // // // // // //         }
// // // // // // // // //         if (!productDatabaseId) {
// // // // // // // // //             showNotification("Product ID is missing. Cannot submit review.", 'error');
// // // // // // // // //             return;
// // // // // // // // //         }

// // // // // // // // //         try {
// // // // // // // // //             await createReviewMutation({
// // // // // // // // //                 variables: {
// // // // // // // // //                     commentOn: productDatabaseId,
// // // // // // // // //                     content: comment,
// // // // // // // // //                     rating: rating,
// // // // // // // // //                     author: isAuthenticated ? (user?.firstName || user?.nicename || user?.username) : name,
// // // // // // // // //                     authorEmail: isAuthenticated ? user?.email : email,
// // // // // // // // //                 }
// // // // // // // // //             });
// // // // // // // // //             showNotification("Review submitted successfully! It may require approval before appearing.", 'success');
// // // // // // // // //             setRating(0);
// // // // // // // // //             setComment('');
// // // // // // // // //             if (!isAuthenticated) {
// // // // // // // // //                 // Keep name and email for non-logged-in users for potential multiple reviews, or clear them:
// // // // // // // // //                 // setName('');
// // // // // // // // //                 // setEmail('');
// // // // // // // // //             }
// // // // // // // // //             if (onSubmitSuccess) onSubmitSuccess(); // Callback to refetch reviews
// // // // // // // // //         } catch (e) {
// // // // // // // // //             console.error("Failed to submit review:", e);
// // // // // // // // //             showNotification(`Failed to submit review: ${e.message || 'Please try again.'}`, 'error');
// // // // // // // // //         }
// // // // // // // // //     };
    
// // // // // // // // //     // Common input field styles
// // // // // // // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // // // // // // //     return (
// // // // // // // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // // // // // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // // // // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // // // // // //                 {!isAuthenticated && (
// // // // // // // // //                     <>
// // // // // // // // //                         <div>
// // // // // // // // //                             <label htmlFor="reviewerName" className="block text-sm font-medium text-brand-foreground mb-1">Name <span className="text-red-500">*</span></label>
// // // // // // // // //                             <input type="text" id="reviewerName" value={name} onChange={(e) => setName(e.target.value)} required className={inputBaseClasses} />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div>
// // // // // // // // //                             <label htmlFor="reviewerEmail" className="block text-sm font-medium text-brand-foreground mb-1">Email <span className="text-red-500">*</span></label>
// // // // // // // // //                             <input type="email" id="reviewerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBaseClasses} />
// // // // // // // // //                             <p className="text-xs text-brand-foreground/70 mt-1">Your email address will not be published.</p>
// // // // // // // // //                         </div>
// // // // // // // // //                     </>
// // // // // // // // //                 )}
// // // // // // // // //                 {isAuthenticated && user && (
// // // // // // // // //                      <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.firstName || user.nicename || user.username}</span>.</p>
// // // // // // // // //                 )}
// // // // // // // // //                 <div>
// // // // // // // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // // // // // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // // // // // // //                 </div>
// // // // // // // // //                 <div>
// // // // // // // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // // // // // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // // // // // // //                 </div>
// // // // // // // // //                 {submitError && <p className="text-sm text-red-500">Error: {submitError.message}</p>}
// // // // // // // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
// // // // // // // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // // // // // // //                 </button>
// // // // // // // // //             </form>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };


// // // // // // // // // // --- Main ProductReviews Component ---
// // // // // // // // // const ProductReviews = ({ productId, productDatabaseId, showNotification }) => {
// // // // // // // // //     const { data, loading, error, refetch, fetchMore } = useQuery(GET_PRODUCT_REVIEWS_QUERY, {
// // // // // // // // //         variables: { productId: productId, first: 5 },
// // // // // // // // //         skip: !productId,
// // // // // // // // //         notifyOnNetworkStatusChange: true,
// // // // // // // // //     });

// // // // // // // // //     const reviewsData = data?.product?.reviews?.nodes || [];
// // // // // // // // //     const pageInfo = data?.product?.reviews?.pageInfo;
// // // // // // // // //     const reviewCount = data?.product?.reviewCount || 0;
// // // // // // // // //     const averageRating = data?.product?.averageRating || 0;

// // // // // // // // //     const handleReviewSubmissionSuccess = () => {
// // // // // // // // //         refetch(); // Refetch reviews to show the new one
// // // // // // // // //     };

// // // // // // // // //     if (loading && !data) return <p className="text-brand-foreground/80 py-4">Loading reviews...</p>;
// // // // // // // // //     if (error) return <p className="text-red-500 py-4">Error loading reviews: {error.message}</p>;

// // // // // // // // //     return (
// // // // // // // // //         <div className="space-y-8 py-6">
// // // // // // // // //             <div>
// // // // // // // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">
// // // // // // // // //                     Customer Reviews
// // // // // // // // //                 </h3>
// // // // // // // // //                 {reviewCount > 0 ? (
// // // // // // // // //                     <div className="flex items-center mb-6">
// // // // // // // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // // // // // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // // // // // // //                             {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount > 1 ? 's' : ''}
// // // // // // // // //                         </p>
// // // // // // // // //                     </div>
// // // // // // // // //                 ) : null}

// // // // // // // // //                 {reviewsData.length > 0 ? (
// // // // // // // // //                     <div className="space-y-6">
// // // // // // // // //                         {reviewsData.map(review => (
// // // // // // // // //                             <div key={review.id || review.databaseId} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // // // // // // //                                 <div className="flex items-start sm:items-center mb-2 gap-3">
// // // // // // // // //                                     {review.author?.node?.avatar?.url && (
// // // // // // // // //                                         <img 
// // // // // // // // //                                             src={review.author.node.avatar.url} 
// // // // // // // // //                                             alt={review.author.node.name || 'Reviewer'} 
// // // // // // // // //                                             className="w-10 h-10 rounded-full bg-brand-subtle flex-shrink-0"
// // // // // // // // //                                             onError={(e) => e.target.style.display = 'none'} // Hide if avatar fails
// // // // // // // // //                                         />
// // // // // // // // //                                     )}
// // // // // // // // //                                     <div className="flex-grow">
// // // // // // // // //                                         <div className="flex flex-col sm:flex-row sm:items-center">
// // // // // // // // //                                             <p className="text-sm font-semibold text-brand-foreground">{review.author?.node?.name || 'Anonymous'}</p>
// // // // // // // // //                                             <StarRatingDisplay rating={review.rating} size="text-base" /> 
// // // // // // // // //                                         </div>
// // // // // // // // //                                         <p className="text-xs text-brand-foreground/70 mt-0.5 sm:mt-0">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // // // // // // // //                                     </div>
// // // // // // // // //                                 </div>
// // // // // // // // //                                 <div 
// // // // // // // // //                                     className="text-sm text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1" 
// // // // // // // // //                                     dangerouslySetInnerHTML={{ __html: review.content || '' }} 
// // // // // // // // //                                 />
// // // // // // // // //                             </div>
// // // // // // // // //                         ))}
// // // // // // // // //                         {pageInfo?.hasNextPage && (
// // // // // // // // //                             <div className="text-center mt-8">
// // // // // // // // //                                 <button
// // // // // // // // //                                     onClick={() =>
// // // // // // // // //                                         fetchMore({
// // // // // // // // //                                             variables: { after: pageInfo.endCursor },
// // // // // // // // //                                             updateQuery: (prevResult, { fetchMoreResult }) => {
// // // // // // // // //                                                 if (!fetchMoreResult?.product?.reviews?.nodes) return prevResult;
// // // // // // // // //                                                 return {
// // // // // // // // //                                                     product: {
// // // // // // // // //                                                         ...prevResult.product,
// // // // // // // // //                                                         reviews: {
// // // // // // // // //                                                             ...fetchMoreResult.product.reviews,
// // // // // // // // //                                                             nodes: [
// // // // // // // // //                                                                 ...(prevResult.product?.reviews?.nodes || []),
// // // // // // // // //                                                                 ...fetchMoreResult.product.reviews.nodes,
// // // // // // // // //                                                             ],
// // // // // // // // //                                                         },
// // // // // // // // //                                                     },
// // // // // // // // //                                                 };
// // // // // // // // //                                             },
// // // // // // // // //                                         })
// // // // // // // // //                                     }
// // // // // // // // //                                     className="bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover transition-colors"
// // // // // // // // //                                 >
// // // // // // // // //                                     Load More Reviews
// // // // // // // // //                                 </button>
// // // // // // // // //                             </div>
// // // // // // // // //                         )}
// // // // // // // // //                     </div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     !loading && <p className="text-sm text-brand-foreground/80">No reviews yet. Be the first to share your thoughts!</p>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
            
// // // // // // // // //             <ReviewForm 
// // // // // // // // //                 productDatabaseId={productDatabaseId} 
// // // // // // // // //                 onSubmitSuccess={handleReviewSubmissionSuccess}
// // // // // // // // //                 showNotification={showNotification} // Pass down the notification function
// // // // // // // // //             />
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // };

// // // // // // // // // export default ProductReviews;

// // // // // // // // // src/components/ProductReviews.jsx
// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { useQuery, useMutation } from '@apollo/client';
// // // // // // // // import { GET_PRODUCT_REVIEWS_QUERY, CREATE_REVIEW_MUTATION } from '../graphql/reviews.gql';
// // // // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // // // --- Helper function to extract rating from metadata ---
// // // // // // // // const getRatingFromMeta = (metaNodes) => {
// // // // // // // //     if (!metaNodes || !Array.isArray(metaNodes)) return 0;
// // // // // // // //     // Adjust 'rating' if your metadata key is different (e.g., 'rating_score')
// // // // // // // //     const ratingMeta = metaNodes.find(meta => meta.key === 'rating');
// // // // // // // //     return ratingMeta && ratingMeta.value ? parseInt(ratingMeta.value, 10) : 0;
// // // // // // // // };

// // // // // // // // // --- StarRatingDisplay Component ---
// // // // // // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // // // // // //     const totalStars = 5;
// // // // // // // //     const numericRating = parseFloat(rating) || 0;
// // // // // // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);

// // // // // // // //     return (
// // // // // // // //         <div className="flex items-center">
// // // // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // // // //                 const starValue = index + 1;
// // // // // // // //                 return (
// // // // // // // //                     <span
// // // // // // // //                         key={starValue}
// // // // // // // //                         className={`${size} ${starValue <= fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`}
// // // // // // // //                         style={{ lineHeight: '1' }} // Ensure stars align well
// // // // // // // //                     >
// // // // // // // //                         &#9733; {/* Unicode star */}
// // // // // // // //                     </span>
// // // // // // // //                 );
// // // // // // // //             })}
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // --- InteractiveStarRating Component ---
// // // // // // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // // // // // //     const totalStars = 5;
// // // // // // // //     return (
// // // // // // // //         <div className="flex">
// // // // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // // // //                 const starValue = index + 1;
// // // // // // // //                 return (
// // // // // // // //                     <button
// // // // // // // //                         key={starValue}
// // // // // // // //                         type="button" // Important for forms
// // // // // // // //                         onClick={() => setRating(starValue)}
// // // // // // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // // // // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`}
// // // // // // // //                         style={{ lineHeight: '1' }}
// // // // // // // //                     >
// // // // // // // //                         &#9733;
// // // // // // // //                     </button>
// // // // // // // //                 );
// // // // // // // //             })}
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // --- ReviewForm Component ---
// // // // // // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // // // // // //     const { isAuthenticated, user } = useAuth();
// // // // // // // //     const [name, setName] = useState('');
// // // // // // // //     const [email, setEmail] = useState('');
// // // // // // // //     const [rating, setRating] = useState(0);
// // // // // // // //     const [comment, setComment] = useState('');

// // // // // // // //     const [
// // // // // // // //         createReviewMutation,
// // // // // // // //         { loading: submittingReview, error: submitErrorHook } // Renamed to avoid conflict
// // // // // // // //     ] = useMutation(CREATE_REVIEW_MUTATION);

// // // // // // // //     useEffect(() => {
// // // // // // // //         if (isAuthenticated && user) {
// // // // // // // //             setName(user.displayName || user.firstName || user.nicename || user.username || '');
// // // // // // // //             setEmail(user.email || '');
// // // // // // // //         } else {
// // // // // // // //             setName('');
// // // // // // // //             setEmail('');
// // // // // // // //         }
// // // // // // // //     }, [isAuthenticated, user]);

// // // // // // // //     const handleSubmit = async (e) => {
// // // // // // // //         e.preventDefault();
// // // // // // // //         if (!rating) {
// // // // // // // //             showNotification("Please select a star rating.", 'error');
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         if (!isAuthenticated && (!name.trim() || !email.trim())) {
// // // // // // // //             showNotification("Please provide your name and email.", 'error');
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         if (!comment.trim()) {
// // // // // // // //             showNotification("Please write a comment for your review.", 'error');
// // // // // // // //             return;
// // // // // // // //         }
// // // // // // // //         if (!productDatabaseId) {
// // // // // // // //             showNotification("Product ID is missing. Cannot submit review.", 'error');
// // // // // // // //             return;
// // // // // // // //         }

// // // // // // // //         try {
// // // // // // // //             const result = await createReviewMutation({
// // // // // // // //                 variables: {
// // // // // // // //                     commentOn: productDatabaseId,
// // // // // // // //                     content: comment,
// // // // // // // //                     rating: rating, // This 'rating' will be put into metaData by the mutation
// // // // // // // //                     author: isAuthenticated ? (user?.displayName || user?.firstName || user?.nicename || user?.username) : name,
// // // // // // // //                     authorEmail: isAuthenticated ? user?.email : email,
// // // // // // // //                 }
// // // // // // // //             });
// // // // // // // //             if (result.data?.createComment?.success) {
// // // // // // // //                 showNotification("Review submitted successfully! It may require approval before appearing.", 'success');
// // // // // // // //                 setRating(0);
// // // // // // // //                 setComment('');
// // // // // // // //                 // Do not clear name/email if not logged in, user might want to submit another quickly
// // // // // // // //                 // if (!isAuthenticated) { setName(''); setEmail(''); }
// // // // // // // //                 if (onSubmitSuccess) onSubmitSuccess();
// // // // // // // //             } else {
// // // // // // // //                 throw new Error(result.data?.createComment?.message || "Failed to submit review for an unknown reason.");
// // // // // // // //             }
// // // // // // // //         } catch (e) {
// // // // // // // //             console.error("Failed to submit review:", e);
// // // // // // // //             showNotification(`Failed to submit review: ${e.message || 'Please try again.'}`, 'error');
// // // // // // // //         }
// // // // // // // //     };
    
// // // // // // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // // // // // //     return (
// // // // // // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // // // // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // // // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // // // // //                 {!isAuthenticated && (
// // // // // // // //                     <>
// // // // // // // //                         <div>
// // // // // // // //                             <label htmlFor="reviewerName" className="block text-sm font-medium text-brand-foreground mb-1">Name <span className="text-red-500">*</span></label>
// // // // // // // //                             <input type="text" id="reviewerName" value={name} onChange={(e) => setName(e.target.value)} required className={inputBaseClasses} />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label htmlFor="reviewerEmail" className="block text-sm font-medium text-brand-foreground mb-1">Email <span className="text-red-500">*</span></label>                            
// // // // // // // //                             <input type="email" id="reviewerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBaseClasses} />
// // // // // // // //                             <p className="text-xs text-brand-foreground/70 mt-1">Your email address will not be published.</p>
// // // // // // // //                         </div>
// // // // // // // //                     </>
// // // // // // // //                 )}
// // // // // // // //                 {isAuthenticated && user && (
// // // // // // // //                      <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.firstName || user.nicename || user.username}</span>.</p>
// // // // // // // //                 )}
// // // // // // // //                 <div>
// // // // // // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // // // // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // // // // // //                 </div>
// // // // // // // //                 <div>
// // // // // // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // // // // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // // // // // //                 </div>
// // // // // // // //                 {submitErrorHook && <p className="text-sm text-red-500">Error: {submitErrorHook.message}</p>}
// // // // // // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
// // // // // // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // // // // // //                 </button>
// // // // // // // //             </form>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // // --- Main ProductReviews Component ---
// // // // // // // // const ProductReviews = ({ productId, productDatabaseId, showNotification }) => {
// // // // // // // //     const { data, loading, error, refetch, fetchMore } = useQuery(GET_PRODUCT_REVIEWS_QUERY, {
// // // // // // // //         variables: { productId: productId, first: 5 }, // productId here is the GraphQL Global ID
// // // // // // // //         skip: !productId,
// // // // // // // //         notifyOnNetworkStatusChange: true,
// // // // // // // //     });

// // // // // // // //     // Extracted data for easier use
// // // // // // // //     const reviewsNodes = data?.product?.reviews?.nodes || [];
// // // // // // // //     const pageInfo = data?.product?.reviews?.pageInfo;
// // // // // // // //     // Use reviewCount and averageRating from the product data if available, as it's often pre-calculated
// // // // // // // //     const reviewCount = data?.product?.reviewCount || 0;
// // // // // // // //     const averageRating = data?.product?.averageRating || 0;

// // // // // // // //     const handleReviewSubmissionSuccess = () => {
// // // // // // // //         refetch(); // Refetch reviews to show the new one, including updated counts possibly
// // // // // // // //     };

// // // // // // // //     if (loading && !data?.product?.reviews) return <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>;
// // // // // // // //     if (error) return <p className="text-red-500 py-4 text-center">Error loading reviews: {error.message}</p>;
    
// // // // // // // //     // Check if productId was valid for the query
// // // // // // // //     if (!loading && !data?.product && productId) {
// // // // // // // //       return <p className="text-brand-foreground/70 py-4 text-center">Could not load review data for this product. The product identifier might be incorrect.</p>;
// // // // // // // //     }


// // // // // // // //     return (
// // // // // // // //         <div className="space-y-8 py-6">
// // // // // // // //             <div>
// // // // // // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">
// // // // // // // //                     Customer Reviews
// // // // // // // //                 </h3>
// // // // // // // //                 {reviewCount > 0 ? (
// // // // // // // //                     <div className="flex items-center mb-6">
// // // // // // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // // // // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // // // // // //                             {averageRating ? averageRating.toFixed(1) : '0.0'} based on {reviewCount} review{reviewCount > 1 ? 's' : ''}
// // // // // // // //                         </p>
// // // // // // // //                     </div>
// // // // // // // //                 ) : null}

// // // // // // // //                 {reviewsNodes.length > 0 ? (
// // // // // // // //                     <div className="space-y-6">
// // // // // // // //                         {reviewsNodes.map(review => {
// // // // // // // //                             // Extract rating for this individual review using the helper
// // // // // // // //                             const individualRating = getRatingFromMeta(review.commentMeta?.nodes);
// // // // // // // //                             return (
// // // // // // // //                                 <div key={review.id || review.databaseId} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // // // // // //                                     <div className="flex items-start sm:items-center mb-2 gap-3">
// // // // // // // //                                         {review.author?.node?.avatar?.url && (
// // // // // // // //                                             <img 
// // // // // // // //                                                 src={review.author.node.avatar.url} 
// // // // // // // //                                                 alt={review.author.node.name || 'Reviewer'} 
// // // // // // // //                                                 className="w-10 h-10 rounded-full bg-brand-subtle flex-shrink-0 object-cover"
// // // // // // // //                                                 onError={(e) => { e.target.style.display = 'none'; /* Hide if avatar fails gracefully */ }}
// // // // // // // //                                             />
// // // // // // // //                                         )}
// // // // // // // //                                         <div className="flex-grow">
// // // // // // // //                                             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
// // // // // // // //                                                 <p className="text-sm font-semibold text-brand-foreground order-1 sm:order-none">{review.author?.node?.name || 'Anonymous'}</p>
// // // // // // // //                                                 {/* Display individual review's rating */}
// // // // // // // //                                                 <StarRatingDisplay rating={individualRating} size="text-base" /> 
// // // // // // // //                                             </div>
// // // // // // // //                                             <p className="text-xs text-brand-foreground/70 mt-0.5 sm:mt-0">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // // // // // // //                                         </div>
// // // // // // // //                                     </div>
// // // // // // // //                                     {review.content && (
// // // // // // // //                                         <div 
// // // // // // // //                                             className="text-sm text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1 prose-p:text-brand-foreground/90" // Ensure prose text color
// // // // // // // //                                             dangerouslySetInnerHTML={{ __html: review.content }} 
// // // // // // // //                                         />
// // // // // // // //                                     )}
// // // // // // // //                                 </div>
// // // // // // // //                             );
// // // // // // // //                         })}
// // // // // // // //                         {pageInfo?.hasNextPage && (
// // // // // // // //                             <div className="text-center mt-8">
// // // // // // // //                                 <button
// // // // // // // //                                     onClick={() =>
// // // // // // // //                                         fetchMore({
// // // // // // // //                                             variables: { after: pageInfo.endCursor },
// // // // // // // //                                             updateQuery: (prevResult, { fetchMoreResult }) => {
// // // // // // // //                                                 if (!fetchMoreResult?.product?.reviews?.nodes) return prevResult;
// // // // // // // //                                                 return { // Correctly merge paginated results
// // // // // // // //                                                     product: {
// // // // // // // //                                                         ...prevResult.product,
// // // // // // // //                                                         reviews: {
// // // // // // // //                                                             ...fetchMoreResult.product.reviews,
// // // // // // // //                                                             nodes: [
// // // // // // // //                                                                 ...(prevResult.product?.reviews?.nodes || []),
// // // // // // // //                                                                 ...fetchMoreResult.product.reviews.nodes,
// // // // // // // //                                                             ],
// // // // // // // //                                                         },
// // // // // // // //                                                     },
// // // // // // // //                                                 };
// // // // // // // //                                             },
// // // // // // // //                                         })
// // // // // // // //                                     }
// // // // // // // //                                     disabled={loading} // Disable button while fetchMore is in progress
// // // // // // // //                                     className="bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-70"
// // // // // // // //                                 >
// // // // // // // //                                     {loading ? 'Loading More...' : 'Load More Reviews'}
// // // // // // // //                                 </button>
// // // // // // // //                             </div>
// // // // // // // //                         )}
// // // // // // // //                     </div>
// // // // // // // //                 ) : (
// // // // // // // //                      !loading && <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // // // // // // //                 )}
// // // // // // // //             </div>
            
// // // // // // // //             <ReviewForm 
// // // // // // // //                 productDatabaseId={productDatabaseId} // Pass WordPress Post ID for the mutation
// // // // // // // //                 onSubmitSuccess={handleReviewSubmissionSuccess}
// // // // // // // //                 showNotification={showNotification}
// // // // // // // //             />
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default ProductReviews;

// // // // // // // // src/components/ProductReviews.jsx
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { useQuery, useMutation } from '@apollo/client';
// // // // // // // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql'; // Ensure path is correct
// // // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // // --- StarRatingDisplay Component ---
// // // // // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // // // // //     const totalStars = 5;
// // // // // // //     const numericRating = parseFloat(rating) || 0;
// // // // // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // // // // // //     return (
// // // // // // //         <div className="flex items-center">
// // // // // // //             {[...Array(totalStars)].map((_, index) => (
// // // // // // //                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
// // // // // // //                     &#9733;
// // // // // // //                 </span>
// // // // // // //             ))}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- InteractiveStarRating Component ---
// // // // // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // // // // //     const totalStars = 5;
// // // // // // //     return (
// // // // // // //         <div className="flex">
// // // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // // //                 const starValue = index + 1;
// // // // // // //                 return (
// // // // // // //                     <button
// // // // // // //                         key={starValue} type="button" onClick={() => setRating(starValue)}
// // // // // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // // // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
// // // // // // //                     >&#9733;</button>
// // // // // // //                 );
// // // // // // //             })}
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- ReviewForm Component ---
// // // // // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // // // // //     const { isAuthenticated, user } = useAuth();
// // // // // // //     const [name, setName] = useState('');
// // // // // // //     const [email, setEmail] = useState('');
// // // // // // //     const [rating, setRating] = useState(0);
// // // // // // //     const [comment, setComment] = useState('');

// // // // // // //     const [createReviewMutation, { loading: submittingReview, error: submitErrorHook }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

// // // // // // //     useEffect(() => {
// // // // // // //         if (isAuthenticated && user) {
// // // // // // //             setName(user.displayName || user.firstName || user.nicename || user.username || '');
// // // // // // //             setEmail(user.email || '');
// // // // // // //         } else {
// // // // // // //             setName(''); setEmail('');
// // // // // // //         }
// // // // // // //     }, [isAuthenticated, user]);

// // // // // // //     const handleSubmit = async (e) => {
// // // // // // //         e.preventDefault();
// // // // // // //         if (!rating) { showNotification("Please select a star rating.", 'error'); return; }
// // // // // // //         if (!isAuthenticated && (!name.trim() || !email.trim())) { showNotification("Please provide your name and email.", 'error'); return; }
// // // // // // //         if (!comment.trim()) { showNotification("Please write a comment for your review.", 'error'); return; }
// // // // // // //         if (!productDatabaseId) { showNotification("Product ID is missing. Cannot submit review.", 'error'); return; }

// // // // // // //         try {
// // // // // // //             const result = await createReviewMutation({
// // // // // // //                 variables: {
// // // // // // //                     commentOn: productDatabaseId,
// // // // // // //                     rating: rating,
// // // // // // //                     content: comment,
// // // // // // //                     author: isAuthenticated ? (user?.displayName || user?.firstName || user?.nicename || user?.username) : name,
// // // // // // //                     authorEmail: isAuthenticated ? user?.email : email,
// // // // // // //                 }
// // // // // // //             });
// // // // // // //             if (result.data?.writeReview?.review) { // Check based on your mutation's payload
// // // // // // //                 showNotification("Review submitted successfully! It may require approval before appearing.", 'success');
// // // // // // //                 setRating(0); setComment('');
// // // // // // //                 if (onSubmitSuccess) onSubmitSuccess();
// // // // // // //             } else {
// // // // // // //                 throw new Error(result.errors?.[0]?.message || "Failed to submit review for an unknown reason.");
// // // // // // //             }
// // // // // // //         } catch (err) {
// // // // // // //             console.error("Failed to submit review:", err);
// // // // // // //             showNotification(`Failed to submit review: ${err.message || 'Please try again.'}`, 'error');
// // // // // // //         }
// // // // // // //     };
    
// // // // // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // // // // //     return (
// // // // // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // // // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // // // //                 {!isAuthenticated && (
// // // // // // //                     <>
// // // // // // //                         <div>
// // // // // // //                             <label htmlFor="reviewerName" className="block text-sm font-medium text-brand-foreground mb-1">Name <span className="text-red-500">*</span></label>
// // // // // // //                             <input type="text" id="reviewerName" value={name} onChange={(e) => setName(e.target.value)} required className={inputBaseClasses} />
// // // // // // //                         </div>
// // // // // // //                         <div>
// // // // // // //                             <label htmlFor="reviewerEmail" className="block text-sm font-medium text-brand-foreground mb-1">Email <span className="text-red-500">*</span></label>                            
// // // // // // //                             <input type="email" id="reviewerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBaseClasses} />
// // // // // // //                             <p className="text-xs text-brand-foreground/70 mt-1">Your email address will not be published.</p>
// // // // // // //                         </div>
// // // // // // //                     </>
// // // // // // //                 )}
// // // // // // //                 {isAuthenticated && user && (
// // // // // // //                      <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.firstName || user.nicename || user.username}</span>.</p>
// // // // // // //                 )}
// // // // // // //                 <div>
// // // // // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // // // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // // // // //                 </div>
// // // // // // //                 <div>
// // // // // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // // // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // // // // //                 </div>
// // // // // // //                 {submitErrorHook && <p className="text-sm text-red-500">Error: {submitErrorHook.message}</p>}
// // // // // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
// // // // // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // // // // //                 </button>
// // // // // // //             </form>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // // --- Main ProductReviews Component ---
// // // // // // // const ProductReviews = ({ productId, productDatabaseId, productFromRestApi, showNotification }) => {
// // // // // // //     const { data, loading, error, refetch, fetchMore } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// // // // // // //         variables: { productId: productId, first: 5 }, // productId is GraphQL Global ID
// // // // // // //         skip: !productId,
// // // // // // //         notifyOnNetworkStatusChange: true,
// // // // // // //     });

// // // // // // //     const reviewEdges = data?.product?.reviews?.edges || [];
// // // // // // //     const pageInfo = data?.product?.reviews?.pageInfo;
    
// // // // // // //     // Prioritize GraphQL data for count/average if available, otherwise fallback to REST API data
// // // // // // //     const reviewCount = data?.product?.reviewCount ?? productFromRestApi?.review_count ?? 0;
// // // // // // //     const averageRating = data?.product?.averageRating ?? parseFloat(productFromRestApi?.average_rating || 0);


// // // // // // //     const handleReviewSubmissionSuccess = () => {
// // // // // // //         refetch(); // Refetch reviews to show the new one and update counts
// // // // // // //     };

// // // // // // //     if (loading && !reviewEdges.length) return <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>;
// // // // // // //     if (error) return <p className="text-red-500 py-4 text-center">Error loading reviews: {error.message}</p>;
// // // // // // //     if (!loading && !data?.product && productId) {
// // // // // // //       return <p className="text-brand-foreground/70 py-4 text-center">Could not load review data. Product might not exist or GraphQL ID is incorrect.</p>;
// // // // // // //     }

// // // // // // //     return (
// // // // // // //         <div className="space-y-8 py-6">
// // // // // // //             <div>
// // // // // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
// // // // // // //                 {reviewCount > 0 ? (
// // // // // // //                     <div className="flex items-center mb-6">
// // // // // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // // // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // // // // //                             {averageRating ? averageRating.toFixed(1) : '0.0'} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// // // // // // //                         </p>
// // // // // // //                     </div>
// // // // // // //                 ) : null}

// // // // // // //                 {reviewEdges.length > 0 ? (
// // // // // // //                     <div className="space-y-6">
// // // // // // //                         {reviewEdges.map(edge => {
// // // // // // //                             const review = edge.node;
// // // // // // //                             // ASSUMPTION: 'review.rating' is directly available.
// // // // // // //                             // If not, and it's in metadata, you'd parse it here.
// // // // // // //                             const individualRating = review.rating || 0; 
// // // // // // //                             return (
// // // // // // //                                 <div key={review.id || review.databaseId} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // // // // //                                     <div className="flex items-start sm:items-center mb-2 gap-3">
// // // // // // //                                         {review.author?.node?.avatar?.url && (
// // // // // // //                                             <img 
// // // // // // //                                                 src={review.author.node.avatar.url} 
// // // // // // //                                                 alt={review.author.node.name || 'Reviewer'} 
// // // // // // //                                                 className="w-10 h-10 rounded-full bg-brand-subtle flex-shrink-0 object-cover"
// // // // // // //                                                 onError={(e) => { e.target.style.display = 'none'; }}
// // // // // // //                                             />
// // // // // // //                                         )}
// // // // // // //                                         <div className="flex-grow">
// // // // // // //                                             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
// // // // // // //                                                 <p className="text-sm font-semibold text-brand-foreground order-1 sm:order-none">{review.author?.node?.name || 'Anonymous'}</p>
// // // // // // //                                                 <StarRatingDisplay rating={individualRating} size="text-base" /> 
// // // // // // //                                             </div>
// // // // // // //                                             <p className="text-xs text-brand-foreground/70 mt-0.5 sm:mt-0">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // // // // // //                                         </div>
// // // // // // //                                     </div>
// // // // // // //                                     {review.content && (
// // // // // // //                                         <div 
// // // // // // //                                             className="text-sm text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1 prose-p:text-brand-foreground/90"
// // // // // // //                                             dangerouslySetInnerHTML={{ __html: review.content }} 
// // // // // // //                                         />
// // // // // // //                                     )}
// // // // // // //                                 </div>
// // // // // // //                             );
// // // // // // //                         })}
// // // // // // //                         {pageInfo?.hasNextPage && (
// // // // // // //                             <div className="text-center mt-8">
// // // // // // //                                 <button
// // // // // // //                                     onClick={() => fetchMore({ variables: { after: pageInfo.endCursor } /* updateQuery logic needed here if not using default Apollo merging */ })}
// // // // // // //                                     disabled={loading}
// // // // // // //                                     className="bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-70"
// // // // // // //                                 >
// // // // // // //                                     {loading ? 'Loading More...' : 'Load More Reviews'}
// // // // // // //                                 </button>
// // // // // // //                             </div>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 ) : (
// // // // // // //                      !loading && <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // // // // // //                 )}
// // // // // // //             </div>
            
// // // // // // //             <ReviewForm 
// // // // // // //                 productDatabaseId={productDatabaseId}
// // // // // // //                 onSubmitSuccess={handleReviewSubmissionSuccess}
// // // // // // //                 showNotification={showNotification}
// // // // // // //             />
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default ProductReviews;

// // // // // // // src/components/ProductReviews.jsx
// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useQuery, useMutation } from '@apollo/client';
// // // // // // // Ensure you are importing the corrected queries
// // // // // // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql';
// // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // --- Helper function to extract rating from metadata ---
// // // // // // const getRatingFromMeta = (metaNodesArray) => {
// // // // // //     if (!metaNodesArray || !Array.isArray(metaNodesArray)) {
// // // // // //         return 0;
// // // // // //     }
// // // // // //     // Common keys for rating are 'rating' or 'rating_score'. Adjust if yours is different.
// // // // // //     const ratingMeta = metaNodesArray.find(meta => meta.key === 'rating' || meta.key === 'rating_score');
// // // // // //     return ratingMeta && ratingMeta.value ? parseInt(ratingMeta.value, 10) : 0;
// // // // // // };

// // // // // // // --- StarRatingDisplay Component (no changes needed from your last version) ---
// // // // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // // // //     const totalStars = 5;
// // // // // //     const numericRating = parseFloat(rating) || 0;
// // // // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // // // // //     return (
// // // // // //         <div className="flex items-center">
// // // // // //             {[...Array(totalStars)].map((_, index) => (
// // // // // //                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
// // // // // //                     &#9733;
// // // // // //                 </span>
// // // // // //             ))}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- InteractiveStarRating Component (no changes needed from your last version) ---
// // // // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // // // //     const totalStars = 5;
// // // // // //     return (
// // // // // //         <div className="flex">
// // // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // // //                 const starValue = index + 1;
// // // // // //                 return (
// // // // // //                     <button
// // // // // //                         key={starValue} type="button" onClick={() => setRating(starValue)}
// // // // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
// // // // // //                     >&#9733;</button>
// // // // // //                 );
// // // // // //             })}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // // --- ReviewForm Component ---
// // // // // // // (Assuming your WRITE_WOO_REVIEW_MUTATION is correctly set up to take 'rating' as a direct input and handles saving it as metadata on the backend)
// // // // // // // No changes are strictly needed here *if* the mutation handles the rating correctly.
// // // // // // // If the mutation itself needs to change to accept metadata (e.g., input: { metaData: [{key: "rating", value: $rating}] }), then the variables passed to createReviewMutation would need to be adjusted.
// // // // // // // For now, we assume the mutation is structured to accept `rating` as a direct argument.
// // // // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // // // //     const { isAuthenticated, user } = useAuth();
// // // // // //     const [name, setName] = useState('');
// // // // // //     const [email, setEmail] = useState('');
// // // // // //     const [rating, setRating] = useState(0);
// // // // // //     const [comment, setComment] = useState('');

// // // // // //     const [createReviewMutation, { loading: submittingReview, error: submitErrorHook }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

// // // // // //     useEffect(() => {
// // // // // //         if (isAuthenticated && user) {
// // // // // //             setName(user.displayName || user.firstName || user.nicename || user.username || '');
// // // // // //             setEmail(user.email || '');
// // // // // //         } else {
// // // // // //             setName(''); setEmail('');
// // // // // //         }
// // // // // //     }, [isAuthenticated, user]);

// // // // // //     const handleSubmit = async (e) => {
// // // // // //         e.preventDefault();
// // // // // //         if (!rating) { showNotification("Please select a star rating.", 'error'); return; }
// // // // // //         if (!isAuthenticated && (!name.trim() || !email.trim())) { showNotification("Please provide your name and email.", 'error'); return; }
// // // // // //         if (!comment.trim()) { showNotification("Please write a comment for your review.", 'error'); return; }
// // // // // //         if (!productDatabaseId) { showNotification("Product ID is missing. Cannot submit review.", 'error'); return; }

// // // // // //         try {
// // // // // //             const result = await createReviewMutation({
// // // // // //                 variables: {
// // // // // //                     commentOn: productDatabaseId,
// // // // // //                     rating: rating, // This 'rating' needs to be handled by the mutation resolver on the backend
// // // // // //                     content: comment,
// // // // // //                     author: isAuthenticated ? (user?.displayName || user?.firstName || user?.nicename || user?.username) : name,
// // // // // //                     authorEmail: isAuthenticated ? user?.email : email,
// // // // // //                 }
// // // // // //             });
// // // // // //             // Adjust based on your mutation's actual success payload path
// // // // // //             if (result.data?.writeReview?.review) { 
// // // // // //                 showNotification("Review submitted successfully! It may require approval before appearing.", 'success');
// // // // // //                 setRating(0); setComment('');
// // // // // //                 if (onSubmitSuccess) onSubmitSuccess();
// // // // // //             } else {
// // // // // //                 // Check for GraphQL errors returned in the response explicitly
// // // // // //                 const gqlError = result.errors?.[0]?.message;
// // // // // //                 throw new Error(gqlError || "Failed to submit review for an unknown reason.");
// // // // // //             }
// // // // // //         } catch (err) {
// // // // // //             console.error("Failed to submit review:", err);
// // // // // //             showNotification(`Failed to submit review: ${err.message || 'Please try again.'}`, 'error');
// // // // // //         }
// // // // // //     };
    
// // // // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // // // //     return (
// // // // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // // //                 {!isAuthenticated && (
// // // // // //                     <>
// // // // // //                         <div>
// // // // // //                             <label htmlFor="reviewerName" className="block text-sm font-medium text-brand-foreground mb-1">Name <span className="text-red-500">*</span></label>
// // // // // //                             <input type="text" id="reviewerName" value={name} onChange={(e) => setName(e.target.value)} required className={inputBaseClasses} />
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                             <label htmlFor="reviewerEmail" className="block text-sm font-medium text-brand-foreground mb-1">Email <span className="text-red-500">*</span></label>                            
// // // // // //                             <input type="email" id="reviewerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBaseClasses} />
// // // // // //                             <p className="text-xs text-brand-foreground/70 mt-1">Your email address will not be published.</p>
// // // // // //                         </div>
// // // // // //                     </>
// // // // // //                 )}
// // // // // //                 {isAuthenticated && user && (
// // // // // //                      <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.firstName || user.nicename || user.username}</span>.</p>
// // // // // //                 )}
// // // // // //                 <div>
// // // // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // // // //                 </div>
// // // // // //                 <div>
// // // // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // // // //                 </div>
// // // // // //                 {submitErrorHook && <p className="text-sm text-red-500">Error submitting review. Please try again.</p>} {/* Simplified error message */}
// // // // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
// // // // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // // // //                 </button>
// // // // // //             </form>
// // // // // //         </div>
// // // // // //     );
// // // // // // };


// // // // // // // --- Main ProductReviews Component ---
// // // // // // const ProductReviews = ({ productId, productDatabaseId, productFromRestApi, showNotification }) => {
// // // // // //     const { data, loading, error, refetch, fetchMore } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// // // // // //         variables: { productId: productId, first: 5 },
// // // // // //         skip: !productId,
// // // // // //         notifyOnNetworkStatusChange: true,
// // // // // //     });

// // // // // //     const reviewEdges = data?.product?.reviews?.edges || [];
// // // // // //     const pageInfo = data?.product?.reviews?.pageInfo;
    
// // // // // //     const reviewCount = data?.product?.reviewCount ?? productFromRestApi?.review_count ?? 0;
// // // // // //     const averageRating = data?.product?.averageRating ?? parseFloat(productFromRestApi?.average_rating || 0);

// // // // // //     const handleReviewSubmissionSuccess = () => {
// // // // // //         refetch();
// // // // // //     };

// // // // // //     if (loading && !reviewEdges.length) return <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>;
// // // // // //     // Error is now more specific based on the actual error from useQuery
// // // // // //     if (error) return <p className="text-red-500 py-4 text-center">Error loading reviews. See console for details.</p>; 
// // // // // //     if (!loading && !data?.product && productId) {
// // // // // //       return <p className="text-brand-foreground/70 py-4 text-center">Could not load review data. Product identifier might be incorrect.</p>;
// // // // // //     }

// // // // // //     return (
// // // // // //         <div className="space-y-8 py-6">
// // // // // //             <div>
// // // // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
// // // // // //                 {reviewCount > 0 ? (
// // // // // //                     <div className="flex items-center mb-6">
// // // // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // // // //                             {averageRating ? averageRating.toFixed(1) : '0.0'} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// // // // // //                         </p>
// // // // // //                     </div>
// // // // // //                 ) : null}

// // // // // //                 {reviewEdges.length > 0 ? (
// // // // // //                     <div className="space-y-6">
// // // // // //                         {reviewEdges.map(edge => {
// // // // // //                             const review = edge.node;
// // // // // //                             // UPDATED: Extract rating using the helper function
// // // // // //                             const individualRating = getRatingFromMeta(review.commentMeta?.nodes);
// // // // // //                             return (
// // // // // //                                 <div key={review.id || review.databaseId} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // // // //                                     <div className="flex items-start sm:items-center mb-2 gap-3">
// // // // // //                                         {review.author?.node?.avatar?.url && (
// // // // // //                                             <img 
// // // // // //                                                 src={review.author.node.avatar.url} 
// // // // // //                                                 alt={review.author.node.name || 'Reviewer'} 
// // // // // //                                                 className="w-10 h-10 rounded-full bg-brand-subtle flex-shrink-0 object-cover"
// // // // // //                                                 onError={(e) => { e.target.style.display = 'none'; }}
// // // // // //                                             />
// // // // // //                                         )}
// // // // // //                                         <div className="flex-grow">
// // // // // //                                             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
// // // // // //                                                 <p className="text-sm font-semibold text-brand-foreground order-1 sm:order-none">{review.author?.node?.name || 'Anonymous'}</p>
// // // // // //                                                 <StarRatingDisplay rating={individualRating} size="text-base" /> 
// // // // // //                                             </div>
// // // // // //                                             <p className="text-xs text-brand-foreground/70 mt-0.5 sm:mt-0">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // // // // //                                         </div>
// // // // // //                                     </div>
// // // // // //                                     {review.content && (
// // // // // //                                         <div 
// // // // // //                                             className="text-sm text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1 prose-p:text-brand-foreground/90"
// // // // // //                                             dangerouslySetInnerHTML={{ __html: review.content }} 
// // // // // //                                         />
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             );
// // // // // //                         })}
// // // // // //                         {pageInfo?.hasNextPage && (
// // // // // //                             <div className="text-center mt-8">
// // // // // //                                 <button
// // // // // //                                     onClick={() => fetchMore({ 
// // // // // //                                         variables: { after: pageInfo.endCursor },
// // // // // //                                         updateQuery: (prevResult, { fetchMoreResult }) => {
// // // // // //                                             if (!fetchMoreResult?.product?.reviews?.edges.length) {
// // // // // //                                                 return prevResult;
// // // // // //                                             }
// // // // // //                                             return {
// // // // // //                                                 product: {
// // // // // //                                                     ...prevResult.product,
// // // // // //                                                     reviews: {
// // // // // //                                                         ...fetchMoreResult.product.reviews,
// // // // // //                                                         edges: [
// // // // // //                                                             ...(prevResult.product?.reviews?.edges || []),
// // // // // //                                                             ...fetchMoreResult.product.reviews.edges,
// // // // // //                                                         ],
// // // // // //                                                     },
// // // // // //                                                 },
// // // // // //                                             };
// // // // // //                                         }
// // // // // //                                     })}
// // // // // //                                     disabled={loading}
// // // // // //                                     className="bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-70"
// // // // // //                                 >
// // // // // //                                     {loading ? 'Loading More...' : 'Load More Reviews'}
// // // // // //                                 </button>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 ) : (
// // // // // //                      !loading && <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // // // // //                 )}
// // // // // //             </div>
            
// // // // // //             <ReviewForm 
// // // // // //                 productDatabaseId={productDatabaseId}
// // // // // //                 onSubmitSuccess={handleReviewSubmissionSuccess}
// // // // // //                 showNotification={showNotification}
// // // // // //             />
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default ProductReviews;

// // // // // // src/components/ProductReviews.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useQuery, useMutation } from '@apollo/client';
// // // // // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql';
// // // // // import { useAuth } from '../context/AuthContext';

// // // // // // StarRatingDisplay and InteractiveStarRating components remain the same as your last version
// // // // // // ... (StarRatingDisplay component code)
// // // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // // //     const totalStars = 5;
// // // // //     const numericRating = parseFloat(rating) || 0;
// // // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // // // //     return (
// // // // //         <div className="flex items-center">
// // // // //             {[...Array(totalStars)].map((_, index) => (
// // // // //                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
// // // // //                     &#9733;
// // // // //                 </span>
// // // // //             ))}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // ... (InteractiveStarRating component code)
// // // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // // //     const totalStars = 5;
// // // // //     return (
// // // // //         <div className="flex">
// // // // //             {[...Array(totalStars)].map((_, index) => {
// // // // //                 const starValue = index + 1;
// // // // //                 return (
// // // // //                     <button
// // // // //                         key={starValue} type="button" onClick={() => setRating(starValue)}
// // // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
// // // // //                     >&#9733;</button>
// // // // //                 );
// // // // //             })}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // ReviewForm component remains largely the same
// // // // // // ... (ReviewForm component code, ensure it's the same as your last working version for submission logic)
// // // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // // //     const { isAuthenticated, user } = useAuth();
// // // // //     const [name, setName] = useState('');
// // // // //     const [email, setEmail] = useState('');
// // // // //     const [rating, setRating] = useState(0);
// // // // //     const [comment, setComment] = useState('');

// // // // //     const [createReviewMutation, { loading: submittingReview, error: submitErrorHook }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

// // // // //     useEffect(() => {
// // // // //         if (isAuthenticated && user) {
// // // // //             setName(user.displayName || user.firstName || user.nicename || user.username || '');
// // // // //             setEmail(user.email || '');
// // // // //         } else {
// // // // //             setName(''); setEmail('');
// // // // //         }
// // // // //     }, [isAuthenticated, user]);

// // // // //     const handleSubmit = async (e) => {
// // // // //         e.preventDefault();
// // // // //         if (!rating) { showNotification("Please select a star rating.", 'error'); return; }
// // // // //         if (!isAuthenticated && (!name.trim() || !email.trim())) { showNotification("Please provide your name and email.", 'error'); return; }
// // // // //         if (!comment.trim()) { showNotification("Please write a comment for your review.", 'error'); return; }
// // // // //         if (!productDatabaseId) { showNotification("Product ID is missing. Cannot submit review.", 'error'); return; }

// // // // //         try {
// // // // //             const result = await createReviewMutation({
// // // // //                 variables: {
// // // // //                     commentOn: productDatabaseId,
// // // // //                     rating: rating, 
// // // // //                     content: comment,
// // // // //                     author: isAuthenticated ? (user?.displayName || user?.firstName || user?.nicename || user?.username) : name,
// // // // //                     authorEmail: isAuthenticated ? user?.email : email,
// // // // //                 }
// // // // //             });
// // // // //             if (result.data?.writeReview?.review) { 
// // // // //                 showNotification("Review submitted successfully! It may require approval before appearing.", 'success');
// // // // //                 setRating(0); setComment('');
// // // // //                 if (onSubmitSuccess) onSubmitSuccess();
// // // // //             } else {
// // // // //                 const gqlError = result.errors?.[0]?.message;
// // // // //                 throw new Error(gqlError || "Failed to submit review for an unknown reason.");
// // // // //             }
// // // // //         } catch (err) {
// // // // //             console.error("Failed to submit review:", err);
// // // // //             showNotification(`Failed to submit review: ${err.message || 'Please try again.'}`, 'error');
// // // // //         }
// // // // //     };
    
// // // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // // //     return (
// // // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // // //                 {!isAuthenticated && (
// // // // //                     <>
// // // // //                         <div>
// // // // //                             <label htmlFor="reviewerName" className="block text-sm font-medium text-brand-foreground mb-1">Name <span className="text-red-500">*</span></label>
// // // // //                             <input type="text" id="reviewerName" value={name} onChange={(e) => setName(e.target.value)} required className={inputBaseClasses} />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label htmlFor="reviewerEmail" className="block text-sm font-medium text-brand-foreground mb-1">Email <span className="text-red-500">*</span></label>                            
// // // // //                             <input type="email" id="reviewerEmail" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputBaseClasses} />
// // // // //                             <p className="text-xs text-brand-foreground/70 mt-1">Your email address will not be published.</p>
// // // // //                         </div>
// // // // //                     </>
// // // // //                 )}
// // // // //                 {isAuthenticated && user && (
// // // // //                      <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.firstName || user.nicename || user.username}</span>.</p>
// // // // //                 )}
// // // // //                 <div>
// // // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // // //                 </div>
// // // // //                 {submitErrorHook && <p className="text-sm text-red-500">Error submitting review. Please try again.</p>}
// // // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
// // // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // // //                 </button>
// // // // //             </form>
// // // // //         </div>
// // // // //     );
// // // // // };


// // // // // const ProductReviews = ({ productId, productDatabaseId, productFromRestApi, showNotification }) => {
// // // // //     const { data, loading, error, refetch, fetchMore } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// // // // //         variables: { productId: productId, first: 5 },
// // // // //         skip: !productId,
// // // // //         notifyOnNetworkStatusChange: true,
// // // // //     });

// // // // //     const reviewEdges = data?.product?.reviews?.edges || [];
// // // // //     const pageInfo = data?.product?.reviews?.pageInfo;
    
// // // // //     const reviewCount = data?.product?.reviewCount ?? productFromRestApi?.review_count ?? 0;
// // // // //     const averageRating = data?.product?.averageRating ?? parseFloat(productFromRestApi?.average_rating || 0);

// // // // //     const handleReviewSubmissionSuccess = () => {
// // // // //         refetch();
// // // // //     };

// // // // //     if (loading && !reviewEdges.length) return <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>;
// // // // //     if (error) {
// // // // //         console.error("GraphQL Error in ProductReviews:", JSON.stringify(error, null, 2)); // Log the full error
// // // // //         return <p className="text-red-500 py-4 text-center">Error loading reviews. Please check the console for more details.</p>;
// // // // //     }
// // // // //     if (!loading && !data?.product && productId) {
// // // // //       return <p className="text-brand-foreground/70 py-4 text-center">Could not load review data. Product identifier might be incorrect.</p>;
// // // // //     }

// // // // //     return (
// // // // //         <div className="space-y-8 py-6">
// // // // //             <div>
// // // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
// // // // //                 {reviewCount > 0 ? (
// // // // //                     <div className="flex items-center mb-6">
// // // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // // //                             {averageRating ? averageRating.toFixed(1) : '0.0'} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// // // // //                         </p>
// // // // //                     </div>
// // // // //                 ) : null}

// // // // //                 {reviewEdges.length > 0 ? (
// // // // //                     <div className="space-y-6">
// // // // //                         {reviewEdges.map(edge => {
// // // // //                             const review = edge.node;
// // // // //                             // Use review.rating directly. It will be undefined or null if not available.
// // // // //                             const individualRating = review.rating || 0; 
// // // // //                             return (
// // // // //                                 <div key={review.id || review.databaseId} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // // //                                     <div className="flex items-start sm:items-center mb-2 gap-3">
// // // // //                                         {review.author?.node?.avatar?.url && (
// // // // //                                             <img 
// // // // //                                                 src={review.author.node.avatar.url} 
// // // // //                                                 alt={review.author.node.name || 'Reviewer'} 
// // // // //                                                 className="w-10 h-10 rounded-full bg-brand-subtle flex-shrink-0 object-cover"
// // // // //                                                 onError={(e) => { e.target.style.display = 'none'; }}
// // // // //                                             />
// // // // //                                         )}
// // // // //                                         <div className="flex-grow">
// // // // //                                             <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
// // // // //                                                 <p className="text-sm font-semibold text-brand-foreground order-1 sm:order-none">{review.author?.node?.name || 'Anonymous'}</p>
// // // // //                                                 <StarRatingDisplay rating={individualRating} size="text-base" /> 
// // // // //                                             </div>
// // // // //                                             <p className="text-xs text-brand-foreground/70 mt-0.5 sm:mt-0">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                     {review.content && (
// // // // //                                         <div 
// // // // //                                             className="text-sm text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1 prose-p:text-brand-foreground/90"
// // // // //                                             dangerouslySetInnerHTML={{ __html: review.content }} 
// // // // //                                         />
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             );
// // // // //                         })}
// // // // //                         {pageInfo?.hasNextPage && (
// // // // //                             <div className="text-center mt-8">
// // // // //                                 <button
// // // // //                                     onClick={() => fetchMore({ 
// // // // //                                         variables: { after: pageInfo.endCursor },
// // // // //                                         updateQuery: (prevResult, { fetchMoreResult }) => { /* Your existing updateQuery logic */ }
// // // // //                                     })}
// // // // //                                     disabled={loading}
// // // // //                                     className="bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover transition-colors disabled:opacity-70"
// // // // //                                 >
// // // // //                                     {loading ? 'Loading More...' : 'Load More Reviews'}
// // // // //                                 </button>
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 ) : (
// // // // //                      !loading && <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // // // //                 )}
// // // // //             </div>
            
// // // // //             <ReviewForm 
// // // // //                 productDatabaseId={productDatabaseId}
// // // // //                 onSubmitSuccess={handleReviewSubmissionSuccess}
// // // // //                 showNotification={showNotification}
// // // // //             />
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default ProductReviews;

// // // // // src/components/ProductReviews.jsx
// // // // import React, { useState } from 'react';
// // // // import { useQuery, useMutation } from '@apollo/client';
// // // // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql.js';
// // // // import { useAuth } from '../context/AuthContext.jsx';
// // // // import { Link, useLocation } from 'react-router-dom';

// // // // // Helper Component to display star ratings
// // // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // // //     const totalStars = 5;
// // // //     const numericRating = parseFloat(rating) || 0;
// // // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // // //     return (
// // // //         <div className="flex items-center">
// // // //             {[...Array(totalStars)].map((_, index) => (
// // // //                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
// // // //                     &#9733;
// // // //                 </span>
// // // //             ))}
// // // //         </div>
// // // //     );
// // // // };

// // // // // Helper Component for interactive star selection
// // // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // // //     const totalStars = 5;
// // // //     return (
// // // //         <div className="flex">
// // // //             {[...Array(totalStars)].map((_, index) => {
// // // //                 const starValue = index + 1;
// // // //                 return (
// // // //                     <button
// // // //                         key={starValue} type="button" onClick={() => setRating(starValue)}
// // // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
// // // //                     >&#9733;</button>
// // // //                 );
// // // //             })}
// // // //         </div>
// // // //     );
// // // // };

// // // // // Review Submission Form
// // // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // // //     const { isAuthenticated, user } = useAuth();
// // // //     const location = useLocation();
// // // //     const [rating, setRating] = useState(0);
// // // //     const [comment, setComment] = useState('');
// // // //     const [createReviewMutation, { loading: submittingReview }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

// // // //     const handleSubmit = async (e) => {
// // // //         e.preventDefault();
// // // //         if (!isAuthenticated) return;
// // // //         if (!rating || !comment.trim()) {
// // // //             showNotification("Please provide a rating and a comment.", 'error');
// // // //             return;
// // // //         }
// // // //         try {
// // // //             await createReviewMutation({ variables: { commentOn: productDatabaseId, rating, content: comment } });
// // // //             showNotification("Review submitted successfully!", 'success');
// // // //             setRating(0);
// // // //             setComment('');
// // // //             if (onSubmitSuccess) onSubmitSuccess();
// // // //         } catch (err) {
// // // //             showNotification(`Failed to submit review: ${err.message}`, 'error');
// // // //         }
// // // //     };

// // // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // // //     if (!isAuthenticated) {
// // // //         return (
// // // //             <div className="mt-8 pt-6 border-t border-brand-subtle text-center">
// // // //                 <p className="text-brand-foreground mb-3">You must be logged in to post a review.</p>
// // // //                 <Link to="/login" state={{ from: location }} className="inline-block bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover">
// // // //                     Login to Review
// // // //                 </Link>
// // // //             </div>
// // // //         );
// // // //     }

// // // //     return (
// // // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // // //             <form onSubmit={handleSubmit} className="space-y-4">
// // // //                 <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.username}</span>.</p>
// // // //                 <div>
// // // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // // //                 </div>
// // // //                 <div>
// // // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // // //                 </div>
// // // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover disabled:opacity-60">
// // // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // // //                 </button>
// // // //             </form>
// // // //         </div>
// // // //     );
// // // // };

// // // // // Main ProductReviews Component
// // // // const ProductReviews = ({ productId, productDatabaseId, productFromRestApi, showNotification }) => {
// // // //     // --- THIS IS THE FIX ---
// // // //     // The variable passed to the query must be `productId` to match the GQL definition.
// // // //     const { data, loading, error, refetch } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// // // //         variables: { productId: productId, first: 5 }, // CORRECTED: from `id:` to `productId:`
// // // //         skip: !productId,
// // // //         notifyOnNetworkStatusChange: true,
// // // //     });

// // // //     if (error) {
// // // //         console.error("GraphQL Error loading reviews:", JSON.stringify(error, null, 2));
// // // //     }
    
// // // //     const reviewEdges = data?.product?.reviews?.edges || [];
// // // //     const reviewCount = data?.product?.reviewCount ?? productFromRestApi?.review_count ?? 0;
// // // //     const averageRating = data?.product?.averageRating ?? parseFloat(productFromRestApi?.average_rating || 0);

// // // //     return (
// // // //         <div className="space-y-8 py-6">
// // // //             <div>
// // // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
// // // //                 {loading && !reviewEdges.length && <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>}
// // // //                 {error && <p className="text-red-500 py-4 text-center">Error loading reviews.</p>}
                
// // // //                 {!loading && !error && reviewCount > 0 && (
// // // //                     <div className="flex items-center mb-6">
// // // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // // //                             {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// // // //                         </p>
// // // //                     </div>
// // // //                 )}

// // // //                 {!loading && !error && reviewEdges.length > 0 && (
// // // //                     <div className="space-y-6">
// // // //                         {reviewEdges.map(({ node: review }) => (
// // // //                             <div key={review.id} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // // //                                 <p className="text-sm font-semibold text-brand-foreground">{review.author?.node?.name || 'Anonymous'}</p>
// // // //                                 <div className="text-sm text-brand-foreground/90" dangerouslySetInnerHTML={{ __html: review.content || '' }} />
// // // //                             </div>
// // // //                         ))}
// // // //                     </div>
// // // //                 )}

// // // //                 {!loading && !error && reviewEdges.length === 0 && (
// // // //                      <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // // //                 )}
// // // //             </div>
            
// // // //             <ReviewForm 
// // // //                 productDatabaseId={productDatabaseId}
// // // //                 onSubmitSuccess={refetch}
// // // //                 showNotification={showNotification}
// // // //             />
// // // //         </div>
// // // //     );
// // // // };

// // // // export default ProductReviews;

// // // // src/components/ProductReviews.jsx
// // // import React, { useState } from 'react';
// // // import { useQuery, useMutation } from '@apollo/client';
// // // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql.js';
// // // import { useAuth } from '../context/AuthContext.jsx';
// // // import { Link, useLocation } from 'react-router-dom';

// // // // --- Reusable Helper Components ---

// // // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
// // //     const totalStars = 5;
// // //     const numericRating = parseFloat(rating) || 0;
// // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // //     return (
// // //         <div className="flex items-center">
// // //             {[...Array(totalStars)].map((_, index) => (
// // //                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
// // //                     &#9733;
// // //                 </span>
// // //             ))}
// // //         </div>
// // //     );
// // // };

// // // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
// // //     const totalStars = 5;
// // //     return (
// // //         <div className="flex">
// // //             {[...Array(totalStars)].map((_, index) => {
// // //                 const starValue = index + 1;
// // //                 return (
// // //                     <button
// // //                         key={starValue} type="button" onClick={() => setRating(starValue)}
// // //                         className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
// // //                         aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
// // //                     >&#9733;</button>
// // //                 );
// // //             })}
// // //         </div>
// // //     );
// // // };

// // // // --- Review Submission Form Component ---

// // // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
// // //     const { isAuthenticated, user } = useAuth();
// // //     const location = useLocation();
// // //     const [rating, setRating] = useState(0);
// // //     const [comment, setComment] = useState('');
// // //     const [createReviewMutation, { loading: submittingReview }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         if (!isAuthenticated) return;
// // //         if (!rating || !comment.trim()) {
// // //             showNotification("Please provide a rating and a comment.", 'error');
// // //             return;
// // //         }
// // //         try {
// // //             await createReviewMutation({ variables: { commentOn: productDatabaseId, rating, content: comment } });
// // //             showNotification("Review submitted successfully!", 'success');
// // //             setRating(0); setComment('');
// // //             if (onSubmitSuccess) onSubmitSuccess();
// // //         } catch (err) {
// // //             showNotification(`Failed to submit review: ${err.message}`, 'error');
// // //         }
// // //     };

// // //     const inputBaseClasses = "block w-full px-3 py-2 border border-brand-subtle rounded-md shadow-sm bg-brand-card text-brand-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary sm:text-sm";

// // //     if (!isAuthenticated) {
// // //         return (
// // //             <div className="mt-8 pt-6 border-t border-brand-subtle text-center">
// // //                 <p className="text-brand-foreground mb-3">You must be logged in to post a review.</p>
// // //                 <Link to="/login" state={{ from: location }} className="inline-block bg-brand-primary text-brand-textOnPrimary py-2 px-5 rounded text-sm font-medium hover:bg-brand-primary-hover">
// // //                     Login to Review
// // //                 </Link>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="mt-8 pt-6 border-t border-brand-subtle">
// // //             <h4 className="text-lg font-semibold text-brand-heading mb-4">Write a Review</h4>
// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //                 {user && <p className="text-sm text-brand-foreground">You are reviewing as <span className="font-semibold">{user.displayName || user.username}</span>.</p>}
// // //                 <div>
// // //                     <label className="block text-sm font-medium text-brand-foreground mb-1">Your Rating <span className="text-red-500">*</span></label>
// // //                     <InteractiveStarRating rating={rating} setRating={setRating} />
// // //                 </div>
// // //                 <div>
// // //                     <label htmlFor="reviewComment" className="block text-sm font-medium text-brand-foreground mb-1">Your Review <span className="text-red-500">*</span></label>
// // //                     <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
// // //                 </div>
// // //                 <button type="submit" disabled={submittingReview} className="bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover disabled:opacity-60">
// // //                     {submittingReview ? 'Submitting...' : 'Submit Review'}
// // //                 </button>
// // //             </form>
// // //         </div>
// // //     );
// // // };


// // // // --- Main ProductReviews Component ---

// // // const ProductReviews = ({ productId, productDatabaseId, showNotification }) => {
// // //     // THIS IS THE CORRECTED QUERY CALL
// // //     const { data, loading, error, refetch } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// // //         variables: { productId: productId }, // CORRECTED: The variable must be `productId`
// // //         skip: !productId,
// // //         notifyOnNetworkStatusChange: true,
// // //     });

// // //     // Handle loading and error states first for cleaner rendering logic
// // //     if (loading) {
// // //         return <p className="text-brand-foreground/80 py-4 text-center">Loading reviews...</p>;
// // //     }
// // //     if (error) {
// // //         console.error("GraphQL Error loading reviews:", JSON.stringify(error, null, 2));
// // //         return <p className="text-red-500 py-4 text-center">Error loading reviews. Please try again later.</p>;
// // //     }

// // //     // After loading/error checks, we can safely access data
// // //     const reviewsData = data?.product?.reviews;
// // //     const reviewEdges = reviewsData?.edges || [];
// // //     const reviewCount = data?.product?.reviewCount ?? 0;
// // //     const averageRating = data?.product?.averageRating ?? 0;

// // //     return (
// // //         <div className="space-y-8 py-6">
// // //             <div>
// // //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
                
// // //                 {reviewCount > 0 && (
// // //                     <div className="flex items-center mb-6">
// // //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// // //                         <p className="ml-3 text-md text-brand-foreground/80">
// // //                             {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// // //                         </p>
// // //                     </div>
// // //                 )}

// // //                 {reviewEdges.length > 0 ? (
// // //                     <div className="space-y-6">
// // //                         {reviewEdges.map(({ node: review }) => (
// // //                             <div key={review.id} className="p-4 border border-brand-subtle rounded-lg bg-brand-card shadow">
// // //                                 <div className="flex items-start mb-2 gap-3">
// // //                                     {review.author?.node?.avatar?.url && <img src={review.author.node.avatar.url} alt={review.author.node.name || ''} className="w-10 h-10 rounded-full bg-brand-subtle object-cover" />}
// // //                                     <div className="flex-grow">
// // //                                         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
// // //                                             <p className="text-sm font-semibold text-brand-foreground">{review.author?.node?.name || 'Anonymous'}</p>
// // //                                             <StarRatingDisplay rating={review.rating || 0} size="text-base" />
// // //                                         </div>
// // //                                         <p className="text-xs text-brand-foreground/70 mt-0.5">{new Date(review.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
// // //                                     </div>
// // //                                 </div>
// // //                                 {review.content && <div className="text-sm text-brand-foreground/90 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: review.content }} />}
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 ) : (
// // //                     <p className="text-sm text-brand-foreground/80 text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// // //                 )}
// // //             </div>
            
// // //             <ReviewForm 
// // //                 productDatabaseId={productDatabaseId}
// // //                 onSubmitSuccess={refetch}
// // //                 showNotification={showNotification}
// // //             />
// // //         </div>
// // //     );
// // // };

// // // export default ProductReviews;

// // // src/components/ProductReviews.jsx
// // import React, { useState } from 'react';
// // import { useQuery, useMutation } from '@apollo/client';
// // import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql.js';
// // import { useAuth } from '../context/AuthContext.jsx';
// // import { Link, useLocation } from 'react-router-dom';

// // // Helper Components...
// // const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => { /* ... */ };
// // const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => { /* ... */ };
// // const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => { /* ... */ };

// // const ProductReviews = ({ productDatabaseId, showNotification }) => {
// //     // The component now only needs one ID to fetch everything it needs.
// //     const { data, loading, error, refetch } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
// //         variables: { id: productDatabaseId },
// //         skip: !productDatabaseId,
// //         notifyOnNetworkStatusChange: true,
// //     });

// //     if (loading) return <p className="py-4 text-center">Loading reviews...</p>;
// //     if (error) {
// //         console.error("GraphQL Error loading reviews:", JSON.stringify(error, null, 2));
// //         return <p className="py-4 text-center text-red-500">Could not load reviews.</p>;
// //     }
    
// //     // All data now comes from a single, consistent source (the GraphQL query)
// //     const reviewData = data?.product?.reviews;
// //     const reviewEdges = reviewData?.edges || [];
// //     const reviewCount = data?.product?.reviewCount ?? 0;
// //     const averageRating = data?.product?.averageRating ?? 0;

// //     return (
// //         <div className="space-y-8 py-6">
// //             <div>
// //                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
                
// //                 {reviewCount > 0 && (
// //                     <div className="flex items-center mb-6">
// //                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
// //                         <p className="ml-3 text-md">
// //                             {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
// //                         </p>
// //                     </div>
// //                 )}

// //                 {reviewEdges.length > 0 ? (
// //                     <div className="space-y-6">
// //                         {reviewEdges.map(({ node: review }) => (
// //                             <div key={review.id} className="p-4 border rounded-lg shadow-sm">
// //                                 <div className="flex items-start gap-3">
// //                                     {review.author?.node?.avatar?.url && <img src={review.author.node.avatar.url} alt="" className="w-10 h-10 rounded-full bg-gray-200" />}
// //                                     <div>
// //                                         <p className="font-semibold">{review.author?.node?.name || 'Anonymous'}</p>
// //                                         <StarRatingDisplay rating={review.rating || 0} size="text-base" />
// //                                     </div>
// //                                 </div>
// //                                 <div className="mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: review.content || '' }} />
// //                             </div>
// //                         ))}
// //                     </div>
// //                 ) : (
// //                     <p className="text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
// //                 )}
// //             </div>
            
// //             <ReviewForm 
// //                 productDatabaseId={productDatabaseId}
// //                 onSubmitSuccess={refetch}
// //                 showNotification={showNotification}
// //             />
// //         </div>
// //     );
// // };

// // export default ProductReviews;

// // src/components/ProductReviews.jsx
// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql.js';
// import { useAuth } from '../context/AuthContext.jsx';
// import { Link, useLocation } from 'react-router-dom';

// // --- Helper Components ---

// const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
//     const totalStars = 5;
//     const numericRating = parseFloat(rating) || 0;
//     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
//     return (
//         <div className="flex items-center">
//             {[...Array(totalStars)].map((_, index) => (
//                 <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
//                     &#9733;
//                 </span>
//             ))}
//         </div>
//     );
// };

// const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
//     // ... same as before
// };

// const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
//     // ... same as before
// };


// // --- Main ProductReviews Component ---

// const ProductReviews = ({ productDatabaseId, showNotification }) => {
//     const { data, loading, error, refetch } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
//         variables: { id: productDatabaseId },
//         skip: !productDatabaseId,
//         notifyOnNetworkStatusChange: true,
//     });

//     // Helper function to find the rating value from the metadata array
//     const getRatingFromMeta = (metaNodes) => {
//         if (!metaNodes || !Array.isArray(metaNodes)) return 0;
//         const ratingMeta = metaNodes.find(meta => meta.key === 'rating');
//         return ratingMeta ? parseInt(ratingMeta.value, 10) : 0;
//     };

//     if (loading) return <p className="py-4 text-center">Loading reviews...</p>;
//     if (error) {
//         console.error("GraphQL Error loading reviews:", JSON.stringify(error, null, 2));
//         return <p className="py-4 text-center text-red-500">Could not load reviews.</p>;
//     }
    
//     const reviewData = data?.product?.reviews;
//     const reviewEdges = reviewData?.edges || [];
//     const reviewCount = data?.product?.reviewCount ?? 0;
//     const averageRating = data?.product?.averageRating ?? 0;

//     return (
//         <div className="space-y-8 py-6">
//             <div>
//                 <h3 className="text-xl lg:text-2xl font-semibold text-brand-heading mb-2">Customer Reviews</h3>
                
//                 {reviewCount > 0 && (
//                     <div className="flex items-center mb-6">
//                         <StarRatingDisplay rating={averageRating} size="text-2xl" />
//                         <p className="ml-3 text-md">
//                             {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
//                         </p>
//                     </div>
//                 )}

//                 {reviewEdges.length > 0 ? (
//                     <div className="space-y-6">
//                         {reviewEdges.map(({ node: review }) => {
//                             // CORRECTED: Get rating for each review using the helper function
//                             const individualRating = getRatingFromMeta(review.commentMeta?.nodes);

//                             return (
//                                 <div key={review.id} className="p-4 border rounded-lg shadow-sm">
//                                     <div className="flex items-start gap-3">
//                                         {review.author?.node?.avatar?.url && <img src={review.author.node.avatar.url} alt="" className="w-10 h-10 rounded-full bg-gray-200" />}
//                                         <div>
//                                             <p className="font-semibold">{review.author?.node?.name || 'Anonymous'}</p>
//                                             <StarRatingDisplay rating={individualRating} size="text-base" />
//                                         </div>
//                                     </div>
//                                     <div className="mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: review.content || '' }} />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <p className="text-center py-4">No reviews yet. Be the first to share your thoughts!</p>
//                 )}
//             </div>
            
//             <ReviewForm 
//                 productDatabaseId={productDatabaseId}
//                 onSubmitSuccess={refetch}
//                 showNotification={showNotification}
//             />
//         </div>
//     );
// };

// export default ProductReviews;

// src/components/ProductReviews.jsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WOO_PRODUCT_REVIEWS_QUERY, WRITE_WOO_REVIEW_MUTATION } from '../graphql/reviews.gql.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useLocation } from 'react-router-dom';

// Helper component for displaying stars
const StarRatingDisplay = ({ rating = 0, size = "text-xl" }) => {
    const totalStars = 5;
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} className={`${size} ${index < fullStars ? 'text-brand-primary' : 'text-gray-300 dark:text-gray-500'}`} style={{ lineHeight: '1' }}>
                    &#9733;
                </span>
            ))}
        </div>
    );
};

// Helper component for interactive star selection
const InteractiveStarRating = ({ rating, setRating, size = "text-3xl" }) => {
    const totalStars = 5;
    return (
        <div className="flex">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={starValue} type="button" onClick={() => setRating(starValue)}
                        className={`${size} ${starValue <= rating ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-600'} cursor-pointer hover:text-brand-primary-hover transition-colors duration-150`}
                        aria-label={`Rate ${starValue} out of ${totalStars} stars`} style={{ lineHeight: '1' }}
                    >&#9733;</button>
                );
            })}
        </div>
    );
};


// Review Submission Form
const ReviewForm = ({ productDatabaseId, onSubmitSuccess, showNotification }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [createReviewMutation, { loading: submittingReview }] = useMutation(WRITE_WOO_REVIEW_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        if (!rating || !comment.trim()) {
            showNotification("Please provide a rating and a comment.", 'error');
            return;
        }
        try {
            await createReviewMutation({ variables: { commentOn: productDatabaseId, rating, content: comment } });
            showNotification("Review submitted successfully!", 'success');
            setRating(0); setComment('');
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            showNotification(`Failed to submit review: ${err.message}`, 'error');
        }
    };

    const inputBaseClasses = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    if (!isAuthenticated) {
        return (
            <div className="mt-8 pt-6 border-t text-center">
                <p className="text-gray-700 mb-3">You must be logged in to post a review.</p>
                <Link to="/login" state={{ from: location }} className="inline-block bg-blue-600 text-white py-2 px-5 rounded text-sm font-medium hover:bg-blue-700">
                    Login to Review
                </Link>
            </div>
        );
    }

    return (
        <div className="mt-8 pt-6 border-t">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                {user && <p className="text-sm text-gray-700">You are reviewing as <span className="font-semibold">{user.displayName || user.username}</span>.</p>}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating <span className="text-red-500">*</span></label>
                    <InteractiveStarRating rating={rating} setRating={setRating} />
                </div>
                <div>
                    <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-1">Your Review <span className="text-red-500">*</span></label>
                    <textarea id="reviewComment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required className={`${inputBaseClasses} min-h-[100px]`} />
                </div>
                <button type="submit" disabled={submittingReview} className="bg-blue-600 text-white py-2.5 px-6 rounded text-sm font-semibold hover:bg-blue-700 disabled:opacity-60">
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};


// --- Main ProductReviews Component ---

const ProductReviews = ({ productDatabaseId, showNotification }) => {
    const { data, loading, error, refetch } = useQuery(GET_WOO_PRODUCT_REVIEWS_QUERY, {
        variables: { id: productDatabaseId },
        skip: !productDatabaseId,
    });

    if (loading) return <p className="py-4 text-center">Loading reviews...</p>;
    if (error) {
        console.error("GraphQL Error loading reviews:", JSON.stringify(error, null, 2));
        return <p className="py-4 text-center text-red-500">Could not load reviews.</p>;
    }
    
    const reviewData = data?.product?.reviews;
    const reviewEdges = reviewData?.edges || [];
    const reviewCount = data?.product?.reviewCount ?? 0;
    const averageRating = data?.product?.averageRating ?? 0;

    return (
        <div className="space-y-8 py-6">
            <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">Customer Reviews</h3>
                
                {reviewCount > 0 && (
                    <div className="flex items-center mb-6">
                        <StarRatingDisplay rating={averageRating} size="text-2xl" />
                        <p className="ml-3 text-md text-gray-700">
                            {averageRating.toFixed(1)} based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}

                {reviewEdges.length > 0 ? (
                    <div className="space-y-6">
                        {reviewEdges.map(({ node: review }) => (
                            <div key={review.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                <div className="flex items-start gap-3">
                                    {review.author?.node?.avatar?.url && <img src={review.author.node.avatar.url} alt="" className="w-10 h-10 rounded-full bg-gray-200" />}
                                    <div>
                                        <p className="font-semibold text-gray-800">{review.author?.node?.name || 'Anonymous'}</p>
                                        {/* CORRECTED: Displaying individual stars using the new `rating` field */}
                                        <StarRatingDisplay rating={review.rating} size="text-base" />
                                    </div>
                                </div>
                                <div className="mt-2 prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: review.content || '' }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-4 text-gray-600">No reviews yet. Be the first to share your thoughts!</p>
                )}
            </div>
            
            <ReviewForm 
                productDatabaseId={productDatabaseId}
                onSubmitSuccess={refetch}
                showNotification={showNotification}
            />
        </div>
    );
};

export default ProductReviews;