const express = require("express");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();
const AuthController = require("../Controller/AuthController");

router.post("/login", AuthController.loginUser);
router.post("/signup", AuthController.signUpUser);
router.put("/updatePassword", verifyToken, AuthController.updatePassword);

module.exports = router;
