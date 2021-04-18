const express = require("express");
const router = express.Router();
const {isScoresPresent,validateGameID}=require("../middlewares/game")
const {isAuthorized}=require("../middlewares/auth")
const gameController=require("../controllers/game")
router.get("/",isAuthorized,gameController.getGame)
router.post("/result",isAuthorized,isScoresPresent,validateGameID,gameController.playGame);
module.exports = router;
