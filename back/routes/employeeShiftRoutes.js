const express = require('express');
const router = express.Router();
const employeeShiftController = require('../controllers/employeeShiftController');

router.post('/employee-shifts', employeeShiftController.assignShift);
router.post('/employee-shifts/recurring', employeeShiftController.assignRecurringShift);
router.get('/employee-shifts/:id', employeeShiftController.getShiftsForEmployee);

module.exports = router;