const express = require("express");
const router = express.Router();
const {isScoresPresent,validateGameID,isOppentPhonePresent}=require("../middlewares/game")
const {isAuthorized,isAdmin}=require("../middlewares/auth")
const gameController=require("../controllers/game")
router.get("/",isAuthorized,gameController.getGame)
router.post("/result",isAuthorized,isScoresPresent,validateGameID,isOppentPhonePresent,gameController.playGame);
router.get("/Pending",isAuthorized,isAdmin,gameController.getPending);
module.exports = router;
