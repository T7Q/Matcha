const express = require('express');
const router = express.Router();
const { filter, display } = require('../controllers/match');
const authorization = require('../middleware/authorization');

// @route   POST /match/filter
// @desc    Match and filter
// @access  Public
router.post('/filter', authorization.required, filter);

// @route   POST /match/likedme
// @desc    Display all who liked me
// @access  Private
router.get('/likedme', authorization.required, display.likedMe);

// @route   POST /match/connected
// @desc    Display all who liked me
// @access  Private
router.get('/connected', authorization.required, display.connected);

// @route   POST /match/visitedme
// @desc    Display all who liked me
// @access  Private
router.get('/visitedme', authorization.required, display.visitedMe);

// @route   POST /match/visitedme
// @desc    Display all who liked me
// @access  Private
router.get('/visitedbyme', authorization.required, display.visitedByMe);

// @route   POST /match/recommend
// @desc    Display all who liked me
// @access  Private
router.get('/recommend', authorization.required, display.recommend);

module.exports = router;
