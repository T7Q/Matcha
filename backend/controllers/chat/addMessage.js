const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    let { chatId, senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
        return res.status(400).json({ 'error': 'not full information' });
    }

    // if (senderId === receiverId || (req.user && req.user.userId != senderId)) {
    //     return res.status(403).json({ 'error': 'not that user' });
    // }

    try {
        if (!chatId || !(await chatModel.isChatExists(chatId))) {
            const searchChat = await chatModel.searchChat(senderId, receiverId);
            if (!searchChat) {
                chatId = await chatModel.createChat(senderId, receiverId);
            } else {
                chatId = searchChat.chat_id;
            }
        }

        await chatModel.addMessage(chatId, senderId, content);
        return res.json({ 'msg': 'message sent' });
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
}
