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
  const p1 = parseInt(req.body.p1_score);
  const p2 = parseInt(req.body.p2_score);
  console.log(req.body.p1_score==p1)
  if (p1 != req.body.p1_score) {
    return res.status(400).json({ ERR_MESSAGE: "Please enter score of p1 correctly" });
  } else if (p2 != req.body.p2_score) {
    return res.status(400).json({ ERR_MESSAGE: "Please enter score of p2 correctly" });
  }

  if (req.body.p1_score === undefined || req.body.p1_score == null) {
    return res.status(400).json({ ERR_MESSAGE: "Please enter score of p1" });
  } else if (req.body.p2_score === undefined || req.body.p2_score == null) {
    return res.status(400).json({ ERR_MESSAGE: "Please enter score of p2" });
  } else {
    next();
  }
};
exports.isOppentPhonePresent = (req, res, next) => {
  if (
    req.body.opponentMobile === undefined ||
    req.body.opponentMobile == null
  ) {
    res
      .status(400)
      .json({ ERR_MESSAGE: "Please enter opponent mobile number." });
  } else {
    next();
  }
};
