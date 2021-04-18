const getUserIdFromMobile = require("../utils/getUserIfFromMobile");
const Game = require("../models/gameModel");
exports.getGame = (req, res) => {
  const games = [
    { id: 1, name: "game 1" },
    { id: 2, name: "game 2" },
    { id: 3, name: "game 2" },
  ];

  res.json({ games });
};
exports.playGame = async (req, res) => {
  const p1 = req.userID;
  const p2 = await getUserIdFromMobile(req.body.opponentMobile);
  if (p2.lenght==0) {
    return res
      .status(400)
      .json({ ERR_MESSAGE: "Enter the correct mobile number of opponent." });
  }
  //req.body.p1_score
  //req.body.p2_score
  console.log(p2[0]._id);
  const game = new Game({
    gameID: req.body.gameID,
    player1_ID: p1,
    player2_ID: p2[0]._id,
    player1_score: req.body.p1_score,
    player2_score: req.body.p2_score,
  });
  try {
    await game.save({w:1},(err) => {
      if (err) {console.log(err);throw "unable to save results"}
      else {console.log("inelse");return res.send({game:game})};
    });
  } catch (err) {
    return res.status(400).json({ ERR_MESSAGE: "unable to save results" });
  }
};
