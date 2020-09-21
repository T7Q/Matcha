const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user.userId;

    try {
        const result = await chatModel.getChatMessages(chatId);
        if (result.sender_id !== userId || result.receiver_id !== userId) {
            return res.status(401).json({ 'error': 'You do not have permissions' });
        }
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
}
