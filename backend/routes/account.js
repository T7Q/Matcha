const express = require('express');
const router = express.Router();
const account = require('../controllers/account');
const authRequired = require('../controllers/account/authRequired');

// @route   GET /account
// @desc    Return all users
// @access  Public
router.get('/', authRequired, account.getAll);

// @route   POST /account/register
// @desc    Create a new user
// @access  Public
router.post('/register', account.register);

// @route   POST /account/login
// @desc    Login into an account
// @access  Public
router.post('/login', account.login);

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
router.post('/activate', account.activate);

// @route   POST /account/validate
// @desc    Reset a password
// @access  Public
router.post('/validateData', account.validateData);

// @route   GET /account/facebook
// @desc    Login via facebook
// @access  Public
// router.post('/facebook', account.facebook);

// @route   GET /account/google
// @desc    Login via google
// @access  Public
// router.post('/google', account.google);

module.exports = router;
