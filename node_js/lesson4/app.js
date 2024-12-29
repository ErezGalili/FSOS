const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const carsRouter = require("./api/cars/carsRouter.js")
const playersRouter = require("./api/players/playersRouter.js")

app.use('/api/cars', carsRouter);
app.use('/api/players', playersRouter);

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.listen(3000);