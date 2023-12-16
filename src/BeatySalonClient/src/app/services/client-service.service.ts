import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Employee} from '../models/employee';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientServiceService {
  private apiUrl = 'http://localhost:5159/api/Employees';
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getAuthToken();
    return new HttpHeaders( {
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getEmployeeByEmail(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${email}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding employee', error);
          throw error; 
        })
      );
  }

  updateEmployee(id:number, employee:Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    const params = new HttpParams().set('id', id.toString());
  
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError((error:any) => {
      console.error("Error deleting user", error);
      return of();
    }));
  }
}
