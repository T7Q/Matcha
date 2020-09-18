const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await chatModel.getUserConversations(userId);
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
