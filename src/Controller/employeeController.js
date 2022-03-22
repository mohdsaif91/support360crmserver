const bcrypt = require("bcryptjs/dist/bcrypt");
const moment = require("moment");

const SignupModal = require("../Modals/SignUpModal");
const CustomerModal = require("../Modals/CustomerModal");
const tokenGeneration = require("../util/TokenGeneration");

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
        const token = tokenGeneration();
        res.status(201).send({ token, data: data[0] });
      });
    } else {
      res.status(409).send("User name exist !!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEmployeeAddedCustomer = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).send("no employee name");
    }
    const customer = await CustomerModal.find({ agentName: req.params.name });
    if (!customer) {
      res.status(400).send("No data added");
    }
    const daily = customer.filter((f) =>
      moment(f.createdAt).isSame(moment(new Date()), "day")
    );

    const monthly = customer.filter((f) =>
      moment(f.createdAt).isSame(moment(new Date()), "month")
    );

    const yearly = customer.filter((f) =>
      moment(f.createdAt).isSame(new Date(), "year")
    );

    const data = {
      total: customer.length,
      daily: daily.length,
      monthly: monthly.length,
      yearly: yearly.length,
    };
    const token = tokenGeneration();
    res.status(200).send({ data, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDailyData = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).send("no employee name");
    }
    const customer = await CustomerModal.find({ agentName: req.params.user });
    if (!customer) {
      res.status(400).send("No data added");
    }
    let data = [];
    switch (true) {
      case req.params.data === "daily":
        data = customer.filter((f) =>
          moment(f.createdAt).isSame(moment(new Date()), "day")
        );
        break;
      case req.params.data === "monthly":
        data = customer.filter((f) =>
          moment(f.createdAt).isSame(moment(new Date()), "month")
        );
        break;
      case req.params.data === "yearly":
        data = customer.filter((f) =>
          moment(f.createdAt).isSame(new Date(), "year")
        );
        break;
      default:
        return "";
    }
    const token = tokenGeneration();
    res.status(200).send({ data, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const allEmployee = await SignupModal.find({});
    if (!allEmployee) {
      res.status(404).send("Something went wrong");
    }
    const customerName = await CustomerModal.distinct("customerName");
    if (!customerName) {
      res.status(404).send("Something went wrong");
    }
    const token = tokenGeneration();
    res.status(200).send({ allEmployee, token, customerName });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    await SignupModal.findByIdAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      (err, data) => {
        if (err) throw "update operation failed";
        if (data) {
          res.status(200).send(req.body);
        }
      }
    );
  } catch (error) {
    console.log(error);
    // res.status(500).send(error);
  }
};

const removeEmployee = async (req, res) => {
  try {
    const deletedEmployee = await SignupModal.findByIdAndDelete({
      _id: req.body.id,
    });
    if (!deletedEmployee) {
      res.status(400).send(req.body.id);
    }
    res.status(200).send(req.body.id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addEmployee,
  getAllEmployee,
  getDailyData,
  getEmployeeAddedCustomer,
  removeEmployee,
  updateProfile,
};
