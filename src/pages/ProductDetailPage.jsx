// // // // src/pages/ProductDetailPage.jsx
// // // import React, { useState, useEffect, Fragment, useRef } from 'react';
// // // import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// // // import { fetchProductById, fetchProducts } from '../api/woocommerce';

// // // // Styling & Components
// // // import Slider from 'react-slick';
// // // import 'slick-carousel/slick/slick.css';
// // // import 'slick-carousel/slick/slick-theme.css';
// // // import { FaStar, FaRegStar, FaCheckCircle, FaInfoCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa'; // Added FaShoppingCart

// // // // Contexts & Hooks
// // // import { useAuth } from '../context/AuthContext';
// // // import { useCart } from '../context/CartContext';
// // // import ProductCard from '../components/ProductCard'; 

// // // // --- Reusable Components ---
// // // const StarRating = ({ rating = 0 }) => {
// // //     const totalStars = 5;
// // //     const numericRating = parseFloat(rating) || 0;
// // //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// // //     return (
// // //         <div className="flex text-brand-primary my-2"> {/* Theme: Star color */}
// // //             {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
// // //             {[...Array(totalStars - fullStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
// // //         </div>
// // //     );
// // // };

// // // const TabButton = ({ children, isActive, onClick }) => (
// // //     <button
// // //         onClick={onClick}
// // //         className={`py-3 px-4 text-sm sm:text-base font-medium border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background transition-colors duration-200 whitespace-nowrap ${
// // //             isActive
// // //                 ? 'border-brand-primary text-brand-primary' // Theme: Active tab
// // //                 : 'border-transparent text-brand-foreground/70 hover:text-brand-primary hover:border-brand-primary/50' // Theme: Inactive tab
// // //         }`}
// // //     >
// // //         {children}
// // //     </button>
// // // );

// // // const NotificationBox = ({ message, type, onClose }) => {
// // //     const typeStyles = {
// // //         success: {
// // //             bg: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300',
// // //             iconColor: 'text-green-500 dark:text-green-400',
// // //             icon: FaCheckCircle,
// // //         },
// // //         error: {
// // //             bg: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300',
// // //             iconColor: 'text-red-500 dark:text-red-400',
// // //             icon: FaTimesCircle,
// // //         },
// // //         info: {
// // //             bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
// // //             iconColor: 'text-blue-500 dark:text-blue-400',
// // //             icon: FaInfoCircle,
// // //         },
// // //     };

// // //     const currentStyle = typeStyles[type] || typeStyles.info;
// // //     const IconComponent = currentStyle.icon;

// // //     return (
// // //         <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-md border shadow-lg flex items-start max-w-sm transition-all duration-300 ease-in-out ${currentStyle.bg} text-brand-foreground`}>
// // //             <IconComponent className={`h-5 w-5 mr-3 flex-shrink-0 ${currentStyle.iconColor}`} aria-hidden="true" />
// // //             <div className="flex-grow text-sm">
// // //                 {message}
// // //             </div>
// // //             <button 
// // //                 onClick={onClose} 
// // //                 className={`ml-4 -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${currentStyle.iconColor} focus-visible:ring-current`}
// // //                 aria-label="Dismiss notification"
// // //             >
// // //                 <FaTimesCircle className="h-4 w-4" aria-hidden="true" />
// // //             </button>
// // //         </div>
// // //     );
// // // };


// // // // --- Main Page Component ---
// // // const ProductDetailPage = () => {
// // //     const { productId } = useParams();
// // //     const navigate = useNavigate();
// // //     const location = useLocation();

// // //     const [quantity, setQuantity] = useState(1);
// // //     const [activeTab, setActiveTab] = useState('description');
// // //     const [product, setProduct] = useState(null);
// // //     const [relatedProducts, setRelatedProducts] = useState([]);
// // //     const [loadingProduct, setLoadingProduct] = useState(true);
// // //     const [productError, setProductError] = useState(null);
// // //     const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
// // //     const notificationTimeoutRef = useRef(null);

// // //     const { isAuthenticated, loading: authLoading, logout } = useAuth();
// // //     const { addItem, addingItem, addItemError: cartAddItemErrorHook } = useCart();

// // //     // Slick Slider settings (customize as needed)
// // //     const gallerySettings = {
// // //         dots: true,
// // //         infinite: true,
// // //         speed: 500,
// // //         slidesToShow: 1,
// // //         slidesToScroll: 1,
// // //         adaptiveHeight: true,
// // //         // customPaging: i => ( <div className="w-2.5 h-2.5 rounded-full cursor-pointer slick-dot-inactive"></div> ), // Defined in index.css
// // //         // nextArrow: <SampleNextArrow />, // Define custom arrows if needed
// // //         // prevArrow: <SamplePrevArrow />,
// // //     };

// // //     useEffect(() => {
// // //         if (!productId) {
// // //             setProductError("No product identifier found.");
// // //             setLoadingProduct(false);
// // //             return;
// // //         }
// // //         const loadProductData = async () => {
// // //             setLoadingProduct(true);
// // //             setProductError(null);
// // //             setProduct(null);
// // //             setRelatedProducts([]);
// // //             try {
// // //                 const fetchedProduct = await fetchProductById(productId);
// // //                 if (fetchedProduct && fetchedProduct.id) {
// // //                     setProduct(fetchedProduct);
// // //                     setActiveTab(fetchedProduct.description ? 'description' : (fetchedProduct.acf?.ingredients ? 'ingredients' : 'how_to_use'));

// // //                     if (fetchedProduct.related_ids && fetchedProduct.related_ids.length > 0) {
// // //                         const related = await fetchProducts({ include: fetchedProduct.related_ids.slice(0, 4).join(','), per_page: 4 });
// // //                         setRelatedProducts(related);
// // //                     }
// // //                 } else {
// // //                     setProductError(`Product not found.`);
// // //                 }
// // //             } catch (err) {
// // //                  setProductError(err.message || `Failed to load product details.`);
// // //             } finally {
// // //                 setLoadingProduct(false);
// // //             }
// // //         };
// // //         loadProductData();
// // //     }, [productId]);

// // //     useEffect(() => {
// // //         return () => clearTimeout(notificationTimeoutRef.current);
// // //     }, []);

// // //     const showNotification = (message, type = 'info', duration = 4000) => {
// // //         clearTimeout(notificationTimeoutRef.current);
// // //         setNotification({ show: true, message, type });
// // //         notificationTimeoutRef.current = setTimeout(() => {
// // //             setNotification(prev => ({ ...prev, show: false }));
// // //         }, duration);
// // //     };

// // //     const closeNotification = () => {
// // //         clearTimeout(notificationTimeoutRef.current);
// // //         setNotification(prev => ({ ...prev, show: false }));
// // //     };

// // //     const handleAddToCart = () => {
// // //         if (authLoading) return;
// // //         if (!isAuthenticated) {
// // //             showNotification("Please log in to add items to your cart.", 'info');
// // //             navigate('/login', { state: { from: location } });
// // //             return;
// // //         }
// // //         const productDatabaseId = product?.databaseId || product?.id;
// // //         if (!productDatabaseId) {
// // //             showNotification("Cannot add item: Product ID is missing.", 'error');
// // //             return;
// // //         }
// // //         if (product?.type === 'variable') {
// // //             showNotification("This is a variable product. Please select options on its page.", 'info');
// // //             // Potentially navigate to a more detailed variable product selection view if not already there
// // //             // or ensure variation selection UI is present on this page.
// // //             return;
// // //         }
// // //         addItem({ productId: productDatabaseId, quantity })
// // //             .then(() => showNotification(`${product?.name || 'Item'} added to cart!`, 'success'))
// // //             .catch(err => {
// // //                 const isAuthError = err.message.includes("Expired token") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
// // //                 if (isAuthError) {
// // //                     showNotification("Your session has expired. Please log in again.", 'error');
// // //                     logout(); // This should also clear Apollo cache via AuthContext
// // //                     navigate('/login', { replace: true, state: { from: location } });
// // //                 } else {
// // //                     showNotification(`Failed to add item: ${err.message || 'Please try again.'}`, 'error');
// // //                 }
// // //             });
// // //     };

