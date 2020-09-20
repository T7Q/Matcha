const express = require('express');
const router = express.Router();
const { create, edit, deleteAccount, interaction, notification, photo } = require('../controllers/profile');

// @route   POST /profile/create
// @desc    Add profile info
// @access  Public
router.post('/create', create)

// @route   POST /profile/edit
// @desc    Edit profile info (gender, sex preferences, birth date, country)
// @access  Public
router.post('/edit', edit.general)

// @route   POST /profile/editTags
// @desc    Edit profile info
// @access  Public
router.post('/editTags', edit.tags)

// @route   POST /profile/addinteraction
// @desc    Add like, view, block, report
// @access  Public
router.post('/addinteraction', interaction.add)

// @route   POST /profile/removeinteraction
// @desc    remove like, view, block, report
// @access  Public
router.post('/removeinteraction', interaction.remove)

// @route   POST /profile/delete
// @desc    Delete account
// @access  Public
router.post('/delete', deleteAccount)

// @route   POST /profile/editnotification
// @desc    Edit notification settings: email, push
// @access  Public
router.post('/editnotification', notification.edit)

// @route   POST /profile/uploadphoto
// @desc    Upload (profile) photo
// @access  Public
router.post('/uploadphoto', photo.upload)

// @route   POST /profile/deletephoto
// @desc    Delete user photo
// @access  Public
router.post('/deletephoto', photo.deletePhoto)


module.exports = router;
