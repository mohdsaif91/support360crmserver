const express = require("express");

const router = express.Router();
const AuthController = require("../Controller/AuthController");

router.post("/login", AuthController.loginUser);
router.post("/signup", AuthController.signUpUser);

module.exports = router;
