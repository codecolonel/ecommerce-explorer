import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827' }}>Your Cart is Empty</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" style={{ 
          backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', 
          borderRadius: '8px', fontWeight: 'bold' 
        }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827' }}>Shopping Cart</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ 
              display: 'flex', alignItems: 'center', gap: '1.5rem', 
              backgroundColor: 'white', padding: '1rem', borderRadius: '8px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#111827' }}>{item.title}</h3>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#2563eb' }}>${item.price.toFixed(2)}</p>
              </div>

              {}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f3f4f6', padding: '0.5rem', borderRadius: '8px' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563' }}><FaMinus /></button>
                <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563' }}><FaPlus /></button>
              </div>

              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '80px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button 
                onClick={() => removeFromCart(item.id)} 
                style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                title="Remove item"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
        </div>

        {}
        <div style={{ 
          alignSelf: 'flex-end', width: '100%', maxWidth: '400px', 
          backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', 
          border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" style={{ 
            display: 'block', textAlign: 'center', width: '100%', 
            backgroundColor: '#10b981', color: 'white', padding: '1rem', 
            borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem' 
          }}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;