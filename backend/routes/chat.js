const express = require('express');
const chat = require('../controllers/chat');
const router = express.Router();
const middleware = require('../utils/middleware');

// @route   GET chat/
// @desc    Return logged user's chats
// @access  Private
router.get('/', middleware.authRequired, chat.conversations);

// @route   GET chat/:chatId
// @desc    Return chat's messages
// @access  Private
router.get('/:chatId', middleware.authRequired, chat.history);

// @route   POST chat/message
// @desc    Add message to chat
// @access  Private
router.post('/message', middleware.authRequired, chat.addMessage);

module.exports = router;
