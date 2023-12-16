// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(email: string, password: string, event: Event): void {
    event?.preventDefault();
    this.authService.login(email, password).subscribe(
      (response) => {
        const authToken = response.token;
        this.authService.setAuthToken(authToken);
        this.router.navigate(['/admin']);
      },
      (error) => {
        alert("user not found");
        console.error('Login failed:', error);
      }
    );
  }
}
