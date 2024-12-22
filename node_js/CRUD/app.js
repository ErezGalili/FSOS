const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const cars = JSON.parse(fs.readFileSync("./cars.json", "utf-8"));
const players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/api/cars", (req, res) => {
    res.json(cars);
});

app.get("/api/cars/:id", (req, res) => {
    const car = cars.find(c => c.id == req.params.id);
    if (!car) return res.status(404).send("Car not found");
    res.json(car);
});

app.post("/api/cars", (req, res) => {
    const car = req.body;
    const id = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    car.id = id;
    cars.push(car);
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json(car);
});

app.patch("/api/cars/:id", (req, res) => {
    const carIndex = cars.findIndex(c => c.id == req.params.id);
    if (carIndex === -1) return res.status(404).send("Car not found");
    const car = { ...cars[carIndex], ...req.body };
    cars[carIndex] = car;
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json(car);
});

app.delete("/api/cars/:id", (req, res) => {
    const carIndex = cars.findIndex(c => c.id == req.params.id);
    if (carIndex === -1) return res.status(404).send("Car not found");
    cars.splice(carIndex, 1);
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json({ message: "Car deleted" });
});

app.get("/api/players", (req, res) => {
    res.json(players);
});

app.get("/api/players/:id", (req, res) => {
    const player = players.find(p => p.id == req.params.id);
    if (!player) return res.status(404).send("Player not found");
    res.json(player);
});

app.post("/api/players", (req, res) => {
    const player = req.body;
    const id = players.length > 0 ? players[players.length - 1].id + 1 : 1;
    player.id = id;
    players.push(player);
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json(player);
});

app.patch("/api/players/:id", (req, res) => {
    const playerIndex = players.findIndex(p => p.id == req.params.id);
    if (playerIndex === -1) return res.status(404).send("Player not found");
    const player = { ...players[playerIndex], ...req.body };
    players[playerIndex] = player;
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json(player);
});

app.delete("/api/players/:id", (req, res) => {
    const playerIndex = players.findIndex(p => p.id == req.params.id);
    if (playerIndex === -1) return res.status(404).send("Player not found");
    players.splice(playerIndex, 1);
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json({ message: "Player deleted" });
});

app.listen(3000);
