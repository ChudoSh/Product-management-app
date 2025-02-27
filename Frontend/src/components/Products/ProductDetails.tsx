// src/components/products/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../../services/productService';
import { Product } from '../../types/Product';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const response = await productService.getById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.delete(id);
      navigate('/products');
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <div className="product-info">
        <p className="description">{product.description}</p>
        <p className="price">Price: ${product.price}</p>
      </div>
      <div className="product-actions">
        <Link to={`/products/${id}/edit`} className="btn edit-btn">Edit</Link>
        <button onClick={handleDelete} className="btn delete-btn">Delete</button>
        <Link to="/products" className="btn back-btn">Back to List</Link>
      </div>
    </div>
  );
};

export default ProductDetail;