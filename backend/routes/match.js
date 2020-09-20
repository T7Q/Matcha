const express = require('express');
const router = express.Router();
const { recommend } = require('../controllers/match');

// @route   POST /match/recommend
// @desc    Match and filter
// @access  Public
router.post('/recommend', recommend)

module.exports = router;
