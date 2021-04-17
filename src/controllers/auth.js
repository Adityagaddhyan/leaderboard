const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  //validate the user data if err=> return 400
  //check if user already exist =>400
  
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
  });
  try {
    await user.save({ w: 1 }, (err, result) => {
      if (err) {
        console.log(err);
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
