const jwt = require("jsonwebtoken");

const tokenGeneration = () => {
  return jwt.sign(
    { user_id: "everyTime@123", userName: "everyTime" },
    process.env.TOKEN_KEY,
    {
      expiresIn: 60 * 30,
    }
  );
};

module.exports = tokenGeneration;
