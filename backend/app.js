const express = require('express');

const app = express();

// Accept the incoming JSON body in requests
app.use(express.json());

// Handle routes
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));
app.use('/messages', require('./routes/messages'));
app.use('/images', require('./routes/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
