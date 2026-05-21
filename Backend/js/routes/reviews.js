const express = require('express');
const { 
  getProductReviews, 
  addReview, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviews');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getProductReviews)
  .post(protect, authorize('retailer'), addReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;

