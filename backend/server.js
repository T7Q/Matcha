const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authToken = require('./utils/token');

const app = express();

// Rate limit setup
const limiter = new rateLimit({
    windowMs: 60*1000,   // 1 minute
    max: 100,               // limit of number of request per IP
    delayMs: 0              // disable delays
});

app.use(cors());

// Accept the incoming JSON body in requests
app.use(express.json());

// Secure HTTP headers
app.use(helmet());

//  Apply rate limit to all requests
app.use(limiter);

// JWT setup
app.use(authToken);

// Handle routes
app.use('/account', require('./routes/account'));
app.use('/profile', require('./routes/profile'));
app.use('/chat', require('./routes/chat'));
app.use('/match', require('./routes/match'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
