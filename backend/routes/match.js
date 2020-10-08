const express = require('express');
const router = express.Router();
const { filter, display } = require('../controllers/match');
const authorization = require('../middleware/authorization');

// @route   POST /match/filter
// @desc    Match and filter
// @access  Public
router.post('/filter', authorization.required, filter);

// @route   GET /match/likedme
// @desc    Display all who liked me
// @access  Private
router.get('/likedme', authorization.required, display.likedMe);

// @route   GET /match/connected
// @desc    Display all who liked me
// @access  Private
router.get('/connected', authorization.required, display.connected);

// @route   GET /match/visitedme
// @desc    Display all who liked me
// @access  Private
router.get('/visitedme', authorization.required, display.visitedMe);

// @route   GET /match/visitedme
// @desc    Display all who liked me
// @access  Private
router.get('/visitedbyme', authorization.required, display.visitedByMe);

// @route   GET /match/recommend
// @desc    Display all who liked me
// @access  Private
router.get('/recommend', authorization.required, display.recommend);

module.exports = router;
