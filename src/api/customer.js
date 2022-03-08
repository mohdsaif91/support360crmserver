const express = require("express");

const CustomerController = require("../Controller/CustomerController");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/", CustomerController.addCustomer);
router.get("/", verifyToken, CustomerController.getCustomer);
router.post(
  "/getFilteredCustomer",
  verifyToken,
  CustomerController.getAdminCustomer
);

module.exports = router;
