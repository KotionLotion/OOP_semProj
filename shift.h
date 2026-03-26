#ifndef SHIFT_MANAGEMENT_H
#define SHIFT_MANAGEMENT_H

#include <string>
#include <vector>

using namespace std;

/*BASE CLASS */
class Base {
protected:
    int id;
    string createdAt;

public:
    Base(int id = 0, string createdAt = "");

    int getId() const;
    string getCreatedAt() const;

    virtual void save() = 0;
};

/* EMPLOYEE CLASS */
class Employee : public Base {
private:
    string username;
    string role;
    string department;

public:
    Employee(string username, string role, string department, int id = 0, string createdAt = "");

    string getUsername() const;
    string getRole() const;
    string getDepartment() const;

    void setUsername(string username);
    void setRole(string role);
    void setDepartment(string department);

    void save() override;
};

/*SHIFT CLASS*/
class Shift : public Base {
private:
    string name;
    string startTime;
    string endTime;

public:
    Shift(string name, string startTime, string endTime, int id = 0, string createdAt = "");

    string getName() const;
    string getStartTime() const;
    string getEndTime() const;

    void setName(string name);
    void setStartTime(string startTime);
    void setEndTime(string endTime);

    void save() override;
};

/* EMPLOYEE SHIFT CLASS */
class EmployeeShift : public Base {
private:
    int employeeId;
    int shiftId;
    string assignedDate;

public:
    EmployeeShift(int employeeId, int shiftId, string assignedDate, int id = 0, string createdAt = "");

    int getEmployeeId() const;
    int getShiftId() const;
    string getAssignedDate() const;

    void setEmployeeId(int id);
    void setShiftId(int id);
    void setAssignedDate(string date);

    void save() override;
};

/*SHIFT SCHEDULER (UTILITY)*/
class ShiftScheduler {
public:
    static void assignRecurringShift(
        int employeeId,
        int shiftId,
        vector<string> daysOfWeek,
        string startDate,
        string endDate
    );
};

#endif
