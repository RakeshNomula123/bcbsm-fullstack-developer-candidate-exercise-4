import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  loginError: string = '';
  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
      
        if (response.status="200") {
          // Handle successful login (e.g., store user token)
          console.log('Login successful', response);
          this.router.navigate(['/file-compression']);
        } else {
         
          this.loginError = 'Invalid username or password'; 
          // Handle other response statuses (if needed)
          console.log('Login failed with status', response.status);
          // You can choose not to navigate here or handle it differently
        }
      },
      (error) => {
        // Handle login error
        this.loginError = 'Invalid username or password'; 
        console.error('Login error', error);
      }
    );
  }

}
