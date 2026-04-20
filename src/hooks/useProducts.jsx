import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://dummyjson.com/products?limit=50'),
          axios.get('https://dummyjson.com/products/categories')
        ]);
        
        const mappedProducts = productsRes.data.products.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          category: typeof p.category === 'object' ? p.category.name : p.category,
          image: p.thumbnail || p.images[0],
          rating: { rate: p.rating, count: p.stock }
        }));
        
        const catMap = categoriesRes.data.map(c => typeof c === 'string' ? c : (c.name || c.slug));

        setProducts(mappedProducts);
        setCategories(['All Products', ...catMap]);
      } catch (err) {
        toast.error('api is dead');
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return { products, categories, loading, error };
};