import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Backend server URL

  constructor(private http: HttpClient) {}
  private isAuthenticated = false; // Set to true when user is authenticated

  // Simulate a login, set isAuthenticated to true
  loginuser() {
    this.isAuthenticated = true;
  }

  // Simulate a logout, set isAuthenticated to false
  logoutuser() {
    this.isAuthenticated = false;
  }

  // Check if user is authenticated
  isAuthenticatedUser(): boolean {
    debugger;
    return this.isAuthenticated;
  }
  // Example: Login user
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      map((response: any) => {
        // Assuming the server responds with 200 for successful login
        console.log("Rammmm");
        if (response) {
          this.isAuthenticated = true;
        }
        return response; // You can return the response if needed
      })
    );
  }
  

  // Example: Register user
  register(username: string, email: string, password: string): Observable<any> {
    const body = { username, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}
