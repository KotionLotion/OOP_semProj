const express = require('express');
const path = require('path');
const session = require('express-session');
const employeeRoutes = require('./routes/employeeRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const employeeShiftRoutes = require('./routes/employeeShiftRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireLogin } = require('./middleware/authMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'shift-scheduler-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, //false for HTTP (localhost)
        sameSite: 'lax', // Allows cookie on page navs
        maxAge: 1000 * 60 * 60 * 8
    }
}));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static(path.join(__dirname, '../front')));


// Login page, always public
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/views/login.html'));
});


//API routes
app.use('/api/auth', authRoutes);
app.use('/api', requireLogin);
app.use('/api', employeeRoutes);
app.use('/api', shiftRoutes);
app.use('/api', employeeShiftRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});