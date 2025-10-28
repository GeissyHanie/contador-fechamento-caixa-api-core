const express = require('express');
const router = express.Router();
const { getReview, updateDenomination, getFinalResult } = require('../controllers/reviewController');


router.get('/', getReview);
router.put('/denomination', updateDenomination);
router.get('/result', getFinalResult);

module.exports = router;
