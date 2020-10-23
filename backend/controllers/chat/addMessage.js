const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    let { chatId, senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
        return res.json({ error: 'not full information' });
    }

    if (!chatId || !(await chatModel.isChatExists(chatId))) {
        const searchChat = await chatModel.searchChat(senderId, receiverId);
        if (!searchChat) {
            chatId = await chatModel.createChat(senderId, receiverId);
        } else {
            chatId = searchChat.chat_id;
        }
    }

    await chatModel.addMessage(chatId, senderId, content, receiverId);
    return res.json({ msg: 'message sent' });
};
