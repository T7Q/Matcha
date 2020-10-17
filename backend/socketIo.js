module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        console.log('user connected in socket');

        socket.on('SEND_MESSAGE', chatId => {
            io.emit('MESSAGE', chatId);
        });

        socket.on('getMessages', data => {
            console.log('get data');
            console.log(data);
        });

        socket.on('JOIN_CHAT', chatId => {
            socket.join(chatId);
        });
    });
};
