"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = __importStar(require("bcrypt"));
class User {
    constructor(employeeId, username, passwordHash, role = 'employee', id, createdAt) {
        this._id = id || 0;
        this._employeeId = employeeId;
        this._username = username;
        this._passwordHash = passwordHash;
        this._role = role;
        this._createdAt = createdAt || new Date();
    }
    // Getters
    getId() { return this._id; }
    getEmployeeId() { return this._employeeId; }
    getUsername() { return this._username; }
    getPasswordHash() { return this._passwordHash; }
    getRole() { return this._role; }
    getCreatedAt() { return this._createdAt; }
    // Verify a plaintext password against the stored hash
    verifyPassword(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(plaintext, this._passwordHash);
        });
    }
    save(db, callback) {
        if (this._id === 0) {
            const query = `INSERT INTO users (employee_id, username, password_hash, role, created_at)
                           VALUES (?, ?, ?, ?, ?)`;
            db.query(query, [this._employeeId, this._username, this._passwordHash, this._role, this._createdAt], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                this._id = result.insertId;
                callback(null, result);
            });
        }
        else {
            const query = `UPDATE users SET username=?, role=? WHERE id=?`;
            db.query(query, [this._username, this._role, this._id], (err, result) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
        }
    }
    static findByUsername(db, username, callback) {
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (rows.length === 0) {
                callback(null, null);
                return;
            }
            const u = rows[0];
            const user = new User(u.employee_id, u.username, u.password_hash, u.role, u.id, u.created_at);
            callback(null, user);
        });
    }
    static findAll(db, callback) {
        // Join with employees so admin sees full info
        const query = `
            SELECT u.*, e.first_name, e.last_name
            FROM users u
            JOIN employees e ON u.employee_id = e.id
        `;
        db.query(query, (err, rows) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }
    // Static helper: hash a plaintext password (gotyta make authController)
    static hashPassword(plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hash(plaintext, 10);
        });
    }
}
exports.User = User;
