// src/components/Products/ProductList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import { Product } from '../../types/Product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Advanced search filters
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async (page = 1) => {
    try {
      const response = await productService.getAll(page, itemsPerPage);
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      const queryParams = new URLSearchParams();
      
      if (searchQuery.trim()) {
        queryParams.append('q', searchQuery);
      }
      
      if (priceMin) {
        queryParams.append('minPrice', priceMin);
      }
      
      if (priceMax) {
        queryParams.append('maxPrice', priceMax);
      }
      
      if (sortBy) {
        queryParams.append('sortBy', sortBy);
      }
      
      const response = await productService.search(queryParams.toString());
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Search failed');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setPriceMin('');
    setPriceMax('');
    setSortBy('');
    fetchProducts(1);
  };

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchProducts(page);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h2>Products</h2>
      
      <div className="search-section">
        <div className="search-bar">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
          <button onClick={handleSearch}>Search</button>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="filter-btn"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Min Price:</label>
              <input 
                type="number" 
                value={priceMin} 
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="Minimum price" 
              />
            </div>
            
            <div className="filter-group">
              <label>Max Price:</label>
              <input 
                type="number" 
                value={priceMax} 
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Maximum price" 
              />
            </div>
            
            <div className="filter-group">
              <label>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date_asc">Oldest First</option>
                <option value="date_desc">Newest First</option>
              </select>
            </div>
            
            <div className="filter-actions">
              <button onClick={handleSearch}>Apply Filters</button>
              <button onClick={handleReset} className="reset-btn">Reset</button>
            </div>
          </div>
        )}
      </div>
      
      <div className="product-header">
        <Link to="/products/new" className="create-btn">Create New Product</Link>
      </div>
      
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="description">{product.description?.substring(0, 100)}...</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`}>View</Link>
                <Link to={`/products/${product.id}/edit`}>Edit</Link>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => changePage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => changePage(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;