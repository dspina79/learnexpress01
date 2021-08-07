const express = require('express');
const app = express();
const port = process.env.port || 3000;
const arrayData = [1, 2, 3];

app.get('/', (req, res) => {
    res.send("Hello <strong>World!</strong>");
});

app.get('/api/arrayData', (req, res) => {
    arrayData.push(arrayData[arrayData.length - 1] + arrayData[arrayData.length - 2]);
    res.send(arrayData);
});

app.listen(port, () => {
    console.log("Listening on port 3000!");
});