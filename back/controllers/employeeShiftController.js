const db = require('../db/db');

const employeeShiftController = {

    assignShift: (req, res) => {
        const { employeeId, shiftId, assignedDate } = req.body;
        const query = `INSERT INTO employee_shifts (employee_id, shift_id, assigned_date) 
                       VALUES (?, ?, ?)`;

        db.query(query, [employeeId, shiftId, assignedDate], (err, result) => {
            if (err) {
                res.json({ success: false, error: err.message });
                return;
            }
            res.json({ success: true, message: 'Shift assigned!', id: result.insertId });
        });
    },

    assignRecurringShift: (req, res) => {
        const { employeeId, shiftId, dates } = req.body;
        // dates should be an array of date strings e.g. ['2025-01-01', '2025-01-08']
        if (!Array.isArray(dates) || dates.length === 0) {
            res.json({ success: false, message: 'dates must be a non-empty array' });
            return;
        }

        const values = dates.map(date => [employeeId, shiftId, date]);
        const query = `INSERT INTO employee_shifts (employee_id, shift_id, assigned_date) VALUES ?`;

        db.query(query, [values], (err, result) => {
            if (err) {
                res.json({ success: false, error: err.message });
                return;
            }
            res.json({ success: true, message: `${dates.length} shifts assigned!` });
        });
    },

    getShiftsForEmployee: (req, res) => {
        const employeeId = req.params.id;
        const query = `
            SELECT 
                es.id, es.assigned_date,
                s.name, s.start_time, s.end_time,
                e.first_name, e.last_name
            FROM employee_shifts es
            JOIN shifts s ON es.shift_id = s.id
            JOIN employees e ON es.employee_id = e.id
            WHERE es.employee_id = ?
            ORDER BY es.assigned_date ASC
        `;

        db.query(query, [employeeId], (err, rows) => {
            if (err) {
                res.json({ success: false, error: err.message });
                return;
            }
            res.json(rows);
        });
    }

};

module.exports = employeeShiftController;