const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
});



app.listen(3000);