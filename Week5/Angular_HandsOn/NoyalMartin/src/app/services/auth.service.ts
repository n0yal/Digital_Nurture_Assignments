import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = true;

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  canAccess(): boolean {
    return this.isLoggedIn;
  }
}
