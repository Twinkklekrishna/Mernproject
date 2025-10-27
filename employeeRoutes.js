const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

// Route for getting all employees and creating a new one
router.route('/')
  .get(getEmployees)
  .post(createEmployee);

// Route for getting, updating, and deleting a single employee by ID
router.route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
