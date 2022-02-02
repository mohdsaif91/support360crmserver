const CustomerModal = require("../Modals/CustomerModal");

const addCustomer = async (req, res) => {
  try {
    const customerData = await CustomerModal.insertMany(req.body);
    if (!customerData) {
      throw "Insert operation Broke !";
    }
    res.status(201).send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send(req.body);
  }
};

const getCustomer = async (req, res) => {
  try {
    const customerData = await CustomerModal.find({});
    if (!customerData) {
      throw "Get Operation Broke !";
    }
    console.log(customerData);
    res.status(200).send(customerData);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addCustomer,
  getCustomer,
};
