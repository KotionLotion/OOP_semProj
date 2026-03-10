// this is for recurring shifts
import { EmployeeShift } from "./EmployeeShift";

export class ShiftScheduler {

    static assignRecurringShift(db: any, employeeId: number, shiftId: number, daysOfWeek: string[], startDate: Date, endDate: Date, callback: Function): void {
        const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
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
                    const shift = new EmployeeShift(employeeId, shiftId, new Date(currentDate));
                    shift.save(db, (err: any) => {
                        if (err) { 
                            callback(err); return; 
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