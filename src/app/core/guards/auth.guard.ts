import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Route = inject(Router);
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      _Route.navigate(['/login']);
      return false;
    }
  } else {
    return true;
  }
};
