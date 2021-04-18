const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.checkIfEmailExist = async (req, res, next) => {
  const emailExists = await User.find({ email: req.body.email }).limit(1);
  if (emailExists.length && req.body.email) {
    return res.status(400).json({ ERR_MESSAGE: "email already registered" });
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
  } else if (!req.body.phone) {
    return res.status(400).json({ ERR_MESSAGE: "Please enter Phone Number." });
  } else {
    next();
  }
};
exports.checkIfPasswordIsValid = async (req, res, next) => {
  if (req.body.password === undefined || req.body.password == null)
    return res.status(400).json({ ERR_MESSAGE: "Enter valid password." });
  else next();
};
exports.checkIfPhoneIsValid = async (req, res, next) => {
  const phoneExists = await User.find({ phone: req.body.phone }).limit(1);
  if (phoneExists.length && req.body.phone) {
    next();
  } else {
    return res.status(400).json({
      ERR_MESSAGE: "Phone Number is NOT REGISTERED. Please Register.",
    });
  }
};
exports.isAuthorized = async (req, res, next) => {
  const token = req.cookies.auth;
  if (!token)
    res
      .status(401)
      .json({ ERR_MESSAGE: "Access Denied! Please log in or register." });
  try {
    var decoded = jwt.verify(token, process.env.SECRET_TEXT);
    req.userID = decoded._id;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ ERR_MESSAGE: "INVALID TOKEN. Please log in." });
  }
};
exports.isAdmin=async(req,res,next)=>{
  const userID=req.userID;
  const user=await User.find({_id:userID}).limit(1);
  if(user.length==0){
    res.status(403).json({ERR_MESSAGE:"Please Login."});
  }
  else if(user[0].role!='admin'){
    res.status(403).json({ERR_MESSAGE:"You need to be the admin to access this"});
  }
  else{
    next();
  }
}
