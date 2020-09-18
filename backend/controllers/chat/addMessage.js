module.exports = async (req, res) => {
    const { chatId, userId } = req.body;

    let io = req.io;
    io.emit('chat');
    console.log('here');
    // res.send('Image route');
    res.send();
}
