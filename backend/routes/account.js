const express = require('express');
const router = express.Router();
const { register, getAll, login, pwdReset } = require('../controllers/account');

// @route   GET /users
// @desc    Return all users
// @access  Public
router.get('/', getAll);

// @route   POST /users/register
// @desc    Create a new user
// @access  Public
router.post('/register', register);

// @route   POST /users/login
// @desc    Login into an account
// @access  Public
router.post('/login', login);

// @route   POST /users/pwdReset
// @desc    Reset a password
// @access  Public
router.post('/pwdReset', pwdReset);

// @route   GET /users/facebook
// @desc    Login via facebook
// @access  Public
// router.post('/facebook', facebook);

// @route   GET /users/google
// @desc    Login via google
// @access  Public
// router.post('/google', google);

module.exports = router;
