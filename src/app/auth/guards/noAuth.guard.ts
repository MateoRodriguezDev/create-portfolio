import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private auth = inject(Auth);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return authState(this.auth).pipe(
      map(user => {
        if (user) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
