import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import Pagination from '../common/Pagination';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); 
  
  const [filters, setFilters] = useState({
    text: '',
    minPrice: '',
    maxPrice: '',
    id: '',
    sort: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); 

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      setError('');
      
      const response = await productService.getAll(currentPage, limit);
      
      const productData = response.data?.data || [];
      
      setProducts(productData);
      
      const pagination = response.data?.pagination || {};
      setTotalPages(Math.max(pagination.pages || 1, 1));
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    
    if (filters.text) queryParams.append('q', filters.text);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.id) queryParams.append('id', filters.id);
    if (filters.sort) queryParams.append('sort', filters.sort);
    
    queryParams.append('search', 'true');
    
    setCurrentPage(1);
    
    fetchFilteredProducts(queryParams.toString());
  };

  const fetchFilteredProducts = async (queryString) => {
    try {
      setLoading(true);
      
      const paginatedQueryString = `${queryString}&page=${currentPage}&limit=${limit}`;
      
      const response = await productService.search(paginatedQueryString);
      
      const productData = response.data?.data || [];
      
      setProducts(productData);
      
      const pagination = response.data?.pagination || {};
      setTotalPages(Math.max(pagination.pages || 1, 1));
      
      setLoading(false);
    } catch (err) {
      console.error('Filter search error:', err);
      setError('Failed to search products: ' + (err instanceof Error ? err.message : String(err)));
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price == null) return '0.00';
    
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (typeof numPrice === 'number' && !isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    return '0.00';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await productService.delete(id);
      fetchProducts(); 
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
      </div>
      
      {/* Advanced filtering system */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        border: '1px solid #333',
        borderRadius: '4px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <label style={{minWidth: '80px'}}>Filter by:</label>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>Text:</span>
            <input
              type="text"
              value={filters.text}
              onChange={(e) => handleFilterChange('text', e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '6px',
                color: 'white',
                width: '150px'
              }}
            />
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>Price from:</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '6px',
                color: 'white',
                width: '80px'
              }}
            />
            <span>to:</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '6px',
                color: 'white',
                width: '80px'
              }}
            />
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>ID:</span>
            <input
              type="text"
              value={filters.id}
              onChange={(e) => handleFilterChange('id', e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '6px',
                color: 'white',
                width: '80px'
              }}
            />
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>Sort by:</span>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                padding: '6px',
                color: 'white',
                width: '120px'
              }}
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="date_asc">Date: Oldest First</option>
              <option value="date_desc">Date: Newest First</option>
            </select>
          </div>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button
            onClick={applyFilters}
            style={{
              background: 'transparent',
              border: '1px solid #333',
              padding: '6px 12px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Apply Filters
          </button>
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
            <>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid #333'}}>
                    <th style={{textAlign: 'left', padding: '10px'}}>ID</th>
                    <th style={{textAlign: 'left', padding: '10px'}}>Name</th>
                    <th style={{textAlign: 'left', padding: '10px'}}>Description</th>
                    <th style={{textAlign: 'left', padding: '10px'}}>Price</th>
                    <th style={{textAlign: 'right', padding: '10px'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id || index} style={{borderBottom: '1px solid #333'}}>
                      <td style={{padding: '10px'}}>{index + 1}#</td>
                      <td style={{padding: '10px'}}>{product.name || 'Unnamed'}</td>
                      <td style={{padding: '10px'}}>{product.description || 'No description'}</td>
                      <td style={{padding: '10px'}}>${formatPrice(product.price)}</td>
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
              
              {/* Pagination component */}
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;