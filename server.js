const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tehai', { useNewUrlParser: true, useUnifiedTopology: true });

const caseSchema = new mongoose.Schema({
    customerName: String,
    phoneNumber: String,
    postalCode: String,
    address: String,
    estimateDate: Date,
    deadline: Date
});

const Case = mongoose.model('Case', caseSchema);

app.post('/cases', async (req, res) => {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).send(newCase);
});

app.get('/cases', async (req, res) => {
    const cases = await Case.find();
    res.status(200).send(cases);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});