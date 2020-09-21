const express = require('express');
const router = express.Router();
const { recommend, display } = require('../controllers/match');

// @route   POST /match/recommend
// @desc    Match and filter
// @access  Public
router.post('/recommend', recommend)

// @route   POST /match/likedme
// @desc    Display all who liked me
// @access  Public
router.post('/likedme', display.likedMe)


// @route   POST /match/connected
// @desc    Display all who liked me
// @access  Public
router.post('/connected', display.connected)


module.exports = router;
