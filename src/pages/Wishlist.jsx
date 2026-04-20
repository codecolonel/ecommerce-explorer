import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827' }}>Your Wishlist is Empty</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Save items you love to find them easily later.</p>
        <Link to="/" style={{ 
          backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', 
          borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' 
        }}>
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827' }}>My Wishlist ({wishlist.length})</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '2rem' 
      }}>
        {wishlist.map((product) => (
          <div key={product.id} style={{ 
            backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', 
            border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column'
          }}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '1rem' }} 
            />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', height: '3rem', overflow: 'hidden' }}>
              {product.title}
            </h3>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#2563eb', marginBottom: '1.5rem' }}>
              ${product.price.toFixed(2)}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                onClick={() => handleAddToCart(product)}
                style={{ 
                  flex: 1, backgroundColor: '#2563eb', color: 'white', border: 'none', 
                  padding: '0.75rem', borderRadius: '6px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}
              >
                <FaShoppingCart /> Add
              </button>
              <button 
                onClick={() => toggleWishlist(product)}
                style={{ 
                  backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', 
                  padding: '0.75rem', borderRadius: '6px', cursor: 'pointer' 
                }}
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;