const express = require('express');
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getFarmerProducts
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const reviewRouter = require('./reviews');

const router = express.Router();

// Re-route into other resource routers
router.use('/:productId/reviews', reviewRouter);

router.route('/')
  .get(getProducts)
  .post(protect, authorize('farmer'), createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('farmer'), updateProduct)
  .delete(protect, authorize('farmer'), deleteProduct);

router.route('/farmer/:farmerId')
  .get(getFarmerProducts);

module.exports = router;

