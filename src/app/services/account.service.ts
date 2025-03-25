import { Injectable , inject, signal} from '@angular/core';
import { User } from '../models/user';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/ennvironment';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  router = inject(Router)
  baseUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);


  login(userLogin : UserLogin){
    return this.http.post<User>(this.baseUrl + 'Account/login', userLogin).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(userRegister : UserRegister){
    return this.http.post<User>(this.baseUrl + 'account/Register', userRegister).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUser.set(user);
  }
}
