const express = require('express');
const authToken = require('./utils/token');

const app = express();

// Accept the incoming JSON body in requests
app.use(express.json());

// JWT setup
app.use(authToken);

// Handle routes
app.use('/account', require('./routes/account'));
app.use('/profile', require('./routes/profile'));
app.use('/chat', require('./routes/chat'));
app.use('/match', require('./routes/match'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
