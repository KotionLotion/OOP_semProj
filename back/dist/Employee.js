"use strict";

class Employee {
    constructor(firstName, lastName, department, id, createdAt, username, passwordHash, role) {
        this._id = id || 0;

        this._firstName = firstName;
        this._lastName = lastName;
        this._department = department;

        this._createdAt = createdAt || new Date();

        // auth fields
        this._username = username || null;
        this._passwordHash = passwordHash || null;
        this._role = role || 'employee';
    }

    // Getters
    getId() { return this._id; }
    getFirstName() { return this._firstName; }
    getLastName() { return this._lastName; }
    getDepartment() { return this._department; }
    getUsername() { return this._username; }
    getRole() { return this._role; }
    getCreatedAt() { return this._createdAt; }

    // setters
    setFirstName(v) { this._firstName = v; }
    setLastName(v) { this._lastName = v; }
    setDepartment(v) { this._department = v; }
    setUsername(v) { this._username = v; }
    setPasswordHash(v) { this._passwordHash = v; }
    setRole(v) { this._role = v; }

    // save
    save(db, callback) {

        if (this._id === 0) {

            const query = `
                INSERT INTO employees
                (first_name, last_name, department, username, password_hash, role)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(query, [
                this._firstName,
                this._lastName,
                this._department,
                this._username,
                this._passwordHash,
                this._role
            ], (err, result) => {
                if (err) return callback(err);

                this._id = result.insertId;
                callback(null, result);
            });

        } else {

            const query = `
                UPDATE employees SET
                    first_name=?,
                    last_name=?,
                    department=?,
                    username=?,
                    role=?
                WHERE id=?
            `;

            db.query(query, [
                this._firstName,
                this._lastName,
                this._department,
                this._username,
                this._role,
                this._id
            ], callback);
        }
    }

    //aLL
    static findAll(db, callback) {
        db.query("SELECT * FROM employees", (err, rows) => {
            if (err) return callback(err);

            const employees = rows.map(r =>
                new Employee(
                    r.first_name,
                    r.last_name,
                    r.department,
                    r.id,
                    r.created_at,
                    r.username,
                    r.password_hash,
                    r.role
                )
            );

            callback(null, employees);
        });
    }

    // id
    static findById(db, id, callback) {
        db.query("SELECT * FROM employees WHERE id=?", [id], (err, rows) => {
            if (err) return callback(err);
            if (!rows.length) return callback(null, null);

            const r = rows[0];

            const employee = new Employee(
                r.first_name,
                r.last_name,
                r.department,
                r.id,
                r.created_at,
                r.username,
                r.password_hash,
                r.role
            );

            callback(null, employee);
        });
    }

    //  (for login)
    static findByUsername(db, username, callback) {
        db.query("SELECT * FROM employees WHERE username=?", [username], (err, rows) => {
            if (err) return callback(err);
            if (!rows.length) return callback(null, null);

            const r = rows[0];

            const employee = new Employee(
                r.first_name,
                r.last_name,
                r.department,
                r.id,
                r.created_at,
                r.username,
                r.password_hash,
                r.role
            );

            callback(null, employee);
        });
    }

    // DELETE
    static deleteById(db, id, callback) {
        db.query("DELETE FROM employees WHERE id=?", [id], callback);
    }
}

module.exports = { Employee };