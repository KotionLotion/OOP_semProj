"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shift = void 0;
class Shift {
    constructor(name, startTime, endTime, id, createdAt) {
        this._id = id || 0;
        this._name = name;
        this._startTime = startTime;
        this._endTime = endTime;
        this._createdAt = createdAt || new Date();
    }
    // Getters
    getId() {
        return this._id;
    }
    getName() {
        return this._name;
    }
    getStartTime() {
        return this._startTime;
    }
    getEndTime() {
        return this._endTime;
    }
    // Setters
    setName(name) {
        this._name = name;
    }
    setStartTime(startTime) {
        this._startTime = startTime;
    }
    setEndTime(endTime) {
        this._endTime = endTime;
    }
    // Method
    save(db, callback) {
        if (this._id === 0) {
            const query = "INSERT INTO shifts (name, start_time, end_time, created_at) VALUES (?, ?, ?, ?)";
            db.query(query, [this._name, this._startTime, this._endTime, this._createdAt], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                this._id = result.insertId;
                callback(null, result);
            });
        }
        else {
            const query = "UPDATE shifts SET name=?, start_time=?, end_time=? WHERE id=?";
            db.query(query, [this._name, this._startTime, this._endTime, this._id], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        }
    }
    static findById(db, id, callback) {
        const query = "SELECT * FROM shifts WHERE id=?";
        db.query(query, [id], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (rows.length === 0) {
                callback(null, null);
                return;
            }
            const s = rows[0];
            const shift = new Shift(s.name, s.start_time, s.end_time, s.id, s.created_at);
            callback(null, shift);
        });
    }
    static findAll(db, callback) {
        const query = "SELECT * FROM shifts";
        db.query(query, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            const shifts = rows.map((r) => new Shift(r.name, r.start_time, r.end_time, r.id, r.created_at));
            callback(null, shifts);
        });
    }
}
exports.Shift = Shift;
