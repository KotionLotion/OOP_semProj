"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(username, role, department, id, createdAt) {
        this._id = id || 0;
        this._username = username;
        this._role = role;
        this._department = department;
        this._createdAt = createdAt || new Date();
    }
    //Getters
    getId() {
        return this._id;
    }
    getUsername() {
        return this._username;
    }
    getRole() {
        return this._role;
    }
    getDepartment() {
        return this._department;
    }
    getCreatedAt() {
        return this._createdAt;
    }
    //Setters
    setUsername(username) {
        this._username = username;
    }
    setRole(role) {
        this._role = role;
    }
    setDepartment(department) {
        this._department = department;
    }
    // method
    save(db, callback) {
        if (this._id === 0) {
            const query = "INSERT INTO employees (username, role, department, created_at) VALUES (?, ?, ?, ?)";
            db.query(query, [this._username, this._role, this._department, this._createdAt], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                this._id = result.insertId;
                callback(null, result);
            });
        }
        else {
            const query = "UPDATE employees SET username=?, role=?, department=? WHERE id=?";
            db.query(query, [this._username, this._role, this._department, this._id], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        }
    }
    static findById(db, id, callback) {
        const query = "SELECT * FROM employees WHERE id=?";
        db.query(query, [id], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (rows.length === 0) {
                callback(null, null);
                return;
            }
            const e = rows[0];
            const employee = new Employee(e.username, e.role, e.department, e.id, e.created_at);
            callback(null, employee);
        });
    }
    static findAll(db, callback) {
        const query = "SELECT * FROM employees";
        db.query(query, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            const employees = rows.map((r) => new Employee(r.username, r.role, r.department, r.id, r.created_at));
            callback(null, employees);
        });
    }
}
exports.Employee = Employee;
