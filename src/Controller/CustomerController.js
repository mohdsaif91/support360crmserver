const CustomerModal = require("../Modals/CustomerModal");
const tokenGeneration = require("../util/TokenGeneration");

const addCustomer = async (req, res) => {
  try {
    const customerData = await CustomerModal.insertMany(req.body);
    if (!customerData) {
      throw "Insert operation Broke !";
    }
    const token = tokenGeneration();
    res.status(201).send({ data: req.body, token });
  } catch (error) {
    res.status(500).send(req.body);
  }
};

const getCustomer = async (req, res) => {
  try {
    const customerData = await CustomerModal.find({});
    if (!customerData) {
      throw "Get Operation Broke !";
    }
    const token = tokenGeneration();
    res.status(200).send({ customerData, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAdminCustomer = async (req, res) => {
  try {
    let reqData = {};
    if (req.body.agentName) {
      reqData = {
        agentName: req.body.agentName,
      };
    } else if (req.body.employeeText) {
      reqData = {
        customerName: req.body.employeeText,
      };
    }
    req.data = {
      createdAt: {
        $gte: req.body.startDate,
        $lte: req.body.endDate,
      },
    };

    console.log(reqData);
    const filterData = await CustomerModal.find({
      ...reqData,
    });
    const token = tokenGeneration();
    res.status(200).send({ filterData, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addCustomer,
  getAdminCustomer,
  getCustomer,
};
