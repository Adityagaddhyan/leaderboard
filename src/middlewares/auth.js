const User = require("../models/userModel");

exports.checkIfEmailExist = async (req, res, next) => {
  const emailExists = await User.find({ email: req.body.email }).limit(1);
  if (emailExists.length) {
    return res.status(400).json({ ERR_MESSAGE: "Username already exist" });
  } else {
    next();
  }
};
exports.checkIfPhoneExists=async (req, res, next) => {
    const emailExists = await User.find({ phone: req.body.phone }).limit(1);
    if (emailExists.length) {
      return res.status(400).json({ ERR_MESSAGE: "Phone Number is already registered" });
    } else {
      next();
    }
  };
