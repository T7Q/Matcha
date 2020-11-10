module.exports = (server) => {
    const io = require('socket.io')(server, {
        pingTimeout: 60000,
    });

    io.on('connection', (socket) => {
        socket.on('SEND_MESSAGE', (chatId, partnerId, text) => {
            io.to(chatId).emit('MESSAGE', chatId);
            io.to('user' + partnerId).emit('UPDATE_NOTIFICATIONS', 'message', chatId, text);
        });

        socket.on('SEE_CONVERSATION', (userId, senderId) => {
            io.to('user' + userId).emit('READ_MESSAGES', senderId);
        });

        socket.on('UPDATE_NOTIFICATIONS', (userId, type, message) => {
            socket.to('user' + userId).emit('UPDATE_NOTIFICATIONS', type, message);
        });

        socket.on('TYPING_NOTIFICATION', (chatId, typing, partnerId) => {
            socket.broadcast.to('user' + partnerId).emit('TYPING_NOTIFICATION', chatId, typing);
        });

        socket.on('JOIN_CHAT', (chatId) => {
            socket.join(chatId);
        });

        socket.on('LOGIN', (userId) => {
            socket.join('user' + userId);
            socket.broadcast.emit('ONLINE', userId, true);
        });

        socket.on('LOGOUT', (userId) => {
            socket.leave('user' + userId);
            socket.broadcast.emit('ONLINE', userId, false);
        });
    });
};
