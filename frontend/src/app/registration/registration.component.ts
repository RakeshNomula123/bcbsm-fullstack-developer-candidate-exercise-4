import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  username = '';
  email = '';
  password = '';
  registrationSuccess = false;

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        this.registrationSuccess = true;
        // Handle successful registration (e.g., show success message)
        console.log('Registration successful', response);
      },
      (error) => {
        
        // Handle registration error
        console.error('Registration error', error);
      }
    );
  }
}
