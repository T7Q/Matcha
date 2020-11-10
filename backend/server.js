const config = require('./config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const socket = require('./socketIo');
const middleware = require('./utils/middleware');

const app = express();
const server = http.createServer(app);
socket(server);

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

// use static files
app.use(express.static('images'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
// Accept the incoming JSON body in requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// Secure HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
//  Apply rate limit to all requests
app.use(limiter);
// JWT setup
app.use(middleware.authentication);

/* ------------------------------------------------------------------------
 * Routes
 * ------------------------------------------------------------------------ */

app.use('/api/account', require('./routes/account'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/match', require('./routes/match'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

server.listen(config.express.port, config.express.ip, (error) => {
    console.log(`Server is listening on http://${config.express.ip}:${config.express.port}`);
});
