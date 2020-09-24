const express = require('express');
const router = express.Router();
const account = require('../controllers/account');
const authorization = require('../middleware/authorization');

// @route   GET /account
// @desc    Return all users
// @access  Public
router.get('/', authorization.required, account.getAll);

// @route   GET /account
// @desc    Return all users
// @access  Public
router.get('/auth', authorization.withStatus1, account.auth);

// @route   POST /account/register
// @desc    Create a new user
// @access  Public
router.post('/register', authorization.forbidden, account.register);

// @route   POST /account/login
// @desc    Login into an account
// @access  Public
router.post('/login', authorization.forbidden, account.login);

// @route   POST /account/pwdReset
// @desc    Reset a password
// @access  Public
router.post('/pwdReset', account.pwdReset);

// @route   POST /account/pwdUpdate
// @desc    Reset a password
// @access  Public
router.post('/pwdUpdate', account.pwdUpdate);

// @route   POST /account/activate
// @desc    Reset a password
// @access  Public
router.post('/activate', authorization.forbidden, account.activate);

// @route   POST /account/validate
// @desc    Reset a password
// @access  Public
router.post('/validateData', account.validateData);

// @route   GET /account/facebook
// @desc    Login via facebook
// @access  Public
// router.post('/facebook', account.facebook);

// @route   GET /account/auth/google/login
// @desc    Login via google
// @access  Public
router.get('/auth/google/login', authorization.forbidden, account.getGoogleLink);

// @route   GET /account/google/login
// @desc    Login via google
// @access  Public
router.get('/auth/google', authorization.forbidden, account.googleLogin);

// @route   GET /account/google/register
// @desc    Login via google
// @access  Public
router.post('/auth/google/register', authorization.forbidden, account.registerGoogle);

// @route   GET /account/logout
// @desc    Logout active user
// @access  Public
router.post('/logout', account.logout);

module.exports = router;
