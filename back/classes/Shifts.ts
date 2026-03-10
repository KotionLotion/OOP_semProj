export class Shift {
    private _id: number;
    private _name: string;
    private _startTime: Date;
    private _endTime: Date;
    private _createdAt: Date;

    constructor(name: string, startTime: Date, endTime: Date, id?: number, createdAt?: Date) {
        this._id = id || 0;
        this._name = name;
        this._startTime = startTime;
        this._endTime = endTime;
        this._createdAt = createdAt || new Date();
    }

    // Getters
        getId(): number { 
            return this._id; 
        }
        getName(): string { 
            return this._name; 
        }
        getStartTime(): Date { 
            return this._startTime; 
        }
        getEndTime(): Date{
            return this._endTime; 
        }

    // Setters
        setName(name: string): void { 
            this._name = name; 
        }
        setStartTime(startTime: Date): void { 
            this._startTime = startTime; 
        }
        setEndTime(endTime: Date): void { 
            this._endTime = endTime; 
        }

    // Method
        save(db: any, callback: Function): void {

            if (this._id === 0) {
                const query = "INSERT INTO shifts (name, start_time, end_time, created_at) VALUES (?, ?, ?, ?)";
                db.query(query, [this._name, this._startTime, this._endTime, this._createdAt], (err: any, result: any) => {
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
                db.query(query, [this._name, this._startTime, this._endTime, this._id], (err: any, result: any) => {
                    if (err) { 
                        callback(err, null); 
                        return; 
                    }
                    
                    callback(null, result);
                });
            }
        }

        static findById(db: any, id: number, callback: Function): void {
            const query = "SELECT * FROM shifts WHERE id=?";
            db.query(query, [id], (err: any, rows: any) => {
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

        static findAll(db: any, callback: Function) : void {
            const query = "SELECT * FROM shifts";
            db.query(query, (err: any, rows: any) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                
                const shifts = rows.map((r: any) => new Shift(r.name, r.start_time, r.end_time, r.id, r.created_at));
                callback(null, shifts);
            });
        }

}