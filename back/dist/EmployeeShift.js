"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeShift = void 0;
class EmployeeShift {
    constructor(employeeId, shiftId, assignedDate, id, createdAt) {
        this._id = id || 0;
        this._employeeId = employeeId;
        this._shiftId = shiftId;
        this._assignedDate = assignedDate;
        this._createdAt = createdAt || new Date();
    }
    // Getters
    getId() {
        return this._id;
    }
    getEmployeeId() {
        return this._employeeId;
    }
    getShiftId() {
        return this._shiftId;
    }
    getAssignedDate() {
        return this._assignedDate;
    }
    // Setters
    setEmployeeId(id) {
        this._employeeId = id;
    }
    setShiftId(id) {
        this._shiftId = id;
    }
    setAssignedDate(date) {
        this._assignedDate = date;
    }
    // method
    save(db, callback) {
        if (this._id === 0) {
            const query = "INSERT INTO employee_shifts (employee_id, shift_id, assigned_date, created_at) VALUES (?, ?, ?, ?)";
            db.query(query, [this._employeeId, this._shiftId, this._assignedDate, this._createdAt], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                this._id = result.insertId;
                callback(null, result);
            });
        }
        else {
            const query = "UPDATE employee_shifts SET employee_id=?, shift_id=?, assigned_date=? WHERE id=?";
            db.query(query, [this._employeeId, this._shiftId, this._assignedDate, this._id], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        }
    }
    static findByEmployee(db, employeeId, callback) {
        const query = "SELECT * FROM employee_shifts WHERE employee_id=?";
        db.query(query, [employeeId], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            const shifts = rows.map((r) => new EmployeeShift(r.employee_id, r.shift_id, r.assigned_date, r.id, r.created_at));
            callback(null, shifts);
        });
    }
}
exports.EmployeeShift = EmployeeShift;
