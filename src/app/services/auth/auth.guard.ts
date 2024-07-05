import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const requiredRole = next.data['role'] as string;
    const userRole = this.authService.getRole();

    if (this.authService.isLoggedIn() && userRole === requiredRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }*/

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const userRole = this.authService.getRole();
      const expectedRoles = route.data['roles'] as Array<string>;
  
      if (!this.authService.isLoggedIn() || !expectedRoles.includes(userRole)) {
        this.router.navigate(['unauthorized']);
        return false;
      }
      return true;
    }
}