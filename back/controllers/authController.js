const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Employee } = require('../dist/Employee');

const SECRET = 'shift-scheduler-jwt-secret';

const authController = {

    login: (req, res) => {
        const { username, password } = req.body;

        Employee.findByUsername(db, username, async (err, user) => {
            if (err || !user) {
                return res.json({ success: false, message: 'Invalid credentials' });
            }

            const valid = await bcrypt.compare(password, user._passwordHash);

            if (!valid) {
                return res.json({ success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                {
                    id: user.getId(),
                    username: user.getUsername(),
                    role: user.getRole()
                },
                SECRET,
                { expiresIn: '8h' }
            );

            res.json({ success: true, token });
        });
    },

    me: (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.json({ success: false });

        try {
            const user = jwt.verify(token, SECRET);
            res.json({ success: true, user });
        } catch {
            res.json({ success: false });
        }
    },

    logout: (req, res) => {
        res.json({ success: true });
    },

    createUser: async (req, res) => {

        const {
            firstName,
            lastName,
            department,
            username,
            password,
            role
        } = req.body;

        if (!username || !password) {
            return res.json({
                success: false,
                message: 'Username and password required'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const employee = new Employee(
            firstName,
            lastName,
            department,
            0,
            new Date(),
            username,
            hash,
            role || 'employee'
        );

        employee.save(db, (err) => {
            if (err) {
                return res.json({ success: false, error: err.message });
            }

            res.json({
                success: true,
                message: 'Employee created!',
                employeeId: employee.getId()
            });
        });
    }
};

module.exports = authController;