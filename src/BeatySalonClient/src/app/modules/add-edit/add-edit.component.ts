import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  isAdd: boolean = true; // Assume adding by default
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

  Back() {
    this.router.navigate(['/admin'])
  }

  constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientServiceService) { }
  ngOnInit() {
    // Check if an 'id' parameter exists in the route
    const employeeId = parseInt(this.route.snapshot.paramMap.get('id') ?? "");
    if (employeeId) {
      this.isAdd = false;
      // Fetch the existing employee data by ID and populate the form
      this.clientService.getEmployeeById(employeeId).subscribe(
        (data: Employee) => {
          this.newEmployee = data;
        },
        (error: any) => {
          console.error('Error fetching employee details: ', error);
        }
      );
    }
  }

  submitEmployeeForm() {
    if (this.isAdd) {
      // Add new employee
      this.clientService.addEmployee(this.newEmployee).subscribe(
        () => {
          this.router.navigate(['/admin']); // Redirect to admin page after adding
        },
        (error: any) => {
          console.error('Error adding employee: ', error);
        }
      );
    } else {
      // Edit existing employee
      this.clientService.updateEmployee(this.newEmployee.id, this.newEmployee).subscribe(
        () => {
          this.router.navigate(['/admin']); // Redirect to admin page after editing
        },
        (error: any) => {
          console.error('Error updating employee: ', error);
        }
      );
    }
  }
}
