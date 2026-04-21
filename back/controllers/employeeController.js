const db = require('../db/db');
const { Employee } = require('../dist/Employee');

const employeeController = {

    addEmployee: (req, res) => {
        const { id, firstName, lastName, department } = req.body;

        const employee = new Employee(firstName, lastName, department, id);

        employee.save(db, (err) => {
            if (err) {
                return res.json({ success: false, error: err.message });
            }

            res.json({
                success: true,
                message: 'Employee Added!',
                employeeId: employee.getId()
            });
        });
    },

    getAllEmployees: (req, res) => {
        Employee.findAll(db, (err, employees) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            const cleanEmployees = employees.map(e => ({
                id: e.getId(),
                firstName: e.getFirstName(),
                lastName: e.getLastName(),
                department: e.getDepartment(),
                username: e.getUsername(),
                role: e.getRole()    
            }));

            res.json(cleanEmployees);
        });
    },

    getEmployee: (req, res) => {
        const id = req.params.id;

        Employee.findById(db, id, (err, employee) => {
            if (err) {
                return res.json({
                    success: false,
                    error: err.message
                });
            }

            if (!employee) {
                return res.json({
                    success: false,
                    message: 'Employee not found!'
                });
            }

            // 🔥 clean object
            res.json({
                id: employee.getId(),
                firstName: employee.getFirstName(),
                lastName: employee.getLastName(),
                department: employee.getDepartment()
            });
        });
    },

    updateEmployee: (req, res) => {
        const id = req.params.id;
        const { firstName, lastName, department } = req.body;

        Employee.findById(db, id, (err, employee) => {
            if (err) return res.json({ success: false, error: err.message });
            if (!employee) return res.json({ success: false, message: 'Employee not found!' });

            employee.setFirstName(firstName);
            employee.setLastName(lastName);
            employee.setDepartment(department);

            employee.save(db, (err) => {
                if (err) return res.json({ success: false, error: err.message });

                res.json({ success: true, message: 'Employee updated!' });
            });
        });
    },

    deleteEmployee: (req, res) => {
        const id = req.params.id;

        Employee.deleteById(db, id, (err) => {
            if (err) return res.json({ success: false, error: err.message });

            res.json({ success: true, message: 'Employee deleted!' });
        });
    }
};

module.exports = employeeController;