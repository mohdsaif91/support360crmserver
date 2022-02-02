const express = require("express");

const EmployeeController = require("../Controller/employeeController");

const router = express.Router();

router.post("/", EmployeeController.addEmployee);

module.exports = router;
