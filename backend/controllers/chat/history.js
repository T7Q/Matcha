const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await chatModel.getChatMessages(chatId);
        if (result[0].sender_id !== userId && result[0].receiver_id !== userId) {
            return res.json({ error: 'You do not have permissions' });
        }
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json();
    }
};
