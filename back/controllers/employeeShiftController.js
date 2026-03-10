const db = require('../db/db');
const { EmployeeShift } = require('../dist/EmployeeShift');
const { ShiftScheduler } = require('../dist/ShiftScheduler');

const employeeShiftController = {

    assignShift: (req, res) => {
        const { employeeId, shiftId, assignedDate} = req.body;
        const shift = new EmployeeShift(employeeId, shiftId, new Date(assignedDate));

        shift.save(db, (err,result) => {
            if (err) {
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }

            res.json({
                success:true,
                message: 'Shift assigned to' + employeeId,
                assignmentId: shift.getId()
            });
        });
    },

    assignRecurringShift: (req, res) => {
        const { employeeId, shiftId,  daysOfWeek, startDate, endDate } = req.body;
    
        ShiftScheduler.assignRecurringShift(db, employeeId, shiftId, daysOfWeek, new Date(startDate), new Date(endDate), (err) => {
            if (err) { 
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }
            res.json({
                success:true,
                message: 'Recurring shifts assigned'
            });
        });
    },

    getShiftsForEmployee: (req, res) => {
        const id = req.params.id;
        EmployeeShift.findByEmployee(db, employeeId, (err, shifts) => {
            if (err) {
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }

            res.json(shifts);
        });

    }
};

module.exports = employeeShiftController;