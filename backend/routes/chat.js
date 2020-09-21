const express = require('express');
const chat = require('../controllers/chat');
const router = express.Router();
const authorization = require('../middleware/authorization');

// @route   GET chat/
// @desc    Return logged user's chats
// @access  Private
// router.get('/user/:userId', authorization.required, chat.conversations);
router.get('/', chat.conversations);

// @route   GET chat/:chatId
// @desc    Return chat's messages
// @access  Private
// router.get('/:chatId/user/:userId/messages', authorization.required, chat.history);
router.get('/:chatId',chat.history);

// @route   POST chat/message
// @desc    Add message to chat
// @access  Private
// router.post('/message', authorization.required, chat.addMessage);
router.post('/message', chat.addMessage);

// @route   POST chat/message
// @desc    Add message to chat
// @access  Private
// router.post('/message', chat.addMessage);

// @route   GET api/images
// @desc    Test route
// @access  Private
// router.get('/api/chat/:chat_id', (req, res) => (io) => {
//     res.send('Image route');
// })

module.exports = router;
