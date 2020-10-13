const express = require('express');
const router = express.Router();
const { show, create, edit, deleteAccount, interaction, notification, photo } = require('../controllers/profile');
const authorization = require('../middleware/authorization');
const profileModel = require('../models/profile');

// @route   GET /me
// @desc    Get my (logged in user) profile
// @access  Private
router.get('/me', authorization.required, show.myProfile);

// @route   GET /user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', authorization.required, show.userProfile);

// @route   GET /profile/tags
// @desc    Get all tags
// @access  Public
router.get('/tags', profileModel.getTags);

// @route   GET /profile/me/tags
// @desc    Get all tags
// @access  Public
router.get('/me/tags', show.userTags);

// @route   GET /profile/notifications
// @desc    Get all tags
// @access  Public
router.get('/notifications', authorization.required, profileModel.getNotifications);

// @route   POST /
// @desc    Show other user profile
// @access  Private
router.post('/', authorization.required, show.userProfile);

// @route   POST /profile/create
// @desc    Add profile info
// @access  Private
router.post('/create', create);

// @route   POST /profile/edit
// @desc    Edit profile info (gender, sex preferences, birth date, country)
// @access  Private
router.post('/edit', authorization.required, edit.general);

// @route   POST /profile/editTags
// @desc    Edit profile info
// @access  Private
router.post('/editTags', authorization.required, edit.tags);

// @route   POST /profile/addinteraction
// @desc    Add like, view, block, report
// @access  Private
router.post('/addinteraction/:type/:user_id', authorization.required, interaction.add);

// @route   POST /profile/removeinteraction
// @desc    remove like, view, block, report
// @access  Private
router.post('/removeinteraction/:type/:user_id', authorization.required, interaction.remove);

// @route   POST /profile/delete
// @desc    Delete account
// @access  Private
router.post('/delete', authorization.required, deleteAccount);

// @route   POST /profile/editnotification
// @desc    Edit notification settings: email, push
// @access  Private
router.post('/notifications', authorization.required, notification.edit);

// @route   POST /profile/uploadphoto
// @desc    Upload (profile) photo
// @access  Private
router.post('/uploadphoto', authorization.required, photo.upload);

// @route   POST /profile/deletephoto
// @desc    Delete user photo
// @access  Private
router.post('/deletephoto', authorization.required, photo.deletePhoto);

// @route   POST /profile/connected
// @desc    Check if users are connected
// @access  Private
router.post('/connected/:user_id', authorization.required, interaction.connected);

// @route   GET /blockedUsers
// @desc    Get list of blocked users
// @access  Private
router.get('/blockedUsers', authorization.required, show.blockedUsers);

module.exports = router;
