module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        console.log('user connected in socket');

        socket.on('SEND_MESSAGE', chatId => {
            console.log('send message to chat', chatId);
            io.to(chatId).emit('MESSAGE', chatId);
        });

        socket.on('IN_MESSAGES', userId => {
            console.log('in messages', userId);
            io.to('user' + userId).emit('READ_MESSAGES', 'read');
        });

        socket.on('getMessages', data => {
            console.log('get data');
            console.log(data);
        });

        socket.on('JOIN_CHAT', chatId => {
            console.log('joined chat', chatId);
            socket.join(chatId);
        });

        socket.on('LOGIN', userId => {
            console.log('loged in', userId);
            socket.join('user' + userId);
        });
    });
};
