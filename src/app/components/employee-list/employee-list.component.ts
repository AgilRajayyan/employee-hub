import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe(
      (employees) => {
        this.populateEmployeesData(employees);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  populateEmployeesData(employees: Employee[]) {
    this.previousEmployees = [];
    this.currentEmployees = [];
    employees.forEach((employee) => {
      if (employee.lastDate && employee.lastDate < new Date()) {
        this.previousEmployees.push(employee);
      } else {
        this.currentEmployees.push(employee);
      }
    });
  }

  addEmployeeData() {
    this.router.navigate(['employees', 'add']);
  }

  editEmployeeData(employee: Employee) {
    this.router.navigate(['employees', 'edit', employee.id]);
  }

  deleteEmployeeData(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id).subscribe((employees) => {
      this.snackBar.open('Employee data has been deleted', 'Ok');
      this.populateEmployeesData(employees);
    });
  }
}