// // //     const isVariable = product?.type === 'variable';
// // //     const isInStock = product?.stock_status === 'instock';
// // //     const hasImages = product?.images && Array.isArray(product.images) && product.images.length > 0;
// // //     const highlights = [product?.acf?.highlight_1, product?.acf?.highlight_2, product?.acf?.highlight_3, product?.acf?.highlight_4].filter(Boolean);

// // //     if (loadingProduct) {
// // //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Loading product details...</div>;
// // //     }
// // //     if (productError) {
// // //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-red-500">Error: {productError}</div>;
// // //     }
// // //     if (!product) {
// // //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Product not found.</div>;
// // //     }

// // //     return (
// // //         <>
// // //             {notification.show && (
// // //                 <NotificationBox message={notification.message} type={notification.type} onClose={closeNotification} />
// // //             )}
// // //             {/* Assuming App.jsx or index.css sets bg-brand-background for the page */}
// // //             <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
// // //                     {/* Left: Image Gallery */}
// // //                     <div className="product-gallery sticky top-24"> {/* Added sticky positioning */}
// // //                         {hasImages ? (
// // //                             product.images.length > 1 ? (
// // //                                 <Slider {...gallerySettings}>
// // //                                     {product.images.map((image) => (
// // //                                         <div key={image.id} className="aspect-square bg-brand-card rounded-lg overflow-hidden">
// // //                                             <img
// // //                                                 src={image.src} alt={image.alt || product.name}
// // //                                                 className="w-full h-full object-contain"
// // //                                                 onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}
// // //                                             />
// // //                                         </div>
// // //                                     ))}
// // //                                 </Slider>
// // //                             ) : (
// // //                                 <div className="aspect-square bg-brand-card rounded-lg overflow-hidden shadow-sm">
// // //                                     <img
// // //                                         src={product.images[0].src} alt={product.images[0].alt || product.name}
// // //                                         className="w-full h-full object-contain"
// // //                                         onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}
// // //                                     />
// // //                                 </div>
// // //                             )
// // //                         ) : (
// // //                             <div className="aspect-square bg-brand-subtle/50 rounded-lg flex items-center justify-center shadow-sm">
// // //                                 <span className="text-brand-foreground/70">No Image Available</span>
// // //                             </div>
// // //                         )}
// // //                     </div>

// // //                     {/* Right: Product Info */}
// // //                     <div className="space-y-5">
// // //                         <h1 className="text-3xl lg:text-4xl font-bold text-brand-heading leading-tight">{product.name}</h1>
                        
// // //                         {product.short_description && (
// // //                             <div
// // //                                 className="text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1" // Theme: Prose for short description
// // //                                 dangerouslySetInnerHTML={{ __html: product.short_description }}
// // //                             />
// // //                         )}

// // //                         <StarRating rating={parseFloat(product.average_rating || 0)} />

// // //                         {product.price_html ? (
// // //                             <div
// // //                                 className="text-2xl font-semibold text-brand-primary-light my-1" // Theme: Price color
// // //                                 dangerouslySetInnerHTML={{ __html: product.price_html }} />
// // //                         ) : <p className="my-1 text-brand-foreground/70">Price unavailable</p>}

// // //                         {highlights.length > 0 && (
// // //                             <div className="my-3 space-y-1.5 text-sm">
// // //                                 <h3 className="font-semibold text-brand-foreground mb-1.5">Key Highlights:</h3>
// // //                                 <ul className='list-none pl-0 space-y-1'>
// // //                                 {highlights.map((text, index) => (
// // //                                     <li key={index} className="flex items-start text-brand-foreground/90">
// // //                                         <FaCheckCircle className="text-brand-accent mr-2 mt-0.5 flex-shrink-0" size={16}/> {/* Theme: Accent for checkmark */}
// // //                                         <span>{text}</span>
// // //                                     </li>
// // //                                 ))}
// // //                                 </ul>
// // //                             </div>
// // //                         )}

// // //                         {/* Cart Section */}
// // //                         <div className="my-5 pt-5 border-t border-brand-subtle space-y-4">
// // //                             {isVariable ? (
// // //                                 <div className="p-3 border border-blue-500/30 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm">
// // //                                     This is a variable product. More options might be available.
// // //                                     <Link to={`/products/${product.slug || product.id}`} className="font-medium underline ml-1 hover:text-blue-500 dark:hover:text-blue-200">View Options</Link>
// // //                                 </div>
// // //                             ) : !isInStock ? (
// // //                                 <p className="font-semibold text-red-500 p-3 border border-red-500/30 bg-red-500/10 rounded text-center">Out of Stock</p>
// // //                             ) : (
// // //                                 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
// // //                                     <div className="flex items-center">
// // //                                         <label htmlFor="quantity" className="font-medium mr-2 text-sm text-brand-foreground/90">Quantity:</label>
// // //                                         <input
// // //                                             type="number"
// // //                                             id="quantity"
// // //                                             name="quantity"
// // //                                             min="1"
// // //                                             max={product.stock_quantity || undefined}
// // //                                             value={quantity}
// // //                                             onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
// // //                                             className="w-16 border border-brand-subtle rounded px-2 py-1.5 text-center text-sm bg-brand-card text-brand-foreground focus:ring-brand-primary focus:border-brand-primary"
// // //                                             aria-label="Product quantity"
// // //                                         />
// // //                                     </div>
// // //                                     <button
// // //                                         onClick={handleAddToCart}
// // //                                         disabled={authLoading || addingItem}
// // //                                         className="flex items-center justify-center bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
// // //                                     >
// // //                                         <FaShoppingCart className="mr-2" />
// // //                                         {addingItem ? 'Adding...' : (isAuthenticated ? 'Add to Cart' : 'Login to Add')}
// // //                                     </button>
// // //                                 </div>
// // //                             )}
// // //                             {cartAddItemErrorHook && !cartAddItemErrorHook.message.includes("Expired token") && (
// // //                                 <p className="text-red-500 text-xs mt-1.5 text-center sm:text-left">Error: {cartAddItemErrorHook.message}</p>
// // //                             )}
// // //                         </div>

// // //                         <div className="text-xs text-brand-foreground/70 space-y-0.5 border-t border-brand-subtle pt-4">
// // //                             <p> Status: <span className={`font-semibold ${isInStock ? 'text-green-500' : 'text-red-500'}`}> {isInStock ? 'In Stock' : 'Out of Stock'} {isInStock && product.manage_stock && product.stock_quantity != null && ` (${product.stock_quantity} available)`} </span> </p>
// // //                             {product.sku && <p>SKU: <span className='text-brand-foreground/90'>{product.sku}</span></p>}
// // //                              {product.categories && product.categories.length > 0 && (
// // //                                 <p>Categories: {product.categories.map(cat => (
// // //                                     <Link key={cat.id} to={`/category/${cat.slug}`} className="hover:text-brand-primary underline ml-1">{cat.name}</Link>
// // //                                 ))}.
// // //                                 </p>
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* --- Tabs Section --- */}
// // //                 {(product.description || product.acf?.ingredients || product.acf?.how_to_use) && (
// // //                     <div className="my-10 md:my-16 border-t border-brand-subtle pt-6 md:pt-8">
// // //                         <div className="border-b border-brand-subtle mb-6">
// // //                             <nav className="-mb-px flex space-x-3 sm:space-x-5 flex-wrap" aria-label="Product details tabs">
// // //                                 {product.description && (
// // //                                     <TabButton isActive={activeTab === 'description'} onClick={() => setActiveTab('description')}>Description</TabButton>
// // //                                 )}
// // //                                 {product.acf?.ingredients && product.acf.ingredients.trim() !== '' && (
// // //                                     <TabButton isActive={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>Ingredients</TabButton>
// // //                                 )}
// // //                                 {product.acf?.how_to_use && product.acf.how_to_use.trim() !== '' && (
// // //                                     <TabButton isActive={activeTab === 'how_to_use'} onClick={() => setActiveTab('how_to_use')}>How to Use</TabButton>
// // //                                 )}
// // //                                 {/* TODO: Add Reviews Tab */}
// // //                             </nav>
// // //                         </div>
// // //                         {/* Ensure your index.css .prose styles are themed for brand-foreground, brand-heading, brand-primary etc. */}
// // //                         <div className="py-4 prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground">
// // //                             {activeTab === 'description' && product.description && (
// // //                                 <div dangerouslySetInnerHTML={{ __html: product.description }} />
// // //                             )}
// // //                             {activeTab === 'ingredients' && product.acf?.ingredients && (
// // //                                 <div dangerouslySetInnerHTML={{ __html: product.acf.ingredients }} />
// // //                             )}
// // //                             {activeTab === 'how_to_use' && product.acf?.how_to_use && (
// // //                                 <div dangerouslySetInnerHTML={{ __html: product.acf.how_to_use }} />
// // //                             )}
// // //                         </div>
// // //                     </div>
// // //                 )}

