const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const PlayerController = require("../controllers/PlayerController");
const StatsController = require("../controllers/StatsController");
const Player = require("../models/Player");

//Route principal
router.get('/', HomeController.index);

//Route of Player class 
router.post('/player', PlayerController.create);
router.get("/search", PlayerController.search);
router.get("/players", PlayerController.watchAll);
router.get("/player/:id", PlayerController.findPlayer);
router.put("/edit/player/:id", PlayerController.edit);
router.delete("/delete/:id", PlayerController.remove);

//Route of Stats class
router.post("/stats", StatsController.create);
router.put("/edit/stats/:id", StatsController.edit);
router.delete("/delete/stats/:id", StatsController.remove);
module.exports= router;