#ifndef SHIFT_MANAGEMENT_H
#define SHIFT_MANAGEMENT_H

#include <string>
#include <vector>

using namespace std;

class Base {
protected:
    int id;
    string createdAt;

public:
    Base(int id = 0, string createdAt = "")
        : id(id), createdAt(createdAt) {}

    int getId() const {
        return id;
    }

    string getCreatedAt() const {
        return createdAt;
    }

    virtual void save() = 0;
};

class Employee : public Base {
private:
    string username;
    string role;
    string department;

public:
    Employee(string username, string role, string department, int id = 0, string createdAt = "")
        : Base(id, createdAt), username(username), role(role), department(department) {}

    string getUsername() const { return username; }
    string getRole() const { return role; }
    string getDepartment() const { return department; }

    void setUsername(string username) { this->username = username; }
    void setRole(string role) { this->role = role; }
    void setDepartment(string department) { this->department = department; }

    void save() override;
};

class Shift : public Base {
private:
    string name;
    string startTime;
    string endTime;

public:
    Shift(string name, string startTime, string endTime, int id = 0, string createdAt = "")
        : Base(id, createdAt), name(name), startTime(startTime), endTime(endTime) {}

    string getName() const { return name; }
    string getStartTime() const { return startTime; }
    string getEndTime() const { return endTime; }

    void setName(string name) { this->name = name; }
    void setStartTime(string startTime) { this->startTime = startTime; }
    void setEndTime(string endTime) { this->endTime = endTime; }

    void save() override;
};

class EmployeeShift : public Base {
private:
    int employeeId;
    int shiftId;
    string assignedDate;

public:
    EmployeeShift(int employeeId, int shiftId, string assignedDate, int id = 0, string createdAt = "")
        : Base(id, createdAt), employeeId(employeeId), shiftId(shiftId), assignedDate(assignedDate) {}

    int getEmployeeId() const { return employeeId; }
    int getShiftId() const { return shiftId; }
    string getAssignedDate() const { return assignedDate; }

    void setEmployeeId(int id) { employeeId = id; }
    void setShiftId(int id) { shiftId = id; }
    void setAssignedDate(string date) { assignedDate = date; }

    void save() override;
};

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
