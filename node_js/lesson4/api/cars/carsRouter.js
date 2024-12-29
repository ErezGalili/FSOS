const express = require("express");
const carsController = require("./carsController");
const router = express.Router();

router.get("/", carsController.getAllCars);
router.get("/:id", carsController.getCarById);
router.post("/", carsController.createCar);
router.put("/:id", carsController.updateCar);
router.delete("/:id", carsController.deleteCar);

module.exports = router;