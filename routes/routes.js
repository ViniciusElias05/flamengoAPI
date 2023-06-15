const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const PlayerController = require("../controllers/PlayerController");
const Player = require("../models/Player");

router.get('/', HomeController.index);
router.post('/player', PlayerController.create);
router.get("/search", PlayerController.search);
router.get("/players", PlayerController.watchAll);
router.get("/player/:id", PlayerController.findPlayer);
router.put("/edit/player/:id", PlayerController.edit);
router.delete("/delete/:id", PlayerController.remove);

module.exports= router;