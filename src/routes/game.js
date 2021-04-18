const express = require("express");
const router = express.Router();
const {isAuthorized}=require("../middlewares/auth")
const gameController=require("../controllers/game")
router.get("/getGames",isAuthorized,gameController.getGame)
module.exports = router;
