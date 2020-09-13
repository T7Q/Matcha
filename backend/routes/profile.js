const express = require('express');
const router = express.Router();
const { create, edit, interaction } = require('../controllers/profile');

// @route   POST /profile/create
// @desc    Add profile info
// @access  Public
router.post('/create', create)

// @route   POST /profile/edit
// @desc    Edit profile info
// @access  Public
router.post('/edit', edit)

// @route   POST /profile/interaction
// @desc    Add like, view, block, report
// @access  Public
router.post('/addinteraction', interaction.add)

// @route   POST /profile/interaction
// @desc    remove like, view, block, report
// @access  Public
router.post('/removeinteraction', interaction.remove)

module.exports = router;
