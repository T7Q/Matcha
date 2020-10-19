module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // console.log('user connected in socket');

        socket.on('SEND_MESSAGE', (chatId, partnerId) => {
            // console.log('send message to chat', chatId);
            io.to(chatId).emit('MESSAGE', chatId);
            io.to('user' + partnerId).emit('MESSAGE_NOTIFICATION');
        });

        socket.on('SEE_CONVERSATION', (userId, senderId) => {
            // console.log('in messages', userId);
            io.to('user' + userId).emit('READ_MESSAGES', senderId);
        });

        socket.on('getMessages', data => {
            console.log('get data');
            console.log(data);
        });

        socket.on('JOIN_CHAT', chatId => {
            // console.log('joined chat', chatId);
            socket.join(chatId);
        });

        socket.on('LOGIN', userId => {
            // console.log('loged in', userId);
            socket.join('user' + userId);
        });
    });
};
