import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      backgroundColor: '#ffffff', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2563eb' }}>
        <Link to="/">E-Explorer</Link>
      </h1>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontWeight: 'bold' }}>
        <Link to="/products" style={{ color: '#4b5563' }}>Shop</Link>
        
        <Link to="/wishlist" style={{ color: '#ef4444' }}>
          <FaHeart size={22} />
        </Link>
        
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', position: 'relative', color: '#374151' }}>
          <FaShoppingCart size={22} />
          {totalItems > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-10px', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              fontSize: '12px' 
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;