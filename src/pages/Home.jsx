import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, loading } = useProducts();


  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {}
      <div style={{ 
        backgroundColor: '#1e3a8a', 
        color: 'white', 
        padding: '4rem 2rem', 
        borderRadius: '12px', 
        textAlign: 'center',
        marginBottom: '3rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', fontWeight: '800' }}>
          Welcome to E-Explorer
        </h1>
        <p style={{ fontSize: '1.25rem', margin: '0 0 2rem 0', color: '#bfdbfe' }}>
          Discover the best products at unbeatable prices.
        </p>
        <Link to="/products" style={{ 
          backgroundColor: 'white', color: '#1e3a8a', padding: '1rem 2rem', 
          borderRadius: '9999px', fontWeight: 'bold', fontSize: '1.1rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Shop Now
        </Link>
      </div>

      {}
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#111827' }}>Featured Products</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading featured items... ⏳</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;