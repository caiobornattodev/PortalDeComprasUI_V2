import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

export const alereadyLogedGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);  

  if (accountService.currentUser()) {
    toastrService.warning('Você já esta logado!')
    return false;
  } else {
    return true;
  }
};
