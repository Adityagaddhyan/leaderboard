exports.validateGameID = (req, res, next) => {
  if (req.body.gameID === undefined || req.body.gameID == null) {
    res.status(400).json({ ERR_MESSAGE: "Please enter the gameID" });
  } else if (
    req.body.gameID == 1 ||
    req.body.gameID == 2 ||
    req.body.gameID == 3
  ) {
    next();
  } else {
    res.status(400).json({ ERR_MESSAGE: "INVALID gameID" });
  }
};
exports.isScoresPresent = (req, res, next) => {
  if (req.body.p1_score === undefined || req.body.p1_score == null) {
    res.status(400).json({ ERR_MESSAGE: "Please enter score of p1" });
  } else if (req.body.p2_score === undefined || req.body.p2_score == null) {
    res.status(400).json({ ERR_MESSAGE: "Please enter score of p2" });
  } else {
    next();
  }
};
