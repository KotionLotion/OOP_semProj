const bcrypt = require('bcrypt');
const { Employee } = require('./Employee');

class User extends Employee {

    constructor(...args) {
        super(...args);
    }

    async verifyPassword(password) {
        return bcrypt.compare(password, this._passwordHash);
    }

    static async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
}

module.exports = { User };