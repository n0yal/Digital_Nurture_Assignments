import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Auth guard protects routes like /profile and /enroll
export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.canAccess()) {
    return true;
  }
  // not logged in, send back to home
  router.navigate(['/']);
  return false;
};