// // //                 {/* --- Related Products --- */}
// // //                 {relatedProducts.length > 0 && (
// // //                     <div className="my-10 md:my-16 border-t border-brand-subtle pt-8">
// // //                         <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-left text-brand-heading">You May Also Like</h2>
// // //                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
// // //                             {relatedProducts.map(related => (
// // //                                 <ProductCard key={related.id} product={related} />
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </>
// // //     );
// // // };

// // // export default ProductDetailPage;

// // // src/pages/ProductDetailPage.jsx
// // import React, { useState, useEffect, Fragment, useRef } from 'react';
// // import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// // import { fetchProductById, fetchProducts } from '../api/woocommerce';

// // // Styling & Components
// // import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';
// // import { FaStar, FaRegStar, FaCheckCircle, FaInfoCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';

// // // Contexts & Hooks
// // import { useAuth } from '../context/AuthContext';
// // import { useCart } from '../context/CartContext';
// // import ProductCard from '../components/ProductCard';
// // import ProductReviews from '../components/ProductReviews'; // IMPORT THE NEW COMPONENT

// // // --- Reusable Components ---
// // const StarRating = ({ rating = 0 }) => {
// //     const totalStars = 5;
// //     const numericRating = parseFloat(rating) || 0;
// //     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
// //     return (
// //         <div className="flex text-brand-primary my-2"> {/* Theme: Star color */}
// //             {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
// //             {[...Array(totalStars - fullStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
// //         </div>
// //     );
// // };

// // const TabButton = ({ children, isActive, onClick }) => (
// //     <button
// //         onClick={onClick}
// //         className={`py-3 px-4 text-sm sm:text-base font-medium border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background transition-colors duration-200 whitespace-nowrap ${
// //             isActive
// //                 ? 'border-brand-primary text-brand-primary' // Theme: Active tab
// //                 : 'border-transparent text-brand-foreground/70 hover:text-brand-primary hover:border-brand-primary/50' // Theme: Inactive tab
// //         }`}
// //     >
// //         {children}
// //     </button>
// // );

// // const NotificationBox = ({ message, type, onClose }) => {
// //     const typeStyles = {
// //         success: {
// //             bg: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300',
// //             iconColor: 'text-green-500 dark:text-green-400',
// //             icon: FaCheckCircle,
// //         },
// //         error: {
// //             bg: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300',
// //             iconColor: 'text-red-500 dark:text-red-400',
// //             icon: FaTimesCircle,
// //         },
// //         info: {
// //             bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300',
// //             iconColor: 'text-blue-500 dark:text-blue-400',
// //             icon: FaInfoCircle,
// //         },
// //     };

// //     const currentStyle = typeStyles[type] || typeStyles.info;
// //     const IconComponent = currentStyle.icon;

// //     return (
// //         <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-md border shadow-lg flex items-start max-w-sm transition-all duration-300 ease-in-out ${currentStyle.bg} text-brand-foreground`}>
// //             <IconComponent className={`h-5 w-5 mr-3 flex-shrink-0 ${currentStyle.iconColor}`} aria-hidden="true" />
// //             <div className="flex-grow text-sm">
// //                 {message}
// //             </div>
// //             <button 
// //                 onClick={onClose} 
// //                 className={`ml-4 -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${currentStyle.iconColor} focus-visible:ring-current`}
// //                 aria-label="Dismiss notification"
// //             >
// //                 <FaTimesCircle className="h-4 w-4" aria-hidden="true" />
// //             </button>
// //         </div>
// //     );
// // };


// // // --- Main Page Component ---
// // const ProductDetailPage = () => {
// //     const { productId: routeProductId } = useParams(); // Renamed to avoid confusion with product.id
// //     const navigate = useNavigate();
// //     const location = useLocation();

// //     const [quantity, setQuantity] = useState(1);
// //     const [activeTab, setActiveTab] = useState('description');
// //     const [product, setProduct] = useState(null); // Holds data from WC REST API
// //     // NEW: State to hold GraphQL Product ID if different from routeProductId or product.id
// //     const [graphQLProductId, setGraphQLProductId] = useState(null); 
// //     const [relatedProducts, setRelatedProducts] = useState([]);
// //     const [loadingProduct, setLoadingProduct] = useState(true);
// //     const [productError, setProductError] = useState(null);
// //     const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
// //     const notificationTimeoutRef = useRef(null);

// //     const { isAuthenticated, loading: authLoading, logout } = useAuth();
// //     const { addItem, addingItem, addItemError: cartAddItemErrorHook } = useCart();

// //     const gallerySettings = {
// //         dots: true,
// //         infinite: true,
// //         speed: 500,
// //         slidesToShow: 1,
// //         slidesToScroll: 1,
// //         adaptiveHeight: true,
// //     };

// //     useEffect(() => {
// //         if (!routeProductId) {
// //             setProductError("No product identifier found.");
// //             setLoadingProduct(false);
// //             return;
// //         }
// //         const loadProductData = async () => {
// //             setLoadingProduct(true);
// //             setProductError(null);
// //             setProduct(null);
// //             setGraphQLProductId(null); // Reset GraphQL ID
// //             setRelatedProducts([]);
// //             try {
// //                 const fetchedProduct = await fetchProductById(routeProductId); // Fetches by slug or numeric ID
// //                 if (fetchedProduct && fetchedProduct.id) {
// //                     setProduct(fetchedProduct);

// //                     // --- Setting the GraphQL Product ID ---
// //                     // This is a CRITICAL step. The `product.id` from WC REST API is the databaseId.
// //                     // WPGraphQL uses global IDs (base64 encoded). You need to get this global ID.
// //                     // OPTION 1: If `routeProductId` IS the GraphQL Global ID (less likely if it's a slug)
// //                     // if (isGraphQLGlobalId(routeProductId)) { // You'd need a helper to check this
// //                     //    setGraphQLProductId(routeProductId);
// //                     // }
// //                     // OPTION 2: Construct it if you know the type and databaseId (can be fragile)
// //                     // A common pattern is `btoa(`Product:${fetchedProduct.id}`), but VERIFY this format.
// //                     setGraphQLProductId(btoa(`Product:${fetchedProduct.id}`)); // Replace with actual logic if this isn't correct
                    
// //                     // OPTION 3 (Most Robust): Perform a quick GraphQL query here to get the product by slug/databaseId
// //                     // and retrieve its global `id`. This is the recommended way if Option 1 or 2 aren't reliable.
// //                     // Example (conceptual, would require another GQL query):
// //                     // const gqlProduct = await client.query({ query: GET_PRODUCT_BY_SLUG_OR_DBID_QUERY, variables: { id: fetchedProduct.id, slug: fetchedProduct.slug } });
// //                     // if (gqlProduct.data?.product?.id) setGraphQLProductId(gqlProduct.data.product.id);

