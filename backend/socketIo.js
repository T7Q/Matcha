module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // console.log('user connected in socket');

        socket.on('SEND_MESSAGE', (chatId, partnerId) => {
            // console.log('send message to chat', chatId);
            io.to(chatId).emit('MESSAGE', chatId);
            io.to('user' + partnerId).emit('UPDATE_NOTIFICATIONS', 'message');
        });

        socket.on('SEE_CONVERSATION', (userId, senderId) => {
            // console.log('in messages', userId);
            io.to('user' + userId).emit('READ_MESSAGES', senderId);
        });

        socket.on('UPDATE_NOTIFICATIONS', (userId, type) => {
            console.log('update to ', userId);
            socket.to('user' + userId).emit('UPDATE_NOTIFICATIONS', type);
        });

        socket.on('JOIN_CHAT', chatId => {
            // console.log('joined chat', chatId);
            socket.join(chatId);
        });

        socket.on('LOGIN', userId => {
            console.log('loged in', userId);
            socket.join('user' + userId);
        });
    });
};
