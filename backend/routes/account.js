const express = require('express');
const router = express.Router();
const register = require('../controllers/account/register');
const getAll = require('../controllers/account/getAll');
const login = require('../controllers/account/login');

// @route   GET /users
// @desc    Return all users
// @access  Public
router.get('/', getAll);

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/register', register);

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/login', login);

module.exports = router;
