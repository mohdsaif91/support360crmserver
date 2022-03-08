const express = require("express");

const EmployeeController = require("../Controller/employeeController");
const verifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.post("/", EmployeeController.addEmployee);
router.get("/all", verifyToken, EmployeeController.getAllEmployee);
router.get("/:name", verifyToken, EmployeeController.getEmployeeAddedCustomer);
router.get("/:data/:user", verifyToken, EmployeeController.getDailyData);

module.exports = router;
