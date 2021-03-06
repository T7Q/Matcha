const express = require('express');
const router = express.Router();
const { filter, display } = require('../controllers/match');
const middleware = require('../utils/middleware');

// @route   POST /match/filter
// @desc    Match and filter
// @access  Public
router.post('/filter', middleware.authRequired, filter);

// @route   GET /match/likedme
// @desc    Display all who liked me
// @access  Private
router.get('/likedme', middleware.authRequired, display.likedMe);

// @route   GET /match/connected
// @desc    Display all who liked me and I liked back
// @access  Private
router.get('/connected', middleware.authRequired, display.connected);

// @route   GET /match/visitedme
// @desc    Display all who visited me
// @access  Private
router.get('/visitedme', middleware.authRequired, display.visitedMe);

// @route   GET /match/visitedbyme
// @desc    Display all visited by me
// @access  Private
router.get('/visitedbyme', middleware.authRequired, display.visitedByMe);

module.exports = router;
