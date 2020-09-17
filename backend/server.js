const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authentication = require('./middleware/authentication');
const config = require('./config');
const socket = require('./socket');

const app = express();

// Rate limit setup
const limiter = new rateLimit({
    windowMs: 60 * 1000,   // 1 minute
    max: 100,               // limit of number of request per IP
    message: 'You have exceeded the 100 requests in 1 minute limit!',
    delayMs: 0              // disable delays
});


/* ------------------------------------------------------------------------
 * Setup
 * ------------------------------------------------------------------------ */

app.use(cors({ origin: 'http:localhost:3000' }));
// Accept the incoming JSON body in requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Secure HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));
//  Apply rate limit to all requests
app.use(limiter);
// JWT setup
app.use(authentication);


/* ------------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------------ */

app.use('/account', require('./routes/account'));
app.use('/profile', require('./routes/profile'));
app.use('/chat', require('./routes/chat'));
app.use('/match', require('./routes/match'));
const server = require('http').createServer(app);
socket(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'How are you' },
    { name: 'Tim', message: 'Fine' }
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', async (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.status(200).send();
})

app.listen(config.express.port, config.express.ip, (error) => {
    console.log(`Server is listening on http://${config.express.ip}:${config.express.port}`);
});
