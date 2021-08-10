const express = require('express');
const app = express();

app.use(express.json());

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

const isPrime = (n) => {
    if (n === 1 || n === 2) {
        return true;
    } else if (n % 2 === 0) {
        return false;
    } else {
        for (var i = 3; i < n; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
}

app.get('/', (req, res) => {
    res.send("Hello <strong>World!</strong>");
});

app.get('/api/range', (req, res) => {
    if (req.query.start && req.query.end) {
        let s = parseInt(req.query.start);
        let e = parseInt(req.query.end);
        if (s > 0 && e > 0 && s <= e) { 
            var onlyPrimes = req.query.primesonly && req.query.primesonly === "1";
            var rangeData = [];
            while (s <= e) {
                if (onlyPrimes && isPrime(s)) {
                    rangeData.push(s);
                } else if(!onlyPrimes) {
                    rangeData.push(s);
                }
                s++;
            }
            res.send(`${onlyPrimes} ${rangeData}`);
        } else {
            res.status(500).send("Invalid range specified.");
        }
    } else {
        res.status(500).send("Invalid range specified.");
    }
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

app.post('/api/personData', (req, res) => {
    const fullName = req.body.fullname;
    const nameParts = fullName.split(' ');
    if (nameParts.length !== 2) {
        res.status(400).send("Invalid name element.");
    } else {
        const person = {
            firstName: nameParts[0],
            lastName: nameParts[1],
            age: 0
        };
        personData.push(person);
        res.send(person);
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