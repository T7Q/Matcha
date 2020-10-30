const express = require('express');
const router = express.Router();
const {
    show,
    create,
    edit,
    deleteAccount,
    interaction,
    notifications,
    uploadPhoto,
} = require('../controllers/profile');
const middleware = require('../utils/middleware');
const profileModel = require('../models/profile');

// @route   GET /profile/me
// @desc    Get my (logged in user) profile
// @access  Private
router.get('/me', middleware.authRequired, show.myProfile);

// @route   GET /profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', middleware.authRequired, show.userProfile);

// @route   GET /profile/visit/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/visit/:user_id', middleware.authRequired, show.visitOtherProfile);

// @route   GET /profile/tags
// @desc    Get all tags
// @access  Public
router.get('/tags', profileModel.getTags);

// @route   GET /profile/me/tags
// @desc    Get all tags
// @access  Private
router.get('/me/tags', middleware.authRequired, show.userTags);

// @route   GET /profile/notifications
// @desc    Get all tags
// @access  Public
router.get('/notifications/:type', middleware.authRequired, notifications.get);

// @route   POST /profile/notifications/:type/:id
// @desc    Edit notification settings: email, push
// @access  Private
router.delete('/notifications/:type/:id', middleware.authRequired, notifications.remove);

// @route   POST /profile/create
// @desc    Add profile info
// @access  Private
router.post('/create', middleware.authWithStatus1, create);

// @route   POST /profile/edit
// @desc    Edit profile info (gender, sex preferences, birth date, country)
// @access  Private
router.post('/edit', middleware.authRequired, edit.general);

// @route   POST /profile/editTags
// @desc    Edit profile info
// @access  Private
router.post('/editTags', middleware.authRequired, edit.tags);

// @route   POST /profile/addinteraction
// @desc    Add like, view, block, report
// @access  Private
router.post('/addinteraction/:type/:user_id', middleware.authRequired, interaction.add);

// @route   POST /profile/removeinteraction
// @desc    remove like, view, block, report
// @access  Private
router.post('/removeinteraction/:type/:user_id', middleware.authRequired, interaction.remove);

// @route   POST /profile/delete
// @desc    Delete account
// @access  Private
router.post('/delete', middleware.authRequired, deleteAccount);

// @route   POST /profile/uploadphoto
// @desc    Upload (profile) photo
// @access  Private
router.post('/uploadphoto', middleware.authRequired, uploadPhoto);

// @route   POST /profile/connected
// @desc    Check if users are connected
// @access  Private
router.post('/connected/:user_id', middleware.authRequired, interaction.connected);

// @route   GET /profile/blockedUsers
// @desc    Get list of blocked users
// @access  Private
router.get('/blockedUsers', middleware.authRequired, show.blockedUsers);

module.exports = router;
