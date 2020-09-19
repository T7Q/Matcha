const chat = require('../../models/chat');
const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { chatId, userId } = req.params;

    // if (userId != req.user.userId) {
    //     return res.status(401).json({ 'error': 'not that user' });
    // }

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
