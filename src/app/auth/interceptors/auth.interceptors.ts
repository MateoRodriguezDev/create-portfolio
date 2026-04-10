import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(Auth);

  if (!auth.currentUser) return next(req);

  return from(auth.currentUser.getIdToken()).pipe(
    switchMap(token => {
      const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });
      return next(newReq);
    })
  );
}
