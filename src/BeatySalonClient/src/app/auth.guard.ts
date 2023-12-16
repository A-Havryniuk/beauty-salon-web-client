import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  var token = localStorage.getItem('authToken');
  if (token) {
    return true;
  } else
    return false;
};
