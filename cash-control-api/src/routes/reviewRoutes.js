const express = require('express');
const ReviewController = require('../controllers/reviewController');

const router = express.Router();
const reviewController = new ReviewController();

// Route to review cash count
router.get('/review/:id', reviewController.reviewCount);

// Route to update cash count
router.put('/update/:id', reviewController.updateCount);

module.exports = router;