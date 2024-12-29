const e = require("express");
const fs = require("fs");
let players = JSON.parse(fs.readFileSync("./players.json", "utf-8"));

function getAllPlayers(req, res) {
    res.json(players);
}

function getPlayerById(req, res) {
    const player = players.find(p => p.id == req.params.id);
    if (!player) return res.status(404).send("Player not found");
    res.json(player);
}

function createPlayer(req, res) {
    const player = req.body;
    const id = players.length > 0 ? players[players.length - 1].id + 1 : 1;
    player.id = id;
    players.push(player);
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json(player);
}

function updatePlayer(req, res) {
    const playerIndex = players.findIndex(p => p.id == req.params.id);
    if (playerIndex === -1) return res.status(404).send("Player not found");
    const player = { ...players[playerIndex], ...req.body };
    players[playerIndex] = player;
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json(player);
}

function deletePlayer(req, res) {
    const playerIndex = players.findIndex(p => p.id == req.params.id);
    if (playerIndex === -1) return res.status(404).send("Player not found");
    players.splice(playerIndex, 1);
    fs.writeFileSync("./players.json", JSON.stringify(players));
    res.json({ message: "Player deleted" });
}

module.exports = { getAllPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer };