// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect, Fragment, useRef } from 'react'; // Added useRef
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api/woocommerce';

// Styling & Components
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaRegStar, FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa'; // Added icons for notification

// Contexts & Hooks
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

// --- Reusable Components (StarRating, TabButton - remain the same) ---
const StarRating = ({ rating = 0 }) => {
    const totalStars = 5;
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.min(Math.max(0, Math.floor(numericRating)), totalStars);
    return (
        <div className="flex text-yellow-400 my-2">
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
            {[...Array(totalStars - fullStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
        </div>
    );
};

const TabButton = ({ children, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 text-sm font-medium border-b-2 ${
            isActive
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50`}
    >
        {children}
    </button>
);


// --- Custom Notification Component ---
const NotificationBox = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' :
                    type === 'error' ? 'bg-red-100 border-red-400 text-red-700' :
                    'bg-blue-100 border-blue-400 text-blue-700'; // Default to info

    const Icon = type === 'success' ? FaCheckCircle :
                 type === 'error' ? FaTimesCircle :
                 FaInfoCircle;

    return (
        // Position fixed at the bottom right, adjust as needed
        <div className={`fixed bottom-5 right-5 z-[100] p-4 rounded-md border shadow-lg flex items-start ${bgColor} max-w-sm transition-opacity duration-300 ease-in-out`}>
            <Icon className="h-5 w-5 mr-3 flex-shrink-0" aria-hidden="true" />
            <div className="flex-grow text-sm">
                {message}
            </div>
            <button onClick={onClose} className="ml-4 -mt-1 -mr-1 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current">
                <span className="sr-only">Dismiss</span>
                <FaTimesCircle className="h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    );
};


// --- Main Page Component ---
const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // --- Local State ---
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [productError, setProductError] = useState(null);
    // State for the notification box
    const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
    const notificationTimeoutRef = useRef(null); // Ref to manage timeout

    // --- Context Hooks ---
    const { isAuthenticated, loading: authLoading, logout } = useAuth();
    const { addItem, addingItem, addItemError: cartAddItemErrorHook } = useCart(); // Rename hook error to avoid conflict

    // --- Gallery Settings (remains the same) ---
    const gallerySettings = { /* ... */ };

    // --- Data Fetching (remains the same) ---
    useEffect(() => {
        // Ensure product ID exists
        if (!productId) {
            console.error("Product Detail Page: No Product ID/Slug found in URL.");
            setProductError("No product identifier found in the URL.");
            setLoadingProduct(false);
            return;
        }

        const loadProductData = async () => {
            setLoadingProduct(true);
            setProductError(null);
            setProduct(null); // Reset product state
            setRelatedProducts([]); // Reset related state
            console.log(`[Product Detail] Attempting to fetch product via REST/Proxy: ${productId}`);

            try {
                const fetchedProduct = await fetchProductById(productId);
                if (typeof fetchedProduct === 'object' && fetchedProduct !== null && fetchedProduct.id) {
                    setProduct(fetchedProduct);
                    // Fetch related products
                    if (fetchedProduct.related_ids && fetchedProduct.related_ids.length > 0) {
                        const relatedIds = fetchedProduct.related_ids.slice(0, 4);
                        try {
                            const related = await fetchProducts({ include: relatedIds.join(',') });
                            setRelatedProducts(related);
                        } catch(relatedError){
                            console.error("[Product Detail] Failed to fetch related products:", relatedError);
                        }
                    }
                } else {
                    setProductError(`Product not found.`);
                    setProduct(null);
                }
            } catch (err) {
                 setProductError(err.message || `Failed to load product details for ${productId}.`);
            } finally {
                setLoadingProduct(false);
            }
        };

        loadProductData();
    }, [productId]);

    // --- Cleanup notification timeout on unmount ---
    useEffect(() => {
        return () => {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
            }
        };
    }, []);

    // --- Function to show notification ---
    const showNotification = (message, type = 'info', duration = 4000) => {
        // Clear existing timeout if any
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
        }
        setNotification({ show: true, message, type });
        // Set new timeout
        notificationTimeoutRef.current = setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
            notificationTimeoutRef.current = null; // Clear ref after timeout
        }, duration);
    };

    // --- Close notification handler ---
    const closeNotification = () => {
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
            notificationTimeoutRef.current = null;
        }
        setNotification(prev => ({ ...prev, show: false }));
    };

    // --- Add to Cart Handler ---
    const handleAddToCart = () => {
        if (authLoading) return;

        if (!isAuthenticated) {
            showNotification("Please log in to add items to your cart.", 'info');
            navigate('/login', { state: { from: location } });
            return;
        }

        const productDatabaseId = product?.databaseId || product?.id;
        if (!productDatabaseId) {
            console.error("Product Database ID is missing for cart operation.");
            showNotification("Cannot add item: Product ID is missing.", 'error');
            return;
        }

        const isVariable = product?.type === 'variable';
        if (isVariable) {
            showNotification("Please select product options.", 'info');
            // Consider navigating to the product page if it's complex
            // navigate(`/products/${product.slug || product.id}`);
            return;
        }

        console.log(`Adding to cart: Product ID ${productDatabaseId}, Qty ${quantity}`);

        addItem({
            productId: productDatabaseId,
            quantity: quantity,
        }).then(response => {
            console.log("Added to cart response:", response);
            // Show success notification
            showNotification(`${product?.name || 'Item'} added to cart!`, 'success');
        }).catch(err => {
            console.error("Error adding item from Product Detail Page:", err);
             const isAuthError = err.message.includes("Expired token") || err.message.includes("invalid session") || err.graphQLErrors?.some(gqlErr => gqlErr.extensions?.category === 'authentication');

             if (isAuthError) {
                 // Show auth error notification
                 showNotification("Your session has expired. Please log in again.", 'error');
                 logout();
                 navigate('/login', { replace: true, state: { from: location } });
             } else {
                 // Show generic error notification
                 showNotification(`Failed to add item: ${err.message || 'Please try again.'}`, 'error');
             }
        });
    };


    // --- Prepare Data for Rendering ---
    const isVariable = product?.type === 'variable';
    const isInStock = product?.stock_status === 'instock';
    const hasImages = product?.images && Array.isArray(product.images) && product.images.length > 0;
    const highlights = [
        product?.acf?.highlight_1, product?.acf?.highlight_2,
        product?.acf?.highlight_3, product?.acf?.highlight_4,
    ].filter(text => text && text.trim() !== '');


    // --- Render Logic ---
    if (loadingProduct) {
        return <div className="container mx-auto px-6 py-10 text-center text-gray-600">Loading product details...</div>;
    }
    if (productError) {
        return <div className="container mx-auto px-6 py-10 text-center text-red-600">Error: {productError}</div>;
    }
    if (!product) {
        return <div className="container mx-auto px-6 py-10 text-center text-gray-700">Product not found.</div>;
    }


    return (
        <> {/* Use Fragment to allow NotificationBox outside the main container */}
            {/* Render Notification Box */}
            {notification.show && (
                <NotificationBox
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
            )}

            <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
                {/* --- Main Product Section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div className="product-gallery">
                        {hasImages && product.images.length > 1 ? (
                            <Slider {...gallerySettings}>
                                {product.images.map((image) => (
                                    <div key={image.id}>
                                        <img
                                            src={image.src} alt={image.alt || product.name || 'Product image'}
                                            className="w-full h-auto object-contain rounded-lg shadow-sm aspect-square bg-gray-50"
                                            onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : hasImages ? (
                            <img
                                src={product.images[0].src} alt={product.images[0].alt || product.name || 'Product image'}
                                className="w-full h-auto object-contain rounded-lg shadow-sm aspect-square bg-gray-50"
                                onError={(e) => { e.target.src = '/images/placeholder.png'; }}
                            />
                        ) : (
                            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-gray-500">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">{product.name}</h1>
                        {product.short_description && (
                            <div
                                className="text-sm text-gray-600 mb-3 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                            />
                        )}
                        <StarRating rating={parseFloat(product.average_rating || 0)} />
                        {product.price_html ? (
                            <div
                                className="text-2xl font-semibold text-gray-800 my-4"
                                dangerouslySetInnerHTML={{ __html: product.price_html }} />
                        ) : <p className="my-4 text-gray-500">Price unavailable</p>}

                        {/* Highlights */}
                        {highlights.length > 0 && (
                            <div className="my-4 space-y-2 text-sm">
                                <h3 className="font-semibold mb-1 text-gray-800">Key Highlights:</h3>
                                <ul className='list-none pl-0 space-y-1.5'>
                                {highlights.map((text, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14}/>
                                        <span>{text}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        )}

                        {/* Cart Section */}
                        <div className="my-6 space-y-4">
                            {isVariable && (
                                <div className="p-4 border rounded bg-blue-50 text-blue-800 text-sm">
                                    This is a variable product. Please select options.
                                </div>
                            )}
                            {(!isVariable) && isInStock && (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center flex-shrink-0">
                                        <label htmlFor="quantity" className="font-medium mr-3 text-sm text-gray-700">Quantity:</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max={product.stock_quantity || undefined}
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            aria-label="Product quantity"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={authLoading || addingItem || isVariable}
                                        className="bg-black text-white py-2.5 px-8 rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                                    >
                                        {addingItem ? 'Adding...' : (isAuthenticated ? 'Add to Cart' : 'Login to Add')}
                                    </button>
                                </div>
                            )}
                            {!isVariable && !isInStock && (
                                <p className="font-semibold text-red-600 p-3 border border-red-200 bg-red-50 rounded text-center">Out of Stock</p>
                            )}
                            {/* Display hook error state if needed for non-auth issues */}
                            {cartAddItemErrorHook && !cartAddItemErrorHook.message.includes("Expired token") && (
                                <p className="text-red-500 text-sm mt-2 text-center sm:text-left">
                                    Error: {cartAddItemErrorHook.message}
                                </p>
                            )}
                        </div>

                        {/* Stock Status & SKU */}
                        <div className="text-sm text-gray-500 space-y-1 border-t pt-4 mt-6">
                            <p> Status: <span className={`font-semibold ${isInStock ? 'text-green-600' : 'text-red-600'}`}> {isInStock ? 'In Stock' : 'Out of Stock'} {isInStock && product.manage_stock && product.stock_quantity != null && ` (${product.stock_quantity} available)`} </span> </p>
                            {product.sku && <p>SKU: <span className='text-gray-700'>{product.sku}</span></p>}
                        </div>
                    </div>
                </div>

                {/* --- Tabs Section --- */}
                <div className="my-12 border-t pt-6">
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-4 sm:space-x-6 flex-wrap" aria-label="Tabs">
                            {product.description && (
                                <TabButton isActive={activeTab === 'description'} onClick={() => setActiveTab('description')}>Description</TabButton>
                            )}
                            {product.acf?.ingredients && product.acf.ingredients.trim() !== '' && (
                                <TabButton isActive={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>Ingredients</TabButton>
                            )}
                            {product.acf?.how_to_use && product.acf.how_to_use.trim() !== '' && (
                                <TabButton isActive={activeTab === 'how_to_use'} onClick={() => setActiveTab('how_to_use')}>How to Use</TabButton>
                            )}
                        </nav>
                    </div>
                    <div className="py-4 prose prose-sm max-w-none">
                        {activeTab === 'description' && product.description && (
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        )}
                        {activeTab === 'ingredients' && product.acf?.ingredients && (
                            <div dangerouslySetInnerHTML={{ __html: product.acf.ingredients }} />
                        )}
                        {activeTab === 'how_to_use' && product.acf?.how_to_use && (
                            <div dangerouslySetInnerHTML={{ __html: product.acf.how_to_use }} />
                        )}
                    </div>
                </div>

                {/* --- Related Products --- */}
                {relatedProducts.length > 0 && (
                    <div className="my-12 border-t pt-8">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-left text-gray-800">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                            {relatedProducts.map(related => (
                                    <ProductCard key={related.id} product={related} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </> // Close Fragment
    );
};

export default ProductDetailPage;