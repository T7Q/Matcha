const socket = require('socket.io');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

module.exports = socket => {
    console.log('user connected');
    socket.on('addMessage', (data) => {
        console.log('add data');
        console.log(data);
    });
    socket.on('getMessages', (data) => {
        console.log('get data');
        console.log(data);
    });
}