// //                     let initialTab = 'description';
// //                     if (!fetchedProduct.description && fetchedProduct.acf?.ingredients) initialTab = 'ingredients';
// //                     else if (!fetchedProduct.description && !fetchedProduct.acf?.ingredients && fetchedProduct.acf?.how_to_use) initialTab = 'how_to_use';
// //                     else if (!fetchedProduct.description && !fetchedProduct.acf?.ingredients && !fetchedProduct.acf?.how_to_use) initialTab = 'reviews';
// //                     setActiveTab(initialTab);

// //                     if (fetchedProduct.related_ids && fetchedProduct.related_ids.length > 0) {
// //                         const related = await fetchProducts({ include: fetchedProduct.related_ids.slice(0, 4).join(','), per_page: 4 });
// //                         setRelatedProducts(related);
// //                     }
// //                 } else {
// //                     setProductError(`Product not found with identifier: ${routeProductId}`);
// //                 }
// //             } catch (err) {
// //                 setProductError(err.message || `Failed to load product details.`);
// //                 console.error("Error in loadProductData:", err);
// //             } finally {
// //                 setLoadingProduct(false);
// //             }
// //         };
// //         loadProductData();
// //     }, [routeProductId]);

// //     useEffect(() => {
// //         return () => clearTimeout(notificationTimeoutRef.current);
// //     }, []);

// //     const showNotification = (message, type = 'info', duration = 4000) => {
// //         clearTimeout(notificationTimeoutRef.current);
// //         setNotification({ show: true, message, type });
// //         notificationTimeoutRef.current = setTimeout(() => {
// //             setNotification(prev => ({ ...prev, show: false }));
// //         }, duration);
// //     };

// //     const closeNotification = () => {
// //         clearTimeout(notificationTimeoutRef.current);
// //         setNotification(prev => ({ ...prev, show: false }));
// //     };

// //     const handleAddToCart = () => {
// //         if (authLoading) return;
// //         if (!isAuthenticated) {
// //             showNotification("Please log in to add items to your cart.", 'info');
// //             navigate('/login', { state: { from: location } });
// //             return;
// //         }
// //         // Use product.databaseId from GraphQL or product.id from REST for the mutation if it expects databaseId
// //         const cartProductId = product?.databaseId || product?.id; 
// //         if (!cartProductId) {
// //             showNotification("Cannot add item: Product ID is missing.", 'error');
// //             return;
// //         }
// //         if (product?.type === 'variable') {
// //             showNotification("This is a variable product. Please select options on its page.", 'info');
// //             return;
// //         }
// //         addItem({ productId: cartProductId, quantity }) // Ensure addItem mutation uses correct ID type
// //             .then(() => showNotification(`${product?.name || 'Item'} added to cart!`, 'success'))
// //             .catch(err => {
// //                 const isAuthError = err.message.includes("Expired token") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
// //                 if (isAuthError) {
// //                     showNotification("Your session has expired. Please log in again.", 'error');
// //                     logout(); 
// //                     navigate('/login', { replace: true, state: { from: location } });
// //                 } else {
// //                     showNotification(`Failed to add item: ${err.message || 'Please try again.'}`, 'error');
// //                 }
// //             });
// //     };

// //     const isVariable = product?.type === 'variable';
// //     const isInStock = product?.stock_status === 'instock';
// //     const hasImages = product?.images && Array.isArray(product.images) && product.images.length > 0;
// //     const highlights = [product?.acf?.highlight_1, product?.acf?.highlight_2, product?.acf?.highlight_3, product?.acf?.highlight_4].filter(Boolean);

// //     if (loadingProduct) {
// //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Loading product details...</div>;
// //     }
// //     if (productError) {
// //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-red-500">Error: {productError}</div>;
// //     }
// //     if (!product) {
// //         return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Product not found.</div>;
// //     }
// //     // For review count in tab, we might need to wait for GraphQL data if it's not in `product`
// //     // This is a simplification; ideally, the review count comes from the same source as the reviews.
// //     const displayReviewCount = product?.review_count || 0; 


// //     return (
// //         <>
// //             {notification.show && (
// //                 <NotificationBox message={notification.message} type={notification.type} onClose={closeNotification} />
// //             )}
// //             <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
// //                     {/* Left: Image Gallery */}
// //                     <div className="product-gallery sticky top-24">
// //                         {hasImages ? (
// //                             product.images.length > 1 ? (
// //                                 <Slider {...gallerySettings}>
// //                                     {product.images.map((image) => (
// //                                         <div key={image.id} className="aspect-square bg-brand-card rounded-lg overflow-hidden">
// //                                             <img
// //                                                 src={image.src} alt={image.alt || product.name}
// //                                                 className="w-full h-full object-contain"
// //                                                 onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}
// //                                             />
// //                                         </div>
// //                                     ))}
// //                                 </Slider>
// //                             ) : (
// //                                 <div className="aspect-square bg-brand-card rounded-lg overflow-hidden shadow-sm">
// //                                     <img
// //                                         src={product.images[0].src} alt={product.images[0].alt || product.name}
// //                                         className="w-full h-full object-contain"
// //                                         onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}
// //                                     />
// //                                 </div>
// //                             )
// //                         ) : (
// //                             <div className="aspect-square bg-brand-subtle/50 rounded-lg flex items-center justify-center shadow-sm">
// //                                 <span className="text-brand-foreground/70">No Image Available</span>
// //                             </div>
// //                         )}
// //                     </div>

// //                     {/* Right: Product Info */}
// //                     <div className="space-y-5">
// //                         <h1 className="text-3xl lg:text-4xl font-bold text-brand-heading leading-tight">{product.name}</h1>
                        
// //                         {product.short_description && (
// //                             <div
// //                                 className="text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1"
// //                                 dangerouslySetInnerHTML={{ __html: product.short_description }}
// //                             />
// //                         )}

// //                         <StarRating rating={parseFloat(product.average_rating || 0)} />

// //                         {product.price_html ? (
// //                             <div
// //                                 className="text-2xl font-semibold text-brand-primary-light my-1"
// //                                 dangerouslySetInnerHTML={{ __html: product.price_html }} />
// //                         ) : <p className="my-1 text-brand-foreground/70">Price unavailable</p>}

// //                         {highlights.length > 0 && (
// //                             <div className="my-3 space-y-1.5 text-sm">
// //                                 <h3 className="font-semibold text-brand-foreground mb-1.5">Key Highlights:</h3>
// //                                 <ul className='list-none pl-0 space-y-1'>
// //                                 {highlights.map((text, index) => (
// //                                     <li key={index} className="flex items-start text-brand-foreground/90">
// //                                         <FaCheckCircle className="text-brand-accent mr-2 mt-0.5 flex-shrink-0" size={16}/>
// //                                         <span>{text}</span>
// //                                     </li>
// //                                 ))}
// //                                 </ul>
// //                             </div>
// //                         )}

// //                         {/* Cart Section */}
// //                         <div className="my-5 pt-5 border-t border-brand-subtle space-y-4">
// //                             {isVariable ? (
// //                                 <div className="p-3 border border-blue-500/30 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm">
// //                                     This is a variable product. More options might be available.
// //                                     <Link to={`/products/${product.slug || product.id}`} className="font-medium underline ml-1 hover:text-blue-500 dark:hover:text-blue-200">View Options</Link>
// //                                 </div>
// //                             ) : !isInStock ? (
// //                                 <p className="font-semibold text-red-500 p-3 border border-red-500/30 bg-red-500/10 rounded text-center">Out of Stock</p>
// //                             ) : (
// //                                 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
// //                                     <div className="flex items-center">
// //                                         <label htmlFor="quantity" className="font-medium mr-2 text-sm text-brand-foreground/90">Quantity:</label>
// //                                         <input
// //                                             type="number"
// //                                             id="quantity"
// //                                             name="quantity"
// //                                             min="1"
// //                                             max={product.stock_quantity || undefined}
// //                                             value={quantity}
// //                                             onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
// //                                             className="w-16 border border-brand-subtle rounded px-2 py-1.5 text-center text-sm bg-brand-card text-brand-foreground focus:ring-brand-primary focus:border-brand-primary"
// //                                             aria-label="Product quantity"
// //                                         />
// //                                     </div>
// //                                     <button
// //                                         onClick={handleAddToCart}
// //                                         disabled={authLoading || addingItem}
// //                                         className="flex items-center justify-center bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
// //                                     >
// //                                         <FaShoppingCart className="mr-2" />
// //                                         {addingItem ? 'Adding...' : (isAuthenticated ? 'Add to Cart' : 'Login to Add')}
// //                                     </button>
// //                                 </div>
// //                             )}
// //                             {cartAddItemErrorHook && !cartAddItemErrorHook.message.includes("Expired token") && (
// //                                 <p className="text-red-500 text-xs mt-1.5 text-center sm:text-left">Error: {cartAddItemErrorHook.message}</p>
// //                             )}
// //                         </div>

// //                         <div className="text-xs text-brand-foreground/70 space-y-0.5 border-t border-brand-subtle pt-4">
// //                             <p> Status: <span className={`font-semibold ${isInStock ? 'text-green-500' : 'text-red-500'}`}> {isInStock ? 'In Stock' : 'Out of Stock'} {isInStock && product.manage_stock && product.stock_quantity != null && ` (${product.stock_quantity} available)`} </span> </p>
// //                             {product.sku && <p>SKU: <span className='text-brand-foreground/90'>{product.sku}</span></p>}
// //                              {product.categories && product.categories.length > 0 && (
// //                                 <p>Categories: {product.categories.map(cat => (
// //                                     <Link key={cat.id} to={`/category/${cat.slug}`} className="hover:text-brand-primary underline ml-1">{cat.name}</Link>
// //                                 ))}.
// //                                 </p>
// //                             )}
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* --- Tabs Section --- */}
// //                 {/* Always render tabs container if product exists, so Reviews tab can show */}
// //                 <div className="my-10 md:my-16 border-t border-brand-subtle pt-6 md:pt-8">
// //                     <div className="border-b border-brand-subtle mb-6">
// //                         <nav className="-mb-px flex space-x-3 sm:space-x-5 flex-wrap" aria-label="Product details tabs">
// //                             {product.description && (
// //                                 <TabButton isActive={activeTab === 'description'} onClick={() => setActiveTab('description')}>Description</TabButton>
// //                             )}
// //                             {product.acf?.ingredients && product.acf.ingredients.trim() !== '' && (
// //                                 <TabButton isActive={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>Ingredients</TabButton>
// //                             )}
// //                             {product.acf?.how_to_use && product.acf.how_to_use.trim() !== '' && (
// //                                 <TabButton isActive={activeTab === 'how_to_use'} onClick={() => setActiveTab('how_to_use')}>How to Use</TabButton>
// //                             )}
// //                             <TabButton isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
// //                                 Reviews ({displayReviewCount})
// //                             </TabButton>
// //                         </nav>
// //                     </div>
                    
// //                     <div className="py-4"> {/* Removed prose here, apply it inside specific tabs if needed */}
// //                         {activeTab === 'description' && product.description && (
// //                             <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground"
// //                                  dangerouslySetInnerHTML={{ __html: product.description }} />
// //                         )}
// //                         {activeTab === 'ingredients' && product.acf?.ingredients && (
// //                             <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground"
// //                                  dangerouslySetInnerHTML={{ __html: product.acf.ingredients }} />
// //                         )}
// //                         {activeTab === 'how_to_use' && product.acf?.how_to_use && (
// //                             <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground"
// //                                  dangerouslySetInnerHTML={{ __html: product.acf.how_to_use }} />
// //                         )}
// //                         {activeTab === 'reviews' && (
// //                             graphQLProductId && product.id ? ( // Ensure both IDs are available
// //                                 <ProductReviews
// //                                     productId={graphQLProductId}      // This MUST be the GraphQL Global ID
// //                                     productDatabaseId={product.id}  // This is the WordPress Post ID (databaseId)
// //                                     showNotification={showNotification}
// //                                 />
// //                             ) : (
// //                                 <p className="text-brand-foreground/70">Review information is currently loading or unavailable.</p>
// //                             )
// //                         )}
// //                     </div>
// //                 </div>

// //                 {/* --- Related Products --- */}
// //                 {relatedProducts.length > 0 && (
// //                     <div className="my-10 md:my-16 border-t border-brand-subtle pt-8">
// //                         <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-left text-brand-heading">You May Also Like</h2>
// //                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
// //                             {relatedProducts.map(related => (
// //                                 <ProductCard key={related.id} product={related} />
// //                             ))}
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </>
// //     );
// // };

// // export default ProductDetailPage;

// // src/pages/ProductDetailPage.jsx
// import React, { useState, useEffect, Fragment, useRef } from 'react';
// import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
// import { fetchProductById, fetchProducts } from '../api/woocommerce'; // For main product data
// // If you use Apollo Client for main product data too, adjust imports
// // import { useQuery } from '@apollo/client'; 
// // import { GET_PRODUCT_DETAIL_QUERY } from '../graphql/products.gql'; // Example

// // Styling & Components
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaStar, FaRegStar, FaCheckCircle, FaInfoCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';

// // Contexts & Hooks
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import ProductCard from '../components/ProductCard'; 
// import ProductReviews from '../components/ProductReviews'; // IMPORTED

// // Reusable Display-Only StarRating for product summary
// const ProductSummaryStarRating = ({ rating = 0 }) => {
//     const totalStars = 5;
//     const numericRating = parseFloat(rating) || 0;
//     const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
//     return (
//         <div className="flex text-brand-primary my-2">
//             {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
//             {[...Array(totalStars - fullStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
//         </div>
//     );
// };

// const TabButton = ({ children, isActive, onClick }) => (
//     <button
//         onClick={onClick}
//         className={`py-3 px-4 text-sm sm:text-base font-medium border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background transition-colors duration-200 whitespace-nowrap ${
//             isActive
//                 ? 'border-brand-primary text-brand-primary'
//                 : 'border-transparent text-brand-foreground/70 hover:text-brand-primary hover:border-brand-primary/50'
//         }`}
//     >
//         {children}
//     </button>
// );

// const NotificationBox = ({ message, type, onClose }) => {
//     const typeStyles = {
//         success: { bg: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300', iconColor: 'text-green-500 dark:text-green-400', icon: FaCheckCircle },
//         error: { bg: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300', iconColor: 'text-red-500 dark:text-red-400', icon: FaTimesCircle },
//         info: { bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300', iconColor: 'text-blue-500 dark:text-blue-400', icon: FaInfoCircle },
//     };
//     const currentStyle = typeStyles[type] || typeStyles.info;
//     const IconComponent = currentStyle.icon;

//     return (
//         <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-md border shadow-lg flex items-start max-w-sm transition-all duration-300 ease-in-out ${currentStyle.bg} text-brand-foreground`}>
//             <IconComponent className={`h-5 w-5 mr-3 flex-shrink-0 ${currentStyle.iconColor}`} aria-hidden="true" />
//             <div className="flex-grow text-sm">{message}</div>
//             <button onClick={onClose} className={`ml-4 -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${currentStyle.iconColor} focus-visible:ring-current`} aria-label="Dismiss notification">
//                 <FaTimesCircle className="h-4 w-4" aria-hidden="true" />
//             </button>
//         </div>
//     );
// };

// const ProductDetailPage = () => {
//     const { productId: routeProductId } = useParams(); // productId from URL (slug or REST API ID)
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [quantity, setQuantity] = useState(1);
//     const [activeTab, setActiveTab] = useState('description');
//     const [product, setProduct] = useState(null); // From REST API
//     const [graphQLProductId, setGraphQLProductId] = useState(null); // GraphQL Global ID for reviews
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [loadingProduct, setLoadingProduct] = useState(true);
//     const [productError, setProductError] = useState(null);
//     const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
//     const notificationTimeoutRef = useRef(null);

//     const { isAuthenticated, loading: authLoading, logout } = useAuth();
//     const { addItem, addingItem, addItemError: cartAddItemErrorHook } = useCart();

//     const gallerySettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, adaptiveHeight: true };

//     useEffect(() => {
//         if (!routeProductId) {
//             setProductError("No product identifier found.");
//             setLoadingProduct(false);
//             return;
//         }
//         const loadProductData = async () => {
//             setLoadingProduct(true);
//             setProductError(null); setProduct(null); setGraphQLProductId(null); setRelatedProducts([]);
//             try {
//                 const fetchedProduct = await fetchProductById(routeProductId); // Using api/woocommerce.js
//                 if (fetchedProduct && fetchedProduct.id) {
//                     setProduct(fetchedProduct);
                    
//                     // CRITICAL: Determine the GraphQL Global ID for the product.
//                     // The `product.id` (fetchedProduct.id) from WC REST is the databaseId (integer).
//                     // GraphQL `product(id: ID!)` query usually expects a base64 encoded global ID.
//                     // Example format: btoa(`Product:${fetchedProduct.id}`)
//                     // VERIFY THIS FORMAT with your WPGraphQL schema inspector.
//                     // If your GET_PRODUCT_REVIEWS_QUERY is modified to accept databaseId, this changes.
//                     try {
//                         const globalId = btoa(`Product:${fetchedProduct.id}`); // Example construction
//                         setGraphQLProductId(globalId);
//                     } catch (e) {
//                         console.error("Error encoding product ID for GraphQL:", e);
//                         setProductError("Could not determine GraphQL Product ID for reviews.");
//                     }
                    

//                     let initialTab = 'description';
//                     if (!fetchedProduct.description?.trim() && fetchedProduct.acf?.ingredients?.trim()) initialTab = 'ingredients';
//                     else if (!fetchedProduct.description?.trim() && !fetchedProduct.acf?.ingredients?.trim() && fetchedProduct.acf?.how_to_use?.trim()) initialTab = 'how_to_use';
//                     else if (!fetchedProduct.description?.trim() && !fetchedProduct.acf?.ingredients?.trim() && !fetchedProduct.acf?.how_to_use?.trim()) initialTab = 'reviews';
//                     setActiveTab(initialTab);

//                     if (fetchedProduct.related_ids?.length > 0) {
//                         const related = await fetchProducts({ include: fetchedProduct.related_ids.slice(0, 4).join(','), per_page: 4 });
//                         setRelatedProducts(related);
//                     }
//                 } else {
//                     setProductError(`Product not found with identifier: ${routeProductId}`);
//                 }
//             } catch (err) {
//                 setProductError(err.message || `Failed to load product details.`);
//             } finally {
//                 setLoadingProduct(false);
//             }
//         };
//         loadProductData();
//     }, [routeProductId]);

//     useEffect(() => { return () => clearTimeout(notificationTimeoutRef.current); }, []);

//     const showNotification = (message, type = 'info', duration = 4000) => { /* ... as before ... */ };
//     const closeNotification = () => { /* ... as before ... */ };
//     const handleAddToCart = () => { /* ... as before, ensure `addItem` uses `product.id` (databaseId) if that's what your GQL mutation needs for productId ... */ };

//     const isVariable = product?.type === 'variable';
//     const isInStock = product?.stock_status === 'instock';
//     const hasImages = product?.images && Array.isArray(product.images) && product.images.length > 0;
//     const highlights = [product?.acf?.highlight_1, product?.acf?.highlight_2, product?.acf?.highlight_3, product?.acf?.highlight_4].filter(Boolean);

//     if (loadingProduct) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Loading product details...</div>;
//     if (productError) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-red-500">Error: {productError}</div>;
//     if (!product) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Product not found.</div>;
    
//     const displayReviewCount = product?.review_count || 0; // From REST API, might differ from GraphQL count until reviews load

//     return (
//         <>
//             {notification.show && <NotificationBox message={notification.message} type={notification.type} onClose={closeNotification} />}
//             <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
//                     <div className="product-gallery sticky top-24">
//                         {hasImages ? (
//                             product.images.length > 1 ? (
//                                 <Slider {...gallerySettings}>
//                                     {product.images.map((image) => (
//                                         <div key={image.id || image.src} className="aspect-square bg-brand-card rounded-lg overflow-hidden">
//                                             <img src={image.src} alt={image.alt || product.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}/>
//                                         </div>
//                                     ))}
//                                 </Slider>
//                             ) : (
//                                 <div className="aspect-square bg-brand-card rounded-lg overflow-hidden shadow-sm">
//                                     <img src={product.images[0].src} alt={product.images[0].alt || product.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}/>
//                                 </div>
//                             )
//                         ) : ( <div className="aspect-square bg-brand-subtle/50 rounded-lg flex items-center justify-center shadow-sm"><span className="text-brand-foreground/70">No Image</span></div>)}
//                     </div>

//                     <div className="space-y-5">
//                         <h1 className="text-3xl lg:text-4xl font-bold text-brand-heading leading-tight">{product.name}</h1>
//                         {product.short_description && <div className="text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ __html: product.short_description }} />}
//                         <ProductSummaryStarRating rating={parseFloat(product.average_rating || 0)} />
//                         {product.price_html ? <div className="text-2xl font-semibold text-brand-primary-light my-1" dangerouslySetInnerHTML={{ __html: product.price_html }} /> : <p className="my-1 text-brand-foreground/70">Price unavailable</p>}
//                         {highlights.length > 0 && (
//                             <div className="my-3 space-y-1.5 text-sm"><h3 className="font-semibold text-brand-foreground mb-1.5">Key Highlights:</h3><ul className='list-none pl-0 space-y-1'>{highlights.map((text, index) => (<li key={index} className="flex items-start text-brand-foreground/90"><FaCheckCircle className="text-brand-accent mr-2 mt-0.5 flex-shrink-0" size={16}/><span>{text}</span></li>))}</ul></div>
//                         )}
//                         <div className="my-5 pt-5 border-t border-brand-subtle space-y-4">{/* Add to Cart Section */}</div>
//                         <div className="text-xs text-brand-foreground/70 space-y-0.5 border-t border-brand-subtle pt-4">{/* Status, SKU, Categories */}</div>
//                     </div>
//                 </div>

//                 <div className="my-10 md:my-16 border-t border-brand-subtle pt-6 md:pt-8">
//                     <div className="border-b border-brand-subtle mb-6">
//                         <nav className="-mb-px flex space-x-3 sm:space-x-5 flex-wrap" aria-label="Product details tabs">
//                             {product.description?.trim() && <TabButton isActive={activeTab === 'description'} onClick={() => setActiveTab('description')}>Description</TabButton>}
//                             {product.acf?.ingredients?.trim() && <TabButton isActive={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>Ingredients</TabButton>}
//                             {product.acf?.how_to_use?.trim() && <TabButton isActive={activeTab === 'how_to_use'} onClick={() => setActiveTab('how_to_use')}>How to Use</TabButton>}
//                             <TabButton isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews ({displayReviewCount})</TabButton>
//                         </nav>
//                     </div>
                    
