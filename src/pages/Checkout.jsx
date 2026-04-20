import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);


  const { register, handleSubmit, formState: { errors } } = useForm();

 
  const onSubmit = (data) => {
    setIsProcessing(true);
    
    
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('🎉 Order placed successfully! Thank you for shopping.');
      navigate('/'); 
    }, 2000);
  };

 
  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827' }}>Your Cart is Empty</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>You need items in your cart to checkout.</p>
        <Link to="/products" style={{ 
          backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', 
          borderRadius: '8px', fontWeight: 'bold' 
        }}>
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827' }}>Checkout</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        
        {}
        <div style={{ 
          flex: '1 1 500px', backgroundColor: 'white', padding: '2rem', 
          borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            Shipping Information
          </h3>
          
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Full Name</label>
              <input 
                {...register("fullName", { required: "Full name is required" })} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                placeholder="John Doe"
              />
              {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errors.fullName.message}</span>}
            </div>

            {}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Email Address</label>
              <input 
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                placeholder="john@example.com"
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errors.email.message}</span>}
            </div>

            {}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Street Address</label>
              <input 
                {...register("address", { required: "Address is required" })} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                placeholder="123 React Street"
              />
              {errors.address && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errors.address.message}</span>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>City</label>
                <input 
                  {...register("city", { required: "City is required" })} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                />
                {errors.city && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errors.city.message}</span>}
              </div>

              {}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#374151' }}>Zip Code</label>
                <input 
                  {...register("zipCode", { required: "Zip code is required" })} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
                />
                {errors.zipCode && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{errors.zipCode.message}</span>}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              style={{ 
                marginTop: '1.5rem', width: '100%', padding: '1rem', 
                backgroundColor: isProcessing ? '#9ca3af' : '#10b981', 
                color: 'white', border: 'none', borderRadius: '8px', 
                fontWeight: 'bold', fontSize: '1.1rem', cursor: isProcessing ? 'not-allowed' : 'pointer' 
              }}
            >
              {isProcessing ? 'Processing Order...' : `Pay $${(cartTotal + 5.99).toFixed(2)}`}
            </button>
          </form>
        </div>

        {}
        <div style={{ 
          flex: '1 1 350px', backgroundColor: 'white', padding: '2rem', 
          borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            Order Summary
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                    {item.title.substring(0, 20)}... <span style={{ fontWeight: 'bold' }}>x{item.quantity}</span>
                  </span>
                </div>
                <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#111827' }}>
              <span>Total</span>
              <span>${(cartTotal + 5.99).toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;