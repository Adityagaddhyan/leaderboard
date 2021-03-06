const getUserIdFromMobile = require("../utils/getUserIfFromMobile");
const Game = require("../models/gameModel");
const { findOneAndUpdate } = require("../models/gameModel");
const ScoreBoard = require("../models/scoreboardModel");
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
  if (p2.lenght == 0) {
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
    await game.save({ w: 1 }, (err) => {
      if (err) {
        console.log(err);
        throw "unable to save results";
      } else {
        return res.send({ game: game });
      }
    });
  } catch (err) {
    return res.status(400).json({ ERR_MESSAGE: "unable to save results" });
  }
};
exports.getPending = async (req, res) => {
  const pending = await Game.find({ resultDeclared: false });
  return res.send({ data: pending });
};
exports.postResult = async (req, res) => {
  // req.body.gameID
  const game = await Game.find({ _id: req.body.gameID }).limit(1);

  let winner;
  let toUpdateScoreboardObject = {
    gameID: game[0].gameID,
    win: "1",
  };
  if (req.body.winner == "1") {
    winner = game[0].player1_ID;
    toUpdateScoreboardObject.winner = game[0].player1_ID;
    toUpdateScoreboardObject.looser = game[0].player2_ID;
    toUpdateScoreboardObject.winscore = game[0].player1_score;
    toUpdateScoreboardObject.loosescore = game[0].player2_score;
  } else {
    toUpdateScoreboardObject.winner = game[0].player2_ID;
    toUpdateScoreboardObject.looser = game[0].player1_ID;
    toUpdateScoreboardObject.winscore = game[0].player2_score;
    toUpdateScoreboardObject.loosescore = game[0].player1_score;
    winner = game[0].player2_ID;
  }
  const toUpdateObject = {
    resultDeclared: true,
    winner: winner,
  };

  try {
    await ScoreBoard.findOneAndUpdate(
      {
        player: toUpdateScoreboardObject.winner,
        gameID: toUpdateScoreboardObject.gameID,
      },
      {
        player: toUpdateScoreboardObject.winner,
        gameID: toUpdateScoreboardObject.gameID,
        $inc: { score: toUpdateScoreboardObject.winscore, wins: 1 },
      },
      { upsert: true }
    );
    await ScoreBoard.findOneAndUpdate(
      {
        player: toUpdateScoreboardObject.looser,
        gameID: toUpdateScoreboardObject.gameID,
      },
      {
        player: toUpdateScoreboardObject.looser,
        gameID: toUpdateScoreboardObject.gameID,
        $inc: { score: toUpdateScoreboardObject.loosescore },
      },
      { upsert: true }
    );
    const game = await Game.findOneAndUpdate(
      { _id: req.body.gameID },
      toUpdateObject,
      { new: true }
    );
    console.log(game);
    return res.json({ STATUS: "Result declared sucessfully!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ERR_MESSAGE: "INVALID REQUEST. please check the passed params.",
    });
  }
};
exports.leaderboard = async (req, res) => {
  const gameID = req.body.gameID;
  console.log(gameID);
  try {
    const leaderboard = await ScoreBoard.aggregate([
      { $match: { gameID: parseInt(gameID) } },
      {
        $group: {
          _id: { playerID: "$player", gameID: "$gameID" },
          score: { $sum: "$score" },
          win: { $sum: "$wins" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.playerID",
          foreignField: "_id",
          as: "playerDetails",
        },
      },
      {
        $project: {
          "playerDetails._id":0,
          "playerDetails.passwordHash":0,
          "playerDetails._v":0,
          "playerDetails.role":0
        },
      },
    ])
      .sort("-score")
      .limit(3);
    return res.send(leaderboard);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ ERR_MESSAGE: "BAD REQUEST!" });
  }
};
