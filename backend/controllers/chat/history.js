const chatModel = require('../../models/chat');

module.exports = async (req, res) => {
    const { chatId, userId } = req.body;

    if (req.user !== userId) {
        return res.status(401).json();
    }

    let io = req.io;
    io.emit('chat');
    console.log('here');
    // res.send('Image route');
    return res.send();
}
