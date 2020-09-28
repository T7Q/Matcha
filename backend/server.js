const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const socketIo = require('./socketIo');
const authentication = require('./middleware/authentication');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', socketIo);

// Rate limit setup
const limiter = new rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // limit of number of request per IP
    message: 'You have exceeded the 100 requests in 1 minute limit!',
    delayMs: 0, // disable delays
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

/* DELETE BELLOW */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'How are you' },
    { name: 'Tim', message: 'Fine' },
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', async (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.status(200).send();
});
/* UNTIL NOW */
app.get('*', (req, res) => res.status(404).json());

server.listen(config.express.port, config.express.ip, error => {
    console.log(`Server is listening on http://${config.express.ip}:${config.express.port}`);
});
