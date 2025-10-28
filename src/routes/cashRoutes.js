const express = require('express');
const router = express.Router();
const { insertDenomination, getPartialResult } = require('../controllers/cashController');

router.post('/denomination', insertDenomination);
router.get('/result', getPartialResult);

module.exports = router;
