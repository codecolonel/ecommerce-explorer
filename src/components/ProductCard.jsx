import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title.substring(0, 20)}... added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (!isWishlisted) {
      toast.success("Added to wishlist ❤️");
    } else {
      toast.info("Removed from wishlist");
    }
  };

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '1rem', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: isWishlisted ? '#ef4444' : '#9ca3af',
          zIndex: 10
        }}
        aria-label="Toggle Wishlist"
      >
        <FaHeart size={16} />
      </button>

      <Link to={`/product/${product.id}`} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ height: '200px', objectFit: 'contain', width: '100%' }} 
        />
      </Link>
      
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`} style={{ fontWeight: '600', margin: '0.5rem 0', color: '#111827', flexGrow: 1 }}>
          {product.title.length > 40 ? `${product.title.substring(0, 40)}...` : product.title}
        </Link>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
            ${product.price.toFixed(2)}
          </span>
          <span style={{ fontSize: '0.875rem', color: '#f59e0b', fontWeight: 'bold' }}>
            ★ {product.rating.rate}
          </span>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        style={{ 
          marginTop: '1rem', width: '100%', padding: '0.75rem', 
          backgroundColor: '#2563eb', color: 'white', border: 'none', 
          borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;