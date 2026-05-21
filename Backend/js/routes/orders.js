const express = require('express');
const { 
  createOrder, 
  getOrders, 
  getOrder, 
  updateOrderStatus,
  updatePaymentStatus
} = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .get(getOrders)
  .post(authorize('retailer'), createOrder);

router.route('/:id')
  .get(getOrder)
  .put(authorize('farmer', 'admin'), updateOrderStatus);

router.route('/:id/payment')
  .put(authorize('admin'), updatePaymentStatus);

module.exports = router;