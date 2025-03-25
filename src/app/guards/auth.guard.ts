import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);  
  const router = inject(Router);

  if (accountService.currentUser()) {
    return true;
  } else {
    toastrService.error('Você deve estar logado para acessar essa pagina!')
    router.navigateByUrl('/login');
    return false;
  }
};
