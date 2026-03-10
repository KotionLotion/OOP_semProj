export class Employee {
    private _id: number;
    private _username : string;
    private _role: string;
    private _department: string;
    private _createdAt: Date;

    constructor(username: string, role: string, department: string, id?: number, createdAt?: Date) {
        this._id = id || 0;
        this._username = username;
        this._role = role;
        this._department = department;
        this._createdAt = createdAt || new Date();
    }

    //Getters
        getId(): number {
            return this._id;
        }
        getUsername(): string {
            return this._username;
        }
        getRole(): string {
            return this._role;
        }
        getDepartment(): string{
            return this._department;
        }
        getCreatedAt(): Date {
            return this._createdAt;
        }

    //Setters
        setUsername(username:string): void{
            this._username = username;
        }
        setRole(role:string): void {
            this._role = role;
        }
        setDepartment(department: string) : void {
            this._department = department;
        }

    // method
        save(db: any, callback: Function): void {

            if (this._id === 0) { 
                const query = "INSERT INTO employees (username, role, department, created_at) VALUES (?, ?, ?, ?)";
                db.query(query, [this._username, this._role, this._department, this._createdAt], (err: any, result:any) => {
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
                db.query(query, [this._username, this._role, this._department, this._id], (err: any, result:any) => {
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
                const employee = new Employee(e.username, e.role, e.department, e.id, e.created_at);
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
            
                const employees = rows.map((r: any) => new Employee(r.username, r.role, r.department, r.id, r.created_at));
                callback(null, employees);
            });
        }

}