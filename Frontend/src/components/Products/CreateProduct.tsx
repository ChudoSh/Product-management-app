import React from 'react';
import ProductForm from './ProductForm';
import productService from '../../services/productService';

const CreateProduct = () => {
  const handleCreateProduct = async (productData: { name: string; description: string; price: number }) => {
    await productService.create(productData);
  };

  return (
    <ProductForm
      onSubmit={handleCreateProduct}
      title="Create New Product"
      submitButtonText="Create Product"
    />
  );
};

export default CreateProduct;