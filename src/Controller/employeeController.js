const bcrypt = require("bcryptjs/dist/bcrypt");
const SignupModal = require("../Modals/SignUpModal");

const addEmployee = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }

    const user = await SignupModal.findOne({ userName });

    if (!user) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      req.body.password = encryptedPassword;
      await SignupModal.insertMany(req.body, (err, data) => {
        if (err) throw err;
      });
      res.status(201).send("user Added");
    } else {
      res.status(409).send("User name exist !!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addEmployee,
};
