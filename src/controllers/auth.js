const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  // hash password
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    passwordHash: await hashedPassword,
    role: req.body.role || "player",
    location: req.body.location,
  });
  try {
    await user.save({ w: 1 }, (err) => {
      if (err) {
        throw "unable to create user";
      } else {
        res.send({
          STATUS: "USER CREATED SUCESSFULLY!",
          id: user._id,
          email: user.email,
          name: user.name,
        });
      }
    });
  } catch (err) {
    res.status(400).json({ ERR_MESSAGE: "Unable to create user" });
  }
};
exports.login = async (req, res) => {
  //check if password is correct
  const user = await User.find({ phone: req.body.phone }).limit(1);
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user[0].passwordHash
  );
  if (!isPasswordCorrect)
    res.status(400).json({ ERR_MESSAGE: "Password is inncorect." });
  //write in header and send
  var token = jwt.sign({ _id: user[0]._id }, process.env.SECRET_TEXT, {
    expiresIn: "1h",
  });
  res.cookie("auth", token,{ httpOnly: true, maxAge:  100000 });
  res.json({
    STATUS: "You are successfully logged in.",
    phone: user[0].phone,
    name: user[0].name,
    email: user[0].email,
    token:token
  });
};
exports.updateProfile = async (req, res) => {
  let toUpdateObject = {};
  if (req.body.email) toUpdateObject.email = req.body.email;
  if (req.body.location) toUpdateObject.location = req.body.location;
  if (req.body.name) toUpdateObject.name = req.body.name;
  if (req.body.password) {
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    toUpdateObject.passwordHash = hashedPassword;
  }

  const updatedUser=await User.findOneAndUpdate({phone:req.body.phone},toUpdateObject,{new:true});
  res.send(updatedUser);
};
