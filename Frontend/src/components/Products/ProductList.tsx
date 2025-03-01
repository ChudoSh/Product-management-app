import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      console.log('API Product response:', response.data);
      
      // Handle different response formats
      const productData = response.data?.data || response.data || [];
      setProducts(Array.isArray(productData) ? productData : []);
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  };

  // Safe formatting function for price
  const formatPrice = (price) => {
    // Special case for null or undefined
    if (price == null) return '0.00';
    
    // Convert string to number if needed
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    // Check if conversion resulted in a valid number
    if (typeof numPrice === 'number' && !isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    // Fallback for any other case
    return '0.00';
  };

  // Delete product handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await productService.delete(id);
      fetchProducts(); // Refresh list after deletion
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Error deleting product');
    }
  };

  return (
    <div style={{
      color: 'white',
      padding: '20px',
      height: '100%',
      overflow: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #333',
        paddingBottom: '10px'
      }}>
        <h1 style={{margin: 0}}>Welcome to product management console</h1>
        <div>
          <a href="/profile" style={{color: 'white', textDecoration: 'none'}}>Account</a>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '10px'
      }}>
        <Link to="/products/new" style={{
          background: 'transparent',
          border: '1px solid #333',
          padding: '8px 12px',
          color: 'white',
          textDecoration: 'none'
        }}>
          + Add product
        </Link>
        
        <div style={{display: 'flex', flex: 1, alignItems: 'center'}}>
          <span style={{marginRight: '10px'}}>Filter:</span>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="text, price range, id, sort (price_asc, price_desc)"
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid #333',
              padding: '8px',
              color: 'white'
            }}
          />
        </div>
      </div>
      
      {loading ? (
        <div style={{textAlign: 'center', padding: '20px', color: '#aaa'}}>
          Loading products...
        </div>
      ) : error ? (
        <div style={{padding: '20px', color: '#ff6b6b'}}>
          {error}
          <button onClick={fetchProducts} style={{
            background: 'none',
            border: 'none',
            color: '#4d4dff',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '10px'
          }}>
            Try again
          </button>
        </div>
      ) : (
        <div>
          {products.length === 0 ? (
            <div style={{textAlign: 'center', padding: '20px', color: '#aaa'}}>
              No products available. Add a product to get started.
            </div>
          ) : (
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '1px solid #333'}}>
                  <th style={{textAlign: 'left', padding: '10px'}}>ID</th>
                  <th style={{textAlign: 'left', padding: '10px'}}>Product</th>
                  <th style={{textAlign: 'right', padding: '10px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id || index} style={{borderBottom: '1px solid #333'}}>
                    <td style={{padding: '10px'}}>{index + 1}#</td>
                    <td style={{padding: '10px'}}>
                      Product: {product.name || 'Unnamed'}, 
                      {product.description || 'No description'}, 
                      ${formatPrice(product.price)}
                    </td>
                    <td style={{padding: '10px', textAlign: 'right'}}>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ff6b6b',
                          cursor: 'pointer',
                          marginRight: '10px'
                        }}
                      >
                        Delete
                      </button>
                      
                      <Link 
                        to={`/products/${product.id}/edit`} 
                        style={{
                          color: '#4d4dff',
                          textDecoration: 'none'
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;