const User = require("../models/userModel");

exports.checkIfEmailExist = async (req, res, next) => {
  const emailExists = await User.find({ email: req.body.email }).limit(1);
  console.log("req",req.body.email)
  if (emailExists.length && req.body.email) {
    console.log("from",emailExists)
    return res.status(400).json({ ERR_MESSAGE: "Username already exist" });
  } else {
    next();
  }
};
exports.checkIfPhoneExists = async (req, res, next) => {
  const emailExists = await User.find({ phone: req.body.phone }).limit(1);
  if (emailExists.length) {
    return res
      .status(400)
      .json({ ERR_MESSAGE: "Phone Number is already registered" });
  } else {
    next();
  }
};
exports.checkIfPasswordIsValid=async(req,res,next)=>{
  if(req.body.password===undefined || req.body.password==null)
  return res
      .status(400)
      .json({ ERR_MESSAGE: "Enter valid password." });
    else next();
}
exports.checkIfPhoneIsValid = async (req, res, next) => {
  const phoneExists = await User.find({ phone: req.body.phone }).limit(1);
  if (phoneExists.length) {
    next();
  } else {
    return res
      .status(400)
      .json({ ERR_MESSAGE: "Phone Number is NOT REGISTERED. Please Register." });
  }
};
