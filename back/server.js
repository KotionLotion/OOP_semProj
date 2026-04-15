const express = require('express');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const employeeShiftRoutes = require('./routes/employeeShiftRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the "front" directory
app.use(express.static(path.join(__dirname, '../front')));

// Serve index.html as the root page and /index.html
app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../front/views/index.html'));
});

// Serve employees.html
app.get('/employees.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/views/employees.html'));
});

// Routes
app.use('/api', employeeRoutes);
app.use('/api', shiftRoutes);
app.use('/api', employeeShiftRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});