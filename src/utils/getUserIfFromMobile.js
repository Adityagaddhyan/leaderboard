const User = require("../models/userModel");

const getUserIdFromMobile = async (mobile) => {
  const user = await User.find({ phone: mobile }).limit(1);

  if (user.lenght != 0) {
    return user;
  } else {
    return "USER NOT FOUND";
  }
};
module.exports = getUserIdFromMobile;
