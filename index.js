const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const arrayData = {broke1M: 0, data: [1, 2, 3]};

const personData =  [
    {
        firstName: "Dan",
        lastName: "Sheridan",
        age: 38
    },
    {
        firstName: "Kim",
        lastName: "Miller",
        age: 29
    },
    {
        firstName: "Nigel",
        lastName: "Miller",
        age: 49
    },
    {
        firstName: "Penelope",
        lastName: "Corrigna",
        age: 24
    },
    {
        firstName: "Samantha",
        lastName: "Tayan",
        age: 39
    },
    {
        firstName: "Burt",
        lastName: "Harinski",
        age: 62
    }
]

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

app.get('/api/arrayData/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= arrayData.data.length) {
        res.send('Index out of bounds.');
    } else {
        res.send(`Value at ${index} = ${arrayData.data[index]}`);
    }
});

app.get('/api/personData/:lastName/:age', (req, res) => {
    const ln = req.params.lastName;
    const age = parseInt(req.params.age);

    const result = personData.filter(n => n.lastName === ln && n.age >= age);
    res.send(result);
});

app.listen(port, () => {
    console.log("Listening on port 3000!");
});