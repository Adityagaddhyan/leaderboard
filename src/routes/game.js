const express = require("express");
const router = express.Router();
const {isScoresPresent,validateGameID,isOppentPhonePresent}=require("../middlewares/game")
const {isAuthorized,isAdmin}=require("../middlewares/auth")
const gameController=require("../controllers/game")
router.get("/",isAuthorized,gameController.getGame)
router.post("/score",isAuthorized,isScoresPresent,validateGameID,isOppentPhonePresent,gameController.playGame);
router.get("/pending",isAuthorized,isAdmin,gameController.getPending);
router.post("/result",isAuthorized,isAdmin,gameController.postResult);
router.get("/leaderboard",isAuthorized,isAdmin,gameController.leaderboard);
module.exports = router;
