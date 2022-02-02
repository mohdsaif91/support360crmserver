const express = require("express");

const emojis = require("./emojis");
const customer = require("./customer");
const Auth = require("./Auth");
const employee = require("./employee");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/customer", customer);
router.use("/auth", Auth);
router.use("/employee", employee);

module.exports = router;
