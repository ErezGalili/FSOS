//phase 1 
const express = require('express');
const app = express();
app.use(express.json())
const CurrentProduct = require('./ProductModel');
const mongoose = require('mongoose');

//phase 2 - connect 
const uri = "mongodb+srv://ErezG:Aa123456@test.cxhcq.mongodb.net/?retryWrites=true&w=majority&appName=Test";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);

//phase 3 - express req 
app.post('/api/v1/products', async function (req, res, next) {
    try {
        const p1 = req.body;
        const newItem = await CurrentProduct.create(p1);
        res.status(201).json({
            status: "success",
            data: newItem
        })
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: "error:😱" + err
        })
    }
});



//phase 4 port listening 
const port = 3000;
app.listen(port, function () {
    console.log("Running on port " + port);
})



