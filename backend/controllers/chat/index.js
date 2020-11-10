const chatModel = require('../../models/chat');

const history = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user.userId;
    const result = await chatModel.getChatMessages(chatId, userId);

    if (result.length > 0 && result[0].sender_id !== userId && result[0].receiver_id !== userId) {
        return res.json({ error: 'You do not have permissions' });
    }

    return res.json(result);
};

const conversations = async (req, res) => {
    const userId = req.user.userId;
    const result = await chatModel.getUserConversations(userId);

    return res.send(result);
};

const addMessage = async (req, res) => {
    let { chatId, senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
        return res.json({ error: 'not full information' });
    }

    let existedChat;

    if (!chatId || !(await chatModel.isChatExists(chatId))) {
        existedChat = await chatModel.searchChat(senderId, receiverId);
        if (!existedChat) {
            chatId = await chatModel.createChat(senderId, receiverId);
        } else {
            chatId = existedChat.chat_id;
        }
    }

    if (existedChat && existedChat.active) {
        await chatModel.addMessage(chatId, senderId, content, receiverId);
    } else {
        return res.json({ error: 'You are not connected' });
    }

    return res.json({ msg: 'message sent' });
};

module.exports = {
    history,
    addMessage,
    conversations,
};
