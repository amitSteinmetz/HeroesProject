import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users-service/users.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

export const heroesGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  return usersService.loggedUserObs.pipe(
    take(1),
    map((loggedUser) => {
      if (usersService.isValidLoggedIn(loggedUser))
        router.navigate(['/home']);

      return true;
    })
  );
};


