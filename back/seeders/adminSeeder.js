const db = require('../db/db');
const bcrypt = require('bcrypt');

async function seedAdmin() {
    // First create an employee record for the admin
    const employeeQuery = `
        INSERT INTO employees (first_name, last_name, department)
        VALUES ('Admin', 'User', 'Management')
    `;

    db.query(employeeQuery, async (err, result) => {
        if (err) {
            console.error('Error creating admin employee:', err.message);
            db.end();
            return;
        }

        const employeeId = result.insertId;
        const passwordHash = await bcrypt.hash('admin123', 10);

        const userQuery = `
            INSERT INTO users (employee_id, username, password_hash, role)
            VALUES (?, 'admin', ?, 'manager')
        `;

        db.query(userQuery, [employeeId, passwordHash], (err, result) => {
            if (err) {
                console.error('Error creating admin user:', err.message);
            } else {
                console.log('Admin user created!');
                console.log('Username: admin');
                console.log('Password: admin123');
                console.log('Role:manager');
                console.log('Change the password after first login!');
            }
            db.end();
        });
    });
}

seedAdmin();


//run using node /back/seeders/adminSeeder.js
//start serv normally using back/server.js