// src/components/products/EditProduct.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from './ProductForm';
import productService from '../../services/productService';
import { FiRefreshCw } from 'react-icons/fi';

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product data');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (productData: { name: string; description: string; price: number }) => {
    if (!id) return;
    await productService.update(id, productData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <FiRefreshCw className="animate-spin text-2xl text-violet-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="p-2 bg-red-100 text-red-700 text-sm rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4">
        <div className="p-2 bg-yellow-100 text-yellow-700 text-sm rounded">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleUpdateProduct}
      title="Edit Product"
      submitButtonText="Save Changes"
    />
  );
};

export default UpdateProduct;