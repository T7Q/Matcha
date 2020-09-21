const express = require('express');
const router = express.Router();
const { filter, display } = require('../controllers/match');

// @route   POST /match/filter
// @desc    Match and filter
// @access  Public
router.post('/filter', filter)

// @route   POST /match/likedme
// @desc    Display all who liked me
// @access  Public
router.post('/likedme', display.likedMe)


// @route   POST /match/connected
// @desc    Display all who liked me
// @access  Public
router.post('/connected', display.connected)

// @route   POST /match/visitedme
// @desc    Display all who liked me
// @access  Public
router.post('/visitedme', display.visitedMe)

// @route   POST /match/visitedme
// @desc    Display all who liked me
// @access  Public
router.post('/visitedbyme', display.visitedByMe)

// @route   POST /match/recommended
// @desc    Display all who liked me
// @access  Public
router.post('/recommend', display.recommend)


module.exports = router;
