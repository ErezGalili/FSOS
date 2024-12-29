const express = require("express");
const fs = require("fs");
let cars = JSON.parse(fs.readFileSync("./cars.json", "utf-8"));

function getAllCars(req, res) {
    res.json(cars);
}

function getCarById(req, res) {
    const car = cars.find(c => c.id == req.params.id);
    if (!car) return res.status(404).send("Car not found");
    res.json(car);
}

function createCar(req, res) {
    const car = req.body;
    const id = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;
    car.id = id;
    cars.push(car);
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json(car);
}

function updateCar(req, res) {
    const carIndex = cars.findIndex(c => c.id == req.params.id);
    if (carIndex === -1) return res.status(404).send("Car not found");
    const car = { ...cars[carIndex], ...req.body };
    cars[carIndex] = car;
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json(car);
}

function deleteCar(req, res) {
    const carIndex = cars.findIndex(c => c.id == req.params.id);
    if (carIndex === -1) return res.status(404).send("Car not found");
    cars.splice(carIndex, 1);
    fs.writeFileSync("./cars.json", JSON.stringify(cars));
    res.json({ message: "Car deleted" });
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};