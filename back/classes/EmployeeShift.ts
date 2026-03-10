export class EmployeeShift {
    private _id: number;
    private _employeeId: number;
    private _shiftId: number;
    private _assignedDate: Date;
    private _createdAt: Date;

    constructor(employeeId: number, shiftId: number, assignedDate: Date, id?: number, createdAt?: Date) {
        this._id = id || 0;
        this._employeeId = employeeId;
        this._shiftId = shiftId;
        this._assignedDate = assignedDate;
        this._createdAt = createdAt || new Date();
    }

    // Getters
        getId(): number { 
            return this._id; 
        }
        getEmployeeId(): number { 
            return this._employeeId; 
        }
        getShiftId(): number { 
            return this._shiftId; 
        }
        getAssignedDate(): Date { 
            return this._assignedDate; 
        }

    // Setters
        setEmployeeId(id: number): void { 
            this._employeeId = id; 
        }
        setShiftId(id: number): void { 
            this._shiftId = id; 
        }
        setAssignedDate(date: Date): void { 
            this._assignedDate = date; 
        }

    // method
        save(db: any, callback: Function): void {
            if (this._id === 0) {
                const query = "INSERT INTO employee_shifts (employee_id, shift_id, assigned_date, created_at) VALUES (?, ?, ?, ?)";
                db.query(query, [this._employeeId, this._shiftId, this._assignedDate, this._createdAt], (err: any, result: any) => {
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
                db.query(query, [this._employeeId, this._shiftId, this._assignedDate, this._id], (err: any, result: any) => {
                    if (err) { 
                        callback(err, null); 
                        return; 
                    }

                    callback(null, result);
                });
            }
        }

        static findByEmployee(db: any, employeeId: number, callback: Function): void {
            const query = "SELECT * FROM employee_shifts WHERE employee_id=?";
            db.query(query, [employeeId], (err: any, rows: any) => {
                if (err) { 
                    callback(err, null); 
                    return; 
                }

                const shifts = rows.map((r: any) => new EmployeeShift(r.employee_id, r.shift_id, r.assigned_date, r.id, r.created_at));
                callback(null, shifts);
            });
        }

}