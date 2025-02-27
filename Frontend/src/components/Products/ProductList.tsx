// src/components/products/ProductList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import { Product } from '../../types/Product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    
    try {
      const response = await productService.search(searchQuery);
      setProducts(response.data);
    } catch (err) {
      setError('Search failed');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="search-bar">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <Link to="/products/new" className="create-btn">Create New Product</Link>
      
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`}>View</Link>
                <Link to={`/products/${product.id}/edit`}>Edit</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;