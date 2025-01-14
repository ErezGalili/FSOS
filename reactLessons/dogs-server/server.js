const express = require('express');
const app = express();
const api = require('./api.js');
app.use(express.json());
app.use('/api', api);
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});