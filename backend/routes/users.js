const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// @route   GET /users
// @desc    Return all users
// @access  Public
router.get('/', UserController.getAll);

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/register', UserController.register);

module.exports = router;
