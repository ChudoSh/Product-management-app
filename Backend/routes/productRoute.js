import express from 'express';
import { 
    getAllProducts, 
    createProduct,
    updateProduct,
    searchProducts,
    deleteProduct,
    getProductById
} from '../controllers/productController.js';
import { authenticate } from '../middleware/auth.js';
import { validateProduct, validateSearch } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', authenticate, validateProduct, createProduct);
router.get('/:id', getProductById);
router.put('/:id', authenticate, validateProduct, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;