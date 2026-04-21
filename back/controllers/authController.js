const db = require('../db/db');
const { User } = require('../dist/User');

const authController = {

    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ success: false, message: 'Username and password required' });
        }

        User.findByUsername(db, username, async (err, user) => {
            if (err) return res.json({ success: false, error: err.message });
            if (!user) return res.json({ success: false, message: 'Invalid credentials' });

            const valid = await user.verifyPassword(password);
            if (!valid) return res.json({ success: false, message: 'Invalid credentials' });

            // Store minimal info in session
            req.session.user = {
                id: user.getId(),
                employeeId: user.getEmployeeId(),
                username: user.getUsername(),
                role: user.getRole()
            };

            res.json({
                success: true,
                user: req.session.user
            });
        });
    },
    //logout
    logout: (req, res) => {
        req.session.destroy(() => {
            res.json({ success: true, message: 'Logged out' });
        });
    },

    //check who's logged in
    me: (req, res) => {
        if (req.session && req.session.user) {
            res.json({ success: true, user: req.session.user });
        } else {
            res.json({ success: false });
        }
    },

    // manager/admin only
    createUser: async (req, res) => {
        const { employeeId, username, password, role } = req.body;
        if (!employeeId || !username || !password) {
            return res.json({ success: false, message: 'employeeId, username, and password are required' });
        }

        try {
            const hash = await User.hashPassword(password);
            const user = new User(employeeId, username, hash, role || 'employee');

            user.save(db, (err, result) => {
                if (err) return res.json({ success: false, error: err.message });
                res.json({ success: true, message: 'User created!', userId: user.getId() });
            });
        } catch (e) {
            res.json({ success: false, error: e.message });
        }
    }
};

module.exports = authController;