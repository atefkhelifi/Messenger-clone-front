import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToke: LocalStorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.localStorageToke.getToken();
    const isLoggedIn = !!token; // Check if user is logged in
    const targetPath = route.routeConfig?.path;

    // Prevent logged-in users from accessing the login route
    if (isLoggedIn && targetPath === 'login') {
      this.router.navigate(['/']); // Redirect to home or default page
      return false;
    }

    // Prevent unauthenticated users from accessing protected routes
    if (!isLoggedIn && targetPath !== 'login') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  // private _isTokenExpired(exp: number): boolean {
  //   return Math.floor(new Date().getTime() / 1000) >= exp;
  // }
}
