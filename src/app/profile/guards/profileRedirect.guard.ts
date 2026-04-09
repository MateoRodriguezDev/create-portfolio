import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ProfileRedirectGuard implements CanActivate {

  private router = inject(Router);
  private _authService = inject(AuthService)

  canActivate(): boolean {
    const profileId = localStorage.getItem('profileId')
    if(profileId === null) {
      this._authService.logout()
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/profile', profileId]);
    return false;
  }
}
