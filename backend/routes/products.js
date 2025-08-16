const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

const { protect } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
