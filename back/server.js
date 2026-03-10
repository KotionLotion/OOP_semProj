const express = require('express');
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

// Routes
app.use('/api', employeeRoutes);
app.use('/api', shiftRoutes);
app.use('/api', employeeShiftRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});