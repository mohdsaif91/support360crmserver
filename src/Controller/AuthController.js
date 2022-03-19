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
    if (!user) {
      res.status(404).send("No User Found !");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("authentication failed");
      res.status(401).send("No User found !");
    } else {
      const token = jwt.sign(
        { user_id: user._id, userName },
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 30,
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
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    req.body.password = encryptedPassword;
    signUpModal.insertMany(req.body, (err, data) => {
      if (err) {
        throw err;
      }
      res.status(201).send(req.body);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    if (!req.body.employeeId) {
      res.status(400).send("No Id Provided");
    }
    const newEncryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
    const updatePassword = await signUpModal.findByIdAndUpdate(
      { _id: req.body.employeeId },
      { $set: { password: newEncryptedPassword } }
    );
    if (updatePassword) {
      const token = tokenGeneration();
      res.status(201).send({ msg: "Passwor updated", token });
    } else {
      throw "update process failed";
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  loginUser,
  signUpUser,
  updatePassword,
};
