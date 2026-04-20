import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  
 
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.25rem', color: '#4b5563' }}>Loading details... ⏳</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: 'red' }}>{error}</div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Product not found.</div>;
  }

 
  const isWishlisted = wishlist.some(item => item.id === product.id);

  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title.substring(0, 20)}... added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isWishlisted) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist ❤️");
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      {}
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '0.5rem', 
          background: 'none', border: 'none', color: '#4b5563', 
          cursor: 'pointer', marginBottom: '2rem', fontSize: '1rem',
          fontWeight: '600'
        }}
      >
        <FaArrowLeft /> Back to Shop
      </button>

      {}
      <div style={{ 
        display: 'flex', flexWrap: 'wrap', gap: '3rem', 
        backgroundColor: 'white', padding: '2.5rem', 
        borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
      }}>
        
        {}
        <div style={{ 
          flex: '1 1 350px', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', padding: '2rem', 
          border: '1px solid #e5e7eb', borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>

        {}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            textTransform: 'uppercase', color: '#6b7280', 
            fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.875rem' 
          }}>
            {product.category}
          </span>
          
          <h1 style={{ fontSize: '2.5rem', color: '#111827', margin: '0.5rem 0 1rem 0', lineHeight: '1.2' }}>
            {product.title}
          </h1>

          {}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb' }}>
              ${product.price.toFixed(2)}
            </span>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              backgroundColor: '#fef3c7', padding: '0.5rem 1rem', 
              borderRadius: '9999px', color: '#d97706', fontWeight: 'bold' 
            }}>
              <FaStar /> {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            {product.description}
          </p>

          {}
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            
            {}
            <button 
              onClick={handleAddToCart} 
              style={{ 
                flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', 
                padding: '1rem', backgroundColor: '#2563eb', color: 'white', 
                border: 'none', borderRadius: '8px', fontSize: '1.1rem', 
                fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            
            {}
            <button 
              onClick={handleToggleWishlist}
              style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                padding: '1rem 1.5rem', backgroundColor: '#f3f4f6', 
                color: isWishlisted ? '#ef4444' : '#9ca3af', 
                border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <FaHeart size={24} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;