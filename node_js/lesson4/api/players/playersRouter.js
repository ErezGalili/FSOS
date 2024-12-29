const express = require("express");
const playersController = require("./playersController");
const router = express.Router();

router.get("/", playersController.getAllPlayers);
router.get("/:id", playersController.getPlayerById);
router.post("/", playersController.createPlayer);
router.put("/:id", playersController.updatePlayer);
router.delete("/:id", playersController.deletePlayer);

module.exports = router;