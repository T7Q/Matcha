const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')
const UserModel = require('../models/user');

// @route   GET /users
// @desc    Return all users
// @access  Public
router.get('/', UserModel.getAll);

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/register', UserController.validate, UserModel.register);

module.exports = router;
