const express = require('express');
const router = express.Router();
const { show, create, edit, deleteAccount, interaction, notification, photo } = require('../controllers/profile');
const authorization = require('../middleware/authorization');

// @route   GET /
// @desc    Get my profile
// @access  Private
router.get('/', authorization.required, show.myProfile);

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
router.post('/addinteraction', authorization.required, interaction.add);

// @route   POST /profile/removeinteraction
// @desc    remove like, view, block, report
// @access  Private
router.post('/removeinteraction', authorization.required, interaction.remove);

// @route   POST /profile/delete
// @desc    Delete account
// @access  Private
router.post('/delete', authorization.required, deleteAccount);

// @route   POST /profile/editnotification
// @desc    Edit notification settings: email, push
// @access  Private
router.post('/editnotification', authorization.required, notification.edit);

// @route   POST /profile/uploadphoto
// @desc    Upload (profile) photo
// @access  Private
router.post('/uploadphoto', authorization.required, photo.upload);

// @route   POST /profile/deletephoto
// @desc    Delete user photo
// @access  Private
router.post('/deletephoto', authorization.required, photo.deletePhoto);

module.exports = router;