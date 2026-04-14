"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftScheduler = void 0;
// this is for recurring shifts
const EmployeeShift_1 = require("./EmployeeShift");
class ShiftScheduler {
    static assignRecurringShift(db, employeeId, shiftId, daysOfWeek, startDate, endDate, callback) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let currentDate = new Date(startDate);
        function nextDay() {
            currentDate.setDate(currentDate.getDate() + 1);
            if (currentDate > endDate) {
                callback(null); // finished
                return;
            }
            processDay();
        }
        function processDay() {
            const dayName = days[currentDate.getDay()];
            if (daysOfWeek.includes(dayName)) {
                const shift = new EmployeeShift_1.EmployeeShift(employeeId, shiftId, new Date(currentDate));
                shift.save(db, (err) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    nextDay();
                });
            }
            else {
                nextDay();
            }
        }
        processDay(); // start recursion
    }
}
exports.ShiftScheduler = ShiftScheduler;
