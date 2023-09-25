import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file-compression-app';
  constructor(private router: Router) {}

  shouldShowLoginLink(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/register';
  }

  shouldShowLogoutLink(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/file-compression';
  }

  logout() {
    // Perform logout actions here
    this.router.navigate(['/login']);
  }

}
