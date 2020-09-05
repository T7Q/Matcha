const express = require('express');
const app = express();

// Accept the incoming JSON body in requests
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
