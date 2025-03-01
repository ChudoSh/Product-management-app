// src/components/Products/ProductForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
  initialData?: {
    name: string;
    description: string;
    price: number;
  };
  onSubmit: (data: { name: string; description: string; price: number }) => Promise<void>;
  title: string;
  submitButtonText: string;
}

const ProductForm = ({ initialData, onSubmit, title, submitButtonText }: ProductFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || !price.trim()) {
      setError('All fields are required');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Price must be a positive number');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await onSubmit({
        name,
        description,
        price: priceValue
      });
      
      navigate('/products');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div>
            <span className="text-sm font-bold block">📦 {title}</span>
            <span className="text-xs block text-stone-500">
              Enter product details below
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-4">
        <div className="col-span-12 p-4 rounded border border-stone-300">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Enter product name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                rows={4}
                placeholder="Enter product description"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0.01"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="0.00"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-4 py-2 text-sm text-stone-600 border border-stone-300 rounded hover:bg-stone-100"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm text-white bg-violet-600 rounded hover:bg-violet-700 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;