const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const arrayData = {broke1M: 0, data: [1, 2, 3]};

app.get('/', (req, res) => {
    res.send("Hello <strong>World!</strong>");
});

app.get('/api/arrayData', (req, res) => {
    let sum = arrayData.data[arrayData.data.length - 1] + arrayData.data[arrayData.data.length - 2]
    if (sum <= 1000000) {
        arrayData.data.push(sum);
    } else {
        arrayData.broke1M++;
        arrayData.data = [1, 2, 3];
    }
    res.send(arrayData);
});

app.listen(port, () => {
    console.log("Listening on port 3000!");
});