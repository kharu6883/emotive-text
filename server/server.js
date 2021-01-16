const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});