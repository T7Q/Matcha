const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

module.exports = socket => {
    console.log('user connected in socket');

    socket.on('SEND_MESSAGE', chatId => {
        console.log('add data new');
        console.log('data', data);
        socket.emit('MESSAGE', chatId);
    });

    socket.on('getMessages', data => {
        console.log('get data');
        console.log(data);
    });

    socket.on('JOIN_CHAT', chatId => {
        console.log('joining chat', chatId);
        socket.join(chatId);
    });
};
