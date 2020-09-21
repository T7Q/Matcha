const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await chatModel.getUserConversations(userId);
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
}