//                     <div className="py-4">
//                         {activeTab === 'description' && product.description?.trim() && <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground" dangerouslySetInnerHTML={{ __html: product.description }} />}
//                         {activeTab === 'ingredients' && product.acf?.ingredients?.trim() && <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground" dangerouslySetInnerHTML={{ __html: product.acf.ingredients }} />}
//                         {activeTab === 'how_to_use' && product.acf?.how_to_use?.trim() && <div className="prose prose-sm sm:prose max-w-none text-brand-foreground prose-headings:text-brand-heading prose-a:text-brand-primary hover:prose-a:text-brand-primary-hover prose-strong:text-brand-foreground" dangerouslySetInnerHTML={{ __html: product.acf.how_to_use }} />}
//                         {activeTab === 'reviews' && (
//                             graphQLProductId && product.id ? (
//                                 <ProductReviews
//                                     productId={graphQLProductId}      // GraphQL Global ID
//                                     productDatabaseId={product.id}  // WordPress Post ID (databaseId)
//                                     showNotification={showNotification}
//                                 />
//                             ) : (
//                                 <p className="text-brand-foreground/70 text-center py-4">{graphQLProductId ? "Loading reviews..." : "Review information unavailable (missing product GraphQL ID)."}</p>
//                             )
//                         )}
//                     </div>
//                 </div>

//                 {relatedProducts.length > 0 && (
//                     <div className="my-10 md:my-16 border-t border-brand-subtle pt-8">
//                         <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-left text-brand-heading">You May Also Like</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
//                             {relatedProducts.map(related => (<ProductCard key={related.id} product={related} />))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ProductDetailPage;

// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api/woocommerce'; // For main product data from REST API

// Styling & Components
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaRegStar, FaCheckCircle, FaInfoCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';

// Contexts & Hooks
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard'; 
import ProductReviews from '../components/ProductReviews'; // IMPORT REVIEW COMPONENT

