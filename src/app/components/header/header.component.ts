import { Component, input, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  accountService = inject(AccountService);
  router = inject(Router)

  logOut(){
    this.accountService.logout()
    this.router.navigateByUrl('login')
  }
}
