const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');

router.post('/shifts', shiftController.addShift);
router.get('shifts', shiftController.getAllShifts);
router.get('/shifts/:id', shiftController.getShift);

module.exports = router;