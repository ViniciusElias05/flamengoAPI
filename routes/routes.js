const express = require("express");
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const PlayerController = require("../controllers/PlayerController");

router.get('/', HomeController.index);
router.post('/player', PlayerController.create);

module.exports= router;