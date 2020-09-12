const express = require('express');
const router = express.Router();
const { create, edit } = require('../controllers/profile');

// @route   POST /profile/create
// @desc    Add profile info
// @access  Public
router.post('/create', create)

// @route   POST /profile/edit
// @desc    Edit profile info
// @access  Public
router.post('/edit', edit)

module.exports = router;
