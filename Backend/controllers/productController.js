// controllers/productController.js
import Product from '../models/product.js';
import { getCollection } from '../config/db/mongodbSetup.js';

export const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await Product.findAll(parseInt(page), parseInt(limit));
        
        res.status(200).json({
            success: true,
            ...products
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve products' 
        });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }
        
        res.status(200).json({
            success: true,
            product: product.toJSON()
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve product' 
        });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        
        // Validate input
        if (!name || !description || price === undefined) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, description, and price are required' 
            });
        }
        
        // Price must be a number and greater than 0
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Price must be a positive number' 
            });
        }
        
        const product = await Product.create(name, description, parseFloat(price));
        
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: product.toJSON()
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to create product' 
        });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        
        // Get existing product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }
        
        // Update fields if provided
        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) {
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Price must be a positive number' 
                });
            }
            product.price = parseFloat(price);
        }
        
        // Save updates
        await product.update();
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product: product.toJSON()
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update product' 
        });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if product exists
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }
        
        // Delete product
        await Product.delete(id);
        
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete product' 
        });
    }
};

// Search products using MongoDB
export const searchProducts = async (req, res) => {
    try {
        const { q, minPrice, maxPrice, sort } = req.query;
        const { page = 1, limit = 10 } = req.query;
        
        // Build queryPool filters
        const filter = Object.create(null);
        
        // Text search
        if (q) {
            filter.$text = { $search: q };
        }
        
        // Price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice !== undefined) filter.price.$lte = parseFloat(maxPrice);
        }
        
        // Get MongoDB collection
        const collection = getCollection('products');
        
        // Build sort options
        const sortOptions = {};
        if (sort === 'price_asc') {
            sortOptions.price = 1;
        } else if (sort === 'price_desc') {
            sortOptions.price = -1;
        } else if (sort === 'date_asc') {
            sortOptions.created_at = 1;
        } else {
            // Default: newest first
            sortOptions.created_at = -1;
        }
        
        // Execute queryPool with pagination
        const products = await collection
            .find(filter)
            .sort(sortOptions)
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .toArray();
        
        // Get total count
        const total = await collection.countDocuments(filter);
        
        res.status(200).json({
            success: true,
            data: products.map(p => ({
                id: p.product_id,
                name: p.name,
                description: p.description,
                price: p.price,
                created_at: p.created_at,
                updated_at: p.updated_at
            })),
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to search products' 
        });
    }
};