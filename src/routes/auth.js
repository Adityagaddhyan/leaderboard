const express = require("express");
const router = express.Router();
const authController=require("../controllers/auth");
const {checkIfEmailExist,checkIfPhoneExists,checkIfPasswordIsValid, checkIfPhoneIsValid,isAuthorized}=require("../middlewares/auth")
router.post("/register",checkIfPasswordIsValid,checkIfEmailExist,checkIfPhoneExists, authController.register);
router.get("/login",checkIfPasswordIsValid,checkIfPhoneIsValid,authController.login);
router.put("/update",isAuthorized,checkIfPhoneIsValid,authController.updateProfile)
module.exports = router;
