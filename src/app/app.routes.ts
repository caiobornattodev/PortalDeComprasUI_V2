import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PurchaseRequestsComponent } from './components/purchase-requests/purchase-requests.component';
import { authGuard } from './guards/auth.guard';
import { alereadyLogedGuard } from './guards/aleready-loged.guard';


export const routes: Routes = [
    {path : '' , component : HomeComponent, canActivate : [authGuard]},
    {path : 'login', component: LoginComponent, canActivate: [alereadyLogedGuard]},
    {path : 'register', component: RegisterComponent},
    {path : 'purchaseRequests', component: PurchaseRequestsComponent, canActivate: [authGuard]},
];
