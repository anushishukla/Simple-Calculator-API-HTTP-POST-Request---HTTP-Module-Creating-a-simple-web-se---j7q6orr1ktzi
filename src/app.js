const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const validateInput = (num1, num2, operation) => {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Invalid data types";
    }
    if (num1 < -1000000 || num2 < -1000000 || num1 > 1000000 || num2 > 1000000) {
        return "Value out of range";
    }
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) return "Cannot divide by zero";
            result = num1 / num2;
            break;
    }
    if (result < -1000000 || result > 1000000) {
        return "Result out of range";
    }
    return null; // No error
};


app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    const error = validateInput(num1, num2, 'add');
    if (error) {
        res.status(400).json({ status: "error", message: error });
    } else {
        res.json({ result: num1 + num2 });
    }
});


app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    const error = validateInput(num1, num2, 'subtract');
    if (error) {
        res.status(400).json({ status: "error", message: error });
    } else {
        res.json({ result: num1 - num2 });
    }
});


app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    const error = validateInput(num1, num2, 'multiply');
    if (error) {
        res.status(400).json({ status: "error", message: error });
    } else {
        res.json({ result: num1 * num2 });
    }
});


app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    const error = validateInput(num1, num2, 'divide');
    if (error) {
        res.status(400).json({ status: "error", message: error });
    } else {
        res.json({ result: num1 / num2 });
    }
});

const server = app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
    
module.exports = app;
