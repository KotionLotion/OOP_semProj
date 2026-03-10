const db = require('../db/db');
const { Shift } = require('../dist/Shift');

const shiftController = {

    addShift: (req, res) => {
        const {name, startTime, entTime} = req.body;
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
        Shift.findAll(db,(err,res) => {
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
        Shift.findById(bd, id, (err, shift) => {
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