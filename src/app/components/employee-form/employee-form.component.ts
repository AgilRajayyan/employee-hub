import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  roles = [
    'Product Designer',
    'Flutter Developer',
    'QA Tester',
    'Product Owner',
  ];
  employeeForm: FormGroup;
  isLoading = false;
  mode: null | 'EDIT' | 'ADD' = null;
  navbarTitle = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      joiningDate: new FormControl(new Date(), [Validators.required]),
      lastDate: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.startsWith('employees/edit')) {
      const id = this.route.snapshot.params['id'];
      this.isLoading = true;
      this.mode = 'EDIT';
      this.navbarTitle = 'Edit Employee Details';
      this.employeeService.getEmployee(parseInt(id)).subscribe(
        (employee) => {
          this.isLoading = false;
          const { name, role, joiningDate, lastDate } = employee;
          this.employeeForm.setValue({ name, role, joiningDate, lastDate });
        },
        (error) => {
          this.isLoading = false;
        }
      );
    } else if (currentUrl === 'employees/add') {
      this.mode = 'ADD';
      this.navbarTitle = 'Add Employee Details';
    }
  }

  onFormSubmit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('employees/add')) {
      this.employeeService
        .addEmployee(this.employeeForm.value)
        .subscribe(() => {
          this.snackBar.open('Employee data has been added', 'Ok');
          this.router.navigate(['employees']);
        });
    } else {
      const id = parseInt(this.route.snapshot.params['id']);
      const employee = {
        id,
        ...this.employeeForm.value,
      };
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.snackBar.open('Employee data has been updted', 'Ok');
        this.router.navigate(['employees']);
      });
    }
  }

  deleteEmployeeData() {
    const id = this.route.snapshot.params['id'];
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.snackBar.open('Employee data has been deleted', 'Ok');
      this.router.navigate(['employees']);
    });
  }
}
