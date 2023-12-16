// admin-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  isAdd: boolean = false;
  employees: Employee[] = [];
  showAddForm: boolean = false;
  newEmployee: Employee = {
    id: 0,
    name: '',
    surname: '',
    position: '',
    birthday: new Date(),
    phoneNumber: '',
    paymentPercent: 0,
    email: '',
  };

  constructor(private clientService: ClientServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.clientService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        this.router.navigate(['/login']);
        console.error('Error fetching employees: ', error);
      }
    );
  }

  editEmployee(employeeId: number) {
    this.isAdd = false;
    const selectedEmployee = this.employees.find((employee) => employee.id === employeeId);

    if (selectedEmployee) {
      console.log(1);
      this.router.navigate([`/add-edit/${employeeId}`]);
    }
  }

  deleteEmployee(employeeId: number) {
    this.clientService.deleteEmployee(employeeId).subscribe(
      () => {
        this.fetchEmployees();
      },
      (error) => {
        alert("Server thinks that u can't do this");
        console.error('Error deleting employee: ', error);
      }
    );
  }

  addEmployee() {
    this.isAdd = true;
    this.newEmployee = {
      id: 0,
      name: '',
      surname: '',
      position: '',
      birthday: new Date(),
      phoneNumber: '',
      paymentPercent: 0,
      email: '',
    };
    this.showAddForm = !this.showAddForm;
  }

  submitEmployeeForm() {
    if (!this.isAdd) {
      this.clientService.updateEmployee(this.newEmployee.id, this.newEmployee).subscribe(
        () => {
          this.fetchEmployees();
        }, (error) => {
          alert("Server thinks that u can't do this. Position should be number from 1 to 10.");
          console.error('Error updating employee: ', error);
        }
      )
    } else {
      const payload = {
        id: 0,
        name: this.newEmployee.name,
        surname: this.newEmployee.surname,
        position: this.newEmployee.position,
        birthday: this.newEmployee.birthday,
        phoneNumber: this.newEmployee.phoneNumber,
        paymentPercent: this.newEmployee.paymentPercent,
        email: this.newEmployee.email,
        password: 'password'
      };
      console.log('Form submitted:', this.newEmployee);
      this.clientService.addEmployee(payload).subscribe(
        () => {
          this.fetchEmployees();
        },
        (error) => {
          alert("Server thinks that u can't do this. Position should be number from 1 to 10.");
          console.error('Error adding employee: ', error);
        }
      )
    }
    this.showAddForm = false;
  }

}