// Display-Only StarRating for product summary (from REST API data)
const ProductSummaryStarRating = ({ rating = 0 }) => {
    const totalStars = 5;
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
    return (
        <div className="flex text-brand-primary my-2">
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
            {[...Array(totalStars - fullStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
        </div>
    );
};

const TabButton = ({ children, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`py-3 px-4 text-sm sm:text-base font-medium border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-background transition-colors duration-200 whitespace-nowrap ${
            isActive
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-brand-foreground/70 hover:text-brand-primary hover:border-brand-primary/50'
        }`}
    >
        {children}
    </button>
);

const NotificationBox = ({ message, type, onClose }) => {
    const typeStyles = {
        success: { bg: 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300', iconColor: 'text-green-500 dark:text-green-400', icon: FaCheckCircle },
        error: { bg: 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300', iconColor: 'text-red-500 dark:text-red-400', icon: FaTimesCircle },
        info: { bg: 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300', iconColor: 'text-blue-500 dark:text-blue-400', icon: FaInfoCircle },
    };
    const currentStyle = typeStyles[type] || typeStyles.info;
    const IconComponent = currentStyle.icon;
    if (!message) return null;
    return (
        <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-md border shadow-lg flex items-start max-w-sm transition-all duration-300 ease-in-out ${currentStyle.bg} text-brand-foreground`}>
            <IconComponent className={`h-5 w-5 mr-3 flex-shrink-0 ${currentStyle.iconColor}`} aria-hidden="true" />
            <div className="flex-grow text-sm">{message}</div>
            <button onClick={onClose} className={`ml-4 -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${currentStyle.iconColor} focus-visible:ring-current`} aria-label="Dismiss notification">
                <FaTimesCircle className="h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    );
};

const ProductDetailPage = () => {
    const { productId: routeProductId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState(null); // From WC REST API
    const [graphQLProductId, setGraphQLProductId] = useState(null); // GraphQL Global ID
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [productError, setProductError] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
    const notificationTimeoutRef = useRef(null);

    const { isAuthenticated, loading: authLoading, logout } = useAuth();
    const { addItem, addingItem, addItemError: cartAddItemErrorHook } = useCart();

    const gallerySettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, adaptiveHeight: true };

    useEffect(() => {
        if (!routeProductId) {
            setProductError("No product identifier found."); setLoadingProduct(false); return;
        }
        const loadProductData = async () => {
            setLoadingProduct(true); setProductError(null); setProduct(null); setGraphQLProductId(null); setRelatedProducts([]);
            try {
                const fetchedProduct = await fetchProductById(routeProductId);
                if (fetchedProduct && fetchedProduct.id) {
                    setProduct(fetchedProduct);
                    // CRITICAL: Construct or fetch the GraphQL Global ID.
                    // Common pattern: btoa(`Product:${fetchedProduct.id}`)
                    // VERIFY THIS for your WPGraphQL schema.
                    try {
                        const globalId = btoa(`Product:${fetchedProduct.id}`); // Example
                        setGraphQLProductId(globalId);
                    } catch (e) { console.error("Error encoding product ID for GraphQL reviews:", e); }
                    
                    let initialTab = 'description';
                    if (!fetchedProduct.description?.trim() && fetchedProduct.acf?.ingredients?.trim()) initialTab = 'ingredients';
                    else if (!fetchedProduct.description?.trim() && !fetchedProduct.acf?.ingredients?.trim() && fetchedProduct.acf?.how_to_use?.trim()) initialTab = 'how_to_use';
                    else if (!fetchedProduct.description?.trim() && !fetchedProduct.acf?.ingredients?.trim() && !fetchedProduct.acf?.how_to_use?.trim()) initialTab = 'reviews';
                    setActiveTab(initialTab);

                    if (fetchedProduct.related_ids?.length > 0) {
                        const related = await fetchProducts({ include: fetchedProduct.related_ids.slice(0, 4).join(','), per_page: 4 });
                        setRelatedProducts(related);
                    }
                } else { setProductError(`Product not found: ${routeProductId}`); }
            } catch (err) { setProductError(err.message || `Failed to load product details.`); } 
            finally { setLoadingProduct(false); }
        };
        loadProductData();
    }, [routeProductId]);

    useEffect(() => { return () => clearTimeout(notificationTimeoutRef.current); }, []);

    const showNotification = (message, type = 'info', duration = 4000) => {
        clearTimeout(notificationTimeoutRef.current);
        setNotification({ show: true, message, type });
        notificationTimeoutRef.current = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), duration);
    };
    const closeNotification = () => { clearTimeout(notificationTimeoutRef.current); setNotification(prev => ({ ...prev, show: false })); };
    
    // const handleAddToCart = () => {
    //     if (authLoading) return;
    //     if (!isAuthenticated) {
    //         showNotification("Please log in to add items to your cart.", 'info');
    //         navigate('/login', { state: { from: location } });
    //         return;
    //     }
    //     const cartProductId = product?.databaseId || product?.id; 
    //     if (!cartProductId) {
    //         showNotification("Cannot add item: Product ID is missing.", 'error'); return;
    //     }
    //     if (product?.type === 'variable') {
    //         showNotification("This is a variable product. Please select options on its page.", 'info'); return;
    //     }
    //     addItem({ productId: cartProductId, quantity })
    //         .then(() => showNotification(`${product?.name || 'Item'} added to cart!`, 'success'))
    //         .catch(err => {
    //             const isAuthError = err.message.includes("Expired token") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
    //             if (isAuthError) {
    //                 showNotification("Your session has expired. Please log in again.", 'error');
    //                 logout(); navigate('/login', { replace: true, state: { from: location } });
    //             } else { showNotification(`Failed to add item: ${err.message || 'Please try again.'}`, 'error'); }
    //         });
    // };
    const handleAddToCart = () => {
        if (authLoading) return;
        if (!isAuthenticated) {
            showNotification("Please log in to add items to your cart.", 'info');
            navigate('/login', { state: { from: location } });
            return;
        }
        const cartProductId = product?.databaseId || product?.id; 
        if (!cartProductId) {
            showNotification("Cannot add item: Product ID is missing.", 'error'); return;
        }
        if (product?.type === 'variable') {
            showNotification("This is a variable product. Please select options on its page.", 'info'); return;
        }
        addItem({ productId: cartProductId, quantity })
            .then(() => showNotification(`${product?.name || 'Item'} added to cart!`, 'success'))
            .catch(err => {
                const isAuthError = err.message.includes("Expired token") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');
                if (isAuthError) {
                    showNotification("Your session has expired. Please log in again.", 'error');
                    logout(); navigate('/login', { replace: true, state: { from: location } });
                } else { 
                    showNotification('product can not be added to cart', 'error'); 
                }
            });
    };

    const isVariable = product?.type === 'variable';
    const isInStock = product?.stock_status === 'instock';
    const hasImages = product?.images && Array.isArray(product.images) && product.images.length > 0;
    const highlights = [product?.acf?.highlight_1, product?.acf?.highlight_2, product?.acf?.highlight_3, product?.acf?.highlight_4].filter(Boolean);

    if (loadingProduct) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Loading product details...</div>;
    if (productError) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-red-500">Error: {productError}</div>;
    if (!product) return <div className="container mx-auto px-4 sm:px-6 py-16 text-center text-brand-foreground/80">Product not found.</div>;
    
    const displayReviewCount = product?.review_count || 0;

    return (
        <>
            {notification.show && <NotificationBox message={notification.message} type={notification.type} onClose={closeNotification} />}
            <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                    <div className="product-gallery sticky top-24">
                        {hasImages ? ( product.images.length > 1 ? ( <Slider {...gallerySettings}> {product.images.map((image) => ( <div key={image.id || image.src} className="aspect-square bg-brand-card rounded-lg overflow-hidden"> <img src={image.src} alt={image.alt || product.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}/> </div> ))} </Slider> ) : ( <div className="aspect-square bg-brand-card rounded-lg overflow-hidden shadow-sm"> <img src={product.images[0].src} alt={product.images[0].alt || product.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = '/images/placeholder-dark.png'; }}/> </div> )
                        ) : ( <div className="aspect-square bg-brand-subtle/50 rounded-lg flex items-center justify-center shadow-sm"><span className="text-brand-foreground/70">No Image</span></div>)}
                    </div>

                    <div className="space-y-5">
                        <h1 className="text-3xl lg:text-4xl font-bold text-brand-heading leading-tight">{product.name}</h1>
                        {product.short_description && <div className="text-brand-foreground/90 prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ __html: product.short_description }} />}
                        <ProductSummaryStarRating rating={parseFloat(product.average_rating || 0)} />
                        {product.price_html ? <div className="text-2xl font-semibold text-brand-primary-light my-1" dangerouslySetInnerHTML={{ __html: product.price_html }} /> : <p className="my-1 text-brand-foreground/70">Price unavailable</p>}
                        {highlights.length > 0 && ( <div className="my-3 space-y-1.5 text-sm"><h3 className="font-semibold text-brand-foreground mb-1.5">Key Highlights:</h3><ul className='list-none pl-0 space-y-1'>{highlights.map((text, index) => (<li key={index} className="flex items-start text-brand-foreground/90"><FaCheckCircle className="text-brand-accent mr-2 mt-0.5 flex-shrink-0" size={16}/><span>{text}</span></li>))}</ul></div> )}
                        
                        <div className="my-5 pt-5 border-t border-brand-subtle space-y-4">
                            {isVariable ? ( <div className="p-3 border border-blue-500/30 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 text-sm"> This is a variable product. <Link to={`/products/${product.slug || product.id}`} className="font-medium underline ml-1 hover:text-blue-500 dark:hover:text-blue-200">View Options</Link> </div>
                            ) : !isInStock ? ( <p className="font-semibold text-red-500 p-3 border border-red-500/30 bg-red-500/10 rounded text-center">Out of Stock</p>
                            ) : ( <div className="flex flex-col sm:flex-row sm:items-center gap-3"> <div className="flex items-center"> <label htmlFor="quantity" className="font-medium mr-2 text-sm text-brand-foreground/90">Quantity:</label> <input type="number" id="quantity" name="quantity" min="1" max={product.stock_quantity || undefined} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 border border-brand-subtle rounded px-2 py-1.5 text-center text-sm bg-brand-card text-brand-foreground focus:ring-brand-primary focus:border-brand-primary" aria-label="Product quantity" /> </div> <button onClick={handleAddToCart} disabled={authLoading || addingItem} className="flex items-center justify-center bg-brand-primary text-brand-textOnPrimary py-2.5 px-6 rounded text-sm font-semibold hover:bg-brand-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"> <FaShoppingCart className="mr-2" /> {addingItem ? 'Adding...' : (isAuthenticated ? 'Add to Cart' : 'Login to Add')} </button> </div> )}
                            {cartAddItemErrorHook && !cartAddItemErrorHook.message.includes("Expired token") && ( <p className="text-red-500 text-xs mt-1.5 text-center sm:text-left">Error: {cartAddItemErrorHook.message}</p> )}
                        </div>
                        <div className="text-xs text-brand-foreground/70 space-y-0.5 border-t border-brand-subtle pt-4"> <p> Status: <span className={`font-semibold ${isInStock ? 'text-green-500' : 'text-red-500'}`}> {isInStock ? 'In Stock' : 'Out of Stock'} {isInStock && product.manage_stock && product.stock_quantity != null && ` (${product.stock_quantity} available)`} </span> </p> {product.sku && <p>SKU: <span className='text-brand-foreground/90'>{product.sku}</span></p>} {product.categories?.length > 0 && ( <p>Categories: {product.categories.map(cat => ( <Link key={cat.id} to={`/category/${cat.slug}`} className="hover:text-brand-primary underline ml-1">{cat.name}</Link> ))}. </p> )} </div>
                    </div>
                </div>

                <div className="my-10 md:my-16 border-t border-brand-subtle pt-6 md:pt-8">
                    <div className="border-b border-brand-subtle mb-6">
                        <nav className="-mb-px flex space-x-3 sm:space-x-5 flex-wrap" aria-label="Product details tabs">
                            {product.description?.trim() && <TabButton isActive={activeTab === 'description'} onClick={() => setActiveTab('description')}>Description</TabButton>}
                            {product.acf?.ingredients?.trim() && <TabButton isActive={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>Ingredients</TabButton>}
                            {product.acf?.how_to_use?.trim() && <TabButton isActive={activeTab === 'how_to_use'} onClick={() => setActiveTab('how_to_use')}>How to Use</TabButton>}
                            <TabButton isActive={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
                        </nav>
                    </div>
                    
                    <div className="py-4">
                        
                        {activeTab === 'description' && product.description?.trim() && <div className='' dangerouslySetInnerHTML={{ __html: product.description }} />}
                        {activeTab === 'ingredients' && product.acf?.ingredients?.trim() && <div className='' dangerouslySetInnerHTML={{ __html: product.acf.ingredients }} />}
                        {activeTab === 'how_to_use' && product.acf?.how_to_use?.trim() && <div className='' dangerouslySetInnerHTML={{ __html: product.acf.how_to_use }} />}
                        {activeTab === 'reviews' && (
                            graphQLProductId && product.id ? ( // Ensure WordPress Post ID (product.id) and GraphQL Global ID (graphQLProductId) are available
                                <ProductReviews
                                    productId={graphQLProductId}      // This MUST be the GraphQL Global ID for querying reviews
                                    productDatabaseId={product.id}  // This is the WordPress Post ID (databaseId) for submitting new reviews
                                    productFromRestApi={product} // Pass REST API product data for fallback reviewCount/averageRating
                                    showNotification={showNotification}
                                />
                            ) : (
                                <p className="text-brand-foreground/70 text-center py-4">{graphQLProductId ? "Loading reviews..." : "Review information currently unavailable (product identifier issue)."}</p>
                            )
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="my-10 md:my-16 border-t border-brand-subtle pt-8">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-left text-brand-heading">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                            {relatedProducts.map(related => (<ProductCard key={related.id} product={related} />))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetailPage;