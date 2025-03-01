import { getCollection } from '../config/db/mongodbSetup.js';

class SearchService {
  static async searchProducts(filters = {}, page = 1, limit = 10) {
    const { q, minPrice, maxPrice, sort } = filters;
    
    const query = {};
    
    if (q && q.trim() !== '') {
      query.$text = { $search: q };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
    }
    
    const collection = getCollection('products');
    
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
      const products = await collection
        .find(query)
        .sort(sortOptions)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .toArray();
      
      const total = await collection.countDocuments(query);
      
      const formattedProducts = products.map(p => ({
        id: p.product_id,
        name: p.name,
        description: p.description,
        price: p.price,
        created_at: p.created_at,
        updated_at: p.updated_at
      }));
      
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
}

export default SearchService;