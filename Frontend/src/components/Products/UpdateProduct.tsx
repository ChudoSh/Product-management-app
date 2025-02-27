// src/components/products/EditProduct.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import { Product } from '../../types/Product';

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const response = await productService.getById(id);
        const product = response.data;
        
        setName(product.name);
        setDescription(product.description || '');
        setPrice(product.price.toString());
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!id) return;
    
    try {
      await productService.update(id, {
        name,
        description,
        price: parseFloat(price)
      });
      navigate(`/products/${id}`);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateProduct;