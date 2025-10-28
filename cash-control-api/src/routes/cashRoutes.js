const express = require('express');
const CashController = require('../controllers/cashController');

const router = express.Router();
const cashController = new CashController();

// Route for counting cash
router.post('/count', cashController.countCash.bind(cashController));

// Route for retrieving cash count result
router.get('/result', cashController.getCashCount.bind(cashController));

module.exports = router;