const db = require ('../db/db');
const { Employee } = require('../dist/Employee');

const employeeController = {
    
    addEmployee: (req, res) => {
        const { id, firstName, lastName, department} = req.body;
        const employee = new Employee(firstName, lastName, department, id);

        employee.save(db, (err, result) => {
            if (err) {
                res.json({ success: false, error: err.message});
                return;
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
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }

            res.json(employees);
        });
    },

    getEmployee: (req, res) => {
        const id = req.params.id;
        Employee.findById(db, id, (err, employee) => {
            //Check to see if exist
            if (err) {
                res.json({
                    success: false,
                    error: err.message
                });
                return;
            }
            if (employee) {
                res.json(employee);
            }
            else {
                res.json({
                    success: false,
                    message: 'Employee not found!'
                });
            }
        });
    },

    updateEmployee: (req, res) => {
        const id = req.params.id;
        const { firstName, lastName, department } = req.body;

        Employee.findById(db, id, (err, employee) => {
            if (err) {
                res.json({ success: false, error: err.message });
                return;
            }
            if (!employee) {
                res.json({ success: false, message: 'Employee not found!' });
                return;
            }

            employee.setFirstName(firstName);
            employee.setLastName(lastName);
            employee.setDepartment(department);

            employee.save(db, (err, result) => {
                if (err) {
                    res.json({ success: false, error: err.message });
                    return;
                }
                res.json({ success: true, message: 'Employee updated!' });
            });
        });
    },

    deleteEmployee: (req, res) => {
        const id = req.params.id;

        Employee.deleteById(db, id, (err, result) => {
            if (err) {
                res.json({ success: false, error: err.message });
                return;
            }
            res.json({ success: true, message: 'Employee deleted!' });
        });
    }


};

module.exports = employeeController;
