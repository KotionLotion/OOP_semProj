const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employees', employeeController.addEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployee);

module.exports = router;