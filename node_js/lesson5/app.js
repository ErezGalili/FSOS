const express = require('express');
const app = express();
app.use(express.json());
const { CurrentProduct } = require('./ProductModel');
const { connect } = require('mongoose');
const uri = "mongodb+srv://ErezG:Aa123456@test.cxhcq.mongodb.net/?retryWrites=true&w=majority&appName=Test";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
connect(uri, clientOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.get('/api/v1/products', async (req, res) => {
    try {
        const items = await CurrentProduct.find();
        res.status(200).json({
            status: 'success',
            data: items
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
})
app.post('/api/v1/products', async (req, res) => {
    try {
        let p1 = req.body;
        const newItem = await CurrentProduct.create(p1);
        res.status(201).json({
            status: 'success',
            data: newItem
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'error: ' + err.message
        });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

