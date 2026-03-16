#ifndef SHIFT_MANAGEMENT_H
#define SHIFT_MANAGEMENT_H

#include <stdio.h>
#include <stdlib.h>

/*
   STRUCT DEFINITIONS */

typedef struct {
    int id;
    char username[100];
    char role[100];
    char department[100];
} Employee;

typedef struct {
    int id;
    char name[100];
    char start_time[20];
    char end_time[20];
} Shift;

typedef struct {
    int id;
    int employee_id;
    int shift_id;
    char assigned_date[20];
} EmployeeShift;


/*EMPLOYEE FUNCTIONS */

void addEmployee(Employee employee);
void viewAllEmployees();
Employee getEmployeeById(int id);
void updateEmployee(Employee employee);
void deleteEmployee(int id);


/*
   SHIFT FUNCTIONS*/

void addShift(Shift shift);
void viewAllShifts();
Shift getShiftById(int id);
void updateShift(Shift shift);
void deleteShift(int id);


/*SHIFT ASSIGNMENT FUNCTIONS*/

void assignShift(int employee_id, int shift_id, char assigned_date[]);
void assignRecurringShift(int employee_id, int shift_id, char days_of_week[], char start_date[], char end_date[]);
void viewEmployeeShifts(int employee_id);
void removeEmployeeShift(int assignment_id);


/*
   SCHEDULE FUNCTIONS*/

void viewScheduleByDate(char date[]);
void viewEmployeeSchedule(int employee_id);
void viewDepartmentSchedule(char department[]);


#endif
