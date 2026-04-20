import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Products = () => {
  
  const { products, categories, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All Products');

  
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.25rem', color: '#4b5563' }}>
        Loading products from API... ⏳
      </div>
    );
  }
  
  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '4rem' }}>{error}</div>;
  }

 
  const filteredProducts = activeCategory === 'All Products' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#111827' }}>Shop All Products</h2>
      
      {}
      <div style={{ 
        display: 'flex', gap: '0.75rem', marginBottom: '2rem', 
        overflowX: 'auto', paddingBottom: '0.5rem', flexWrap: 'wrap' 
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              backgroundColor: activeCategory === category ? '#2563eb' : '#e5e7eb',
              color: activeCategory === category ? 'white' : '#374151',
              textTransform: 'capitalize',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '2rem' 
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;