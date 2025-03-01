// src/components/Products/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiChevronLeft, FiPackage, FiRefreshCw } from 'react-icons/fi';
import productService from '../../services/productService';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.delete(id);
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
      setError('Failed to delete product');
    }
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
    <div>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div className="flex items-center">
            <Link to="/products" className="mr-2 p-1 rounded hover:bg-stone-200">
              <FiChevronLeft />
            </Link>
            <div>
              <span className="text-sm font-bold block">📦 Product Details</span>
              <span className="text-xs block text-stone-500">
                ID: {id}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link 
              to={`/products/${id}/edit`}
              className="flex text-sm items-center gap-2 bg-violet-100 text-violet-700 transition-colors hover:bg-violet-200 px-3 py-1.5 rounded"
            >
              <FiEdit />
              <span>Edit</span>
            </Link>
            <button 
              onClick={handleDelete}
              className="flex text-sm items-center gap-2 bg-red-100 text-red-700 transition-colors hover:bg-red-200 px-3 py-1.5 rounded"
            >
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-4">
        <div className="col-span-12 p-4 rounded border border-stone-300">
          <div className="flex items-center gap-1.5 font-medium mb-4">
            <FiPackage /> {product.name}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <div className="text-xs text-stone-500 mb-1">Price</div>
              <div className="text-lg font-medium">${product.price.toFixed(2)}</div>
            </div>
            
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              <div className="text-xs text-stone-500 mb-1">Created</div>
              <div className="text-lg font-medium">
                {new Date(product.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-sm font-medium text-stone-700 mb-2">Description</div>
            <div className="p-3 bg-stone-50 rounded border border-stone-200">
              {product.description || "No description provided."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;