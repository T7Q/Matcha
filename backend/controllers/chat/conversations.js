const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const userId = req.user.userId;

    const result = await chatModel.getUserConversations(userId);
    return res.send(result);
};
