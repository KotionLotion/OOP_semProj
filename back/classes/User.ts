import * as bcrypt from 'bcrypt';

export class User {
    private _id: number;
    private _employeeId: number;
    private _username: string;
    private _passwordHash: string;
    private _role: string;
    private _createdAt: Date;

    constructor(
        employeeId: number,
        username: string,
        passwordHash: string,
        role: string = 'employee',
        id?: number,
        createdAt?: Date
    ) {
        this._id = id || 0;
        this._employeeId = employeeId;
        this._username = username;
        this._passwordHash = passwordHash;
        this._role = role;
        this._createdAt = createdAt || new Date();
    }

    // Getters
    getId(): number { return this._id; }
    getEmployeeId(): number { return this._employeeId; }
    getUsername(): string { return this._username; }
    getPasswordHash(): string { return this._passwordHash; }
    getRole(): string { return this._role; }
    getCreatedAt(): Date { return this._createdAt; }

    // Verify a plaintext password against the stored hash
    async verifyPassword(plaintext: string): Promise<boolean> {
        return bcrypt.compare(plaintext, this._passwordHash);
    }

    save(db: any, callback: Function): void {
        if (this._id === 0) {
            const query = `INSERT INTO users (employee_id, username, password_hash, role, created_at)
                           VALUES (?, ?, ?, ?, ?)`;
            db.query(
                query,
                [this._employeeId, this._username, this._passwordHash, this._role, this._createdAt],
                (err: any, result: any) => {
                    if (err) { callback(err, null); return; }
                    this._id = result.insertId;
                    callback(null, result);
                }
            );
        } else {
            const query = `UPDATE users SET username=?, role=? WHERE id=?`;
            db.query(query, [this._username, this._role, this._id], (err: any, result: any) => {
                if (err) { callback(err, null); return; }
                callback(null, result);
            });
        }
    }

    static findByUsername(db: any, username: string, callback: Function): void {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], (err: any, rows: any) => {
            if (err) { callback(err, null); return; }
            if (rows.length === 0) { callback(null, null); return; }

            const u = rows[0];
            const user = new User(u.employee_id, u.username, u.password_hash, u.role, u.id, u.created_at);
            callback(null, user);
        });
    }

    static findAll(db: any, callback: Function): void {
        // Join with employees so admin sees full info
        const query = `
            SELECT u.*, e.first_name, e.last_name
            FROM users u
            JOIN employees e ON u.employee_id = e.id
        `;
        db.query(query, (err: any, rows: any) => {
            if (err) { callback(err, null); return; }
            callback(null, rows);
        });
    }

    // Static helper: hash a plaintext password (gotyta make authController)
    static async hashPassword(plaintext: string): Promise<string> {
        return bcrypt.hash(plaintext, 10);
    }
}