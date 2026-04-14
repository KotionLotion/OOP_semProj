const db = require('../db/db');
const { Shift } = require('../dist/Shifts');

const shiftController = {

    addShift: (req, res) => {
        const {name, startTime, endTime} = req.body;
        const shift = new Shift(name, new Date(startTime), new Date(endTime));

        shift.save(db, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }

            res.json({
                success: true,
                message: 'Shift added successfully!',
                shiftId: shift.getId()
            });
        });
    },

    getAllShifts: (req, res) => {
        Shift.findAll(db,(err, shifts) => {
            if (err) {
                res.json({
                    success:false,
                    error: err.message
                });
                return;
            }

            res.json(shifts);
        })
    },

    getShift: (req, res) => {
        const id = req.params.id;
        Shift.findById(db, id, (err, shift) => {
            if (err) {
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }
            if(shift) {
                res.json(shift);
            }
            else {
                res.json({
                    success:false,
                    message: 'Shift Not Found'
                });
            }
        });
    }
};

module.exports = shiftController;