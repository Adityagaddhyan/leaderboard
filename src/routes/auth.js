const express = require("express");
const router = express.Router();
const authController=require("../controllers/auth");
const {checkIfEmailExist,checkIfPhoneExists}=require("../middlewares/auth")
router.post("/register",checkIfEmailExist,checkIfPhoneExists, authController.register);
module.exports = router;
