const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUpModal = require("../Modals/SignUpModal");

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    const user = await signUpModal.findOne({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, userName },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).send({ ...user._doc, token });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const signUpUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    req.body.password = encryptedPassword;

    await signUpModal.insertMany(req.body, (err, data) => {
      if (err) {
        throw err;
      }
      res.status(201).send(req.body);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  loginUser,
  signUpUser,
};
