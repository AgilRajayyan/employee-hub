import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private dbService: NgxIndexedDBService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.dbService.getAll('employees');
  }

  getEmployee(id: number): Observable<Employee> {
    return this.dbService.getByID('employees', id);
  }

  addEmployee(employee: {
    name: string;
    role: string;
    joiningDate: Date;
    lastDate: Date | null;
  }): Observable<Employee> {
    return this.dbService.add('employees', employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.dbService.update('employees', employee);
  }

  deleteEmployee(id: number): Observable<Employee[]> {
    return this.dbService.delete('employees', id);
  }
}
