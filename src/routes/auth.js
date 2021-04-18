const express = require("express");
const router = express.Router();
const authController=require("../controllers/auth");
const {checkIfEmailExist,checkIfPhoneExists,checkIfPasswordIsValid, checkIfPhoneIsValid,isAuthorized}=require("../middlewares/auth")
router.post("/register",checkIfPasswordIsValid,checkIfEmailExist,checkIfPhoneExists, authController.register);
router.post("/login",checkIfPasswordIsValid,checkIfPhoneIsValid,authController.login);
router.put("/update",isAuthorized,checkIfPhoneIsValid,authController.updateProfile);
router.get("/logout",isAuthorized,authController.logout)
module.exports = router;
