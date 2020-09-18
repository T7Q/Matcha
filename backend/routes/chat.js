const express = require('express');
const chat = require('../controllers/chat');
const router = express.Router();

// @route   GET chat/user/:user_id
// @desc    Return all user's chats
// @access  Public
router.get('/', chat.all);

// @route   GET chat/:chat_id/messages
// @desc    Return chat's messages
// @access  Public
router.get('/:chat_id/messages', chat.history);

// @route   POST chat/message
// @desc    Add message to chat
// @access  Public
router.post('/message', chat.addMessage);

// @route   POST chat/message
// @desc    Add message to chat
// @access  Public
// router.post('/message', chat.addMessage);

// @route   GET api/images
// @desc    Test route
// @access  Public
// router.get('/api/chat/:chat_id', (req, res) => (io) => {
//     res.send('Image route');
// })

module.exports = router;
