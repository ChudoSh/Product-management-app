// services/searchService.js
import { getCollection } from '../config/db/mongodbSetup.js';

class SearchService {
  /**
   * Search products with filters and sorting
   * @param {Object} filters - Search filters
   * @param {string} filters.q - Search text
   * @param {number} filters.minPrice - Minimum price
   * @param {number} filters.maxPrice - Maximum price
   * @param {string} filters.sort - Sort option (price_asc, price_desc, date_asc, date_desc)
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} - Products and pagination info
   */
  static async searchProducts(filters = {}, page = 1, limit = 10) {
    const { q, minPrice, maxPrice, sort } = filters;
    
    // Build MongoDB query
    const query = {};
    
    // Text search
    if (q && q.trim() !== '') {
      query.$text = { $search: q };
    }
    
    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Get MongoDB collection
    const collection = getCollection('products');
    
    // Determine sort options
    const sortOptions = {};
    switch (sort) {
      case 'price_asc':
        sortOptions.price = 1;
        break;
      case 'price_desc':
        sortOptions.price = -1;
        break;
      case 'date_asc':
        sortOptions.created_at = 1;
        break;
      case 'date_desc':
      default:
        sortOptions.created_at = -1;
    }
    
    try {
      // Execute query with pagination
      const products = await collection
        .find(query)
        .sort(sortOptions)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();
      
      // Get total count for pagination
      const total = await collection.countDocuments(query);
      
      // Format product data
      const formattedProducts = products.map(p => ({
        id: p.product_id,
        name: p.name,
        description: p.description,
        price: p.price,
        created_at: p.created_at,
        updated_at: p.updated_at
      }));
      
      // Return formatted results with pagination
      return {
        data: formattedProducts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      };
    } catch (error) {
      console.error('Search error:', error);
      throw new Error('Failed to search products');
    }
  }
  
  /**
   * Create MongoDB text search index
   * @returns {Promise<void>}
   */
  static async createSearchIndexes() {
    try {
      const collection = getCollection('products');
      
      // Create text index on name and description
      await collection.createIndex(
        { name: 'text', description: 'text' },
        { weights: { name: 10, description: 5 } }
      );
      
      console.log('Product search indexes created');
    } catch (error) {
      console.error('Error creating search indexes:', error);
      throw error;
    }
  }
}

export default SearchService;