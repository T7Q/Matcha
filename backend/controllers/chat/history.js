const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user.userId;

    if (!userId || !chatId) {
        return res.status(422).json({ 'error': 'not found' });
    }
    try {
        const result = await chatModel.getChatMessages(chatId);
        return res.json(result);
    } catch (error) {
        return res.status(400).json();
    }
}
