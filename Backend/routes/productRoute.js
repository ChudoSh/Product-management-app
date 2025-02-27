import express from 'express';
import { 
    getAllProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
} from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { validateProduct, validateSearch } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

router.post('/', authenticate, validateProduct, createProduct);
router.put('/:id', authenticate, validateProduct, updateProduct);
router.get('/search', validateSearch, searchProducts);

export default router;