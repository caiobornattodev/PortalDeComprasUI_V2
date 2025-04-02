import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { UserLogin } from '../../models/userLogin';
import { Router, RouterLink } from '@angular/router';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  accountService = inject(AccountService);
  toastr = inject(ToastrService);
  router = inject(Router)
  userLogin : UserLogin = {username : '', password: ''};
  showPassword = false;

  login() {
    this.accountService.login(this.userLogin).subscribe({
      next: _ => {
        this.router.navigateByUrl('/documents/purchaseRequests');
      },
      error: error => this.toastr.error(error.error)
    });
  }

  toggleShowPassord(){
     this.showPassword = !this.showPassword;
  }

  logout(){
    this.accountService.logout()
  }
}
