export class Employee {
    private _id: number;
    private _firstName : string;
    private _lastName: string;
    private _department: string;
    private _createdAt: Date;

    constructor(firstName: string, lastName: string, department: string, id?: number, createdAt?: Date) {
        this._id = id || 0;
        this._firstName = firstName;
        this._lastName = lastName;
        this._department = department;
        this._createdAt = createdAt || new Date();
    }

    //Getters
        getId(): number {
            return this._id;
        }
        getFirstName(): string {
            return this._firstName;
        }
        getLastName(): string {
            return this._lastName;
        }
        getDepartment(): string{
            return this._department;
        }
        getCreatedAt(): Date {
            return this._createdAt;
        }

    //Setters
        setFirstName(firstName:string): void{
            this._firstName = firstName;
        }
        setLastName(lastName:string): void {
            this._lastName = lastName;
        }
        setDepartment(department: string) : void {
            this._department = department;
        }

    // method
        save(db: any, callback: Function): void {

            if (this._id === 0) { 
                const query = "INSERT INTO employees (first_name, last_name, department, created_at) VALUES (?, ?, ?, ?)";
                db.query(query, [this._firstName, this._lastName, this._department, this._createdAt], (err: any, result:any) => {
                    if (err) { 
                        callback(err, null); 
                        return; 
                    }

                    this._id = result.insertId;
                    callback(null, result);
                });
            } 
            else {
                const query = "UPDATE employees SET first_name=?, last_name=?, department=? WHERE id=?";
                db.query(query, [this._firstName, this._lastName, this._department, this._id], (err: any, result:any) => {
                    if (err) { 
                        callback(err, null); 
                        return; 
                    }

                    callback(null, result);
                });
            }
        }

        static findById(db: any, id: number, callback: Function): void{
            const query = "SELECT * FROM employees WHERE id=?";
            db.query(query, [id], (err: any, rows: any) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                if (rows.length === 0) {
                    callback(null, null);
                    return;
                }

                const e = rows [0];
                const employee = new Employee(e.first_name, e.last_name, e.department, e.id, e.created_at);
                callback(null, employee);
            });
        }

        static findAll(db: any, callback: Function): void {
            const query = "SELECT * FROM employees";
            db.query(query, (err: any, rows: any) => {
                if (err) {
                    callback(err, null);
                    return;
                }
            
                const employees = rows.map((r: any) => new Employee(r.first_name, r.last_name, r.department, r.id, r.created_at));
                callback(null, employees);
            });
        }

        static deleteById(db: any, id: number, callback: Function): void {
            const query = "DELETE FROM employees WHERE id=?";
            db.query(query, [id], (err: any, result: any) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        }

}