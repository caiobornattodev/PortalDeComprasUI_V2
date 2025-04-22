import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentsComponent } from './components/document/documents/documents.component';
import { authGuard } from './guards/auth.guard';
import { alereadyLogedGuard } from './guards/aleready-loged.guard';
import { CompaniesComponent } from './components/companies/companies.component';
import { DocumentDetailsComponent } from './components/document/document-details/document-details.component';
import { CreatePurchaseRequestComponent } from './components/document/create-purchase-request/create-purchase-request.component';
import { CreatePurchaseOrderComponent } from './components/document/create-purchase-order/create-purchase-order.component';

export const routes: Routes = [
    {path : '' , component : HomeComponent, canActivate : [authGuard]},
    {path : 'login', component: LoginComponent, canActivate: [alereadyLogedGuard]},
    {path : 'register', component: RegisterComponent},
    {path : 'documents/purchaseRequests', component: DocumentsComponent, canActivate: [authGuard]},
    {path : 'documents/purchaseOrders', component: DocumentsComponent, canActivate: [authGuard]},
    {path : 'document/details/:documentType/:docEntry',component: DocumentDetailsComponent, canActivate: [authGuard]},
    {path : 'document/createPurchaseRequest',component : CreatePurchaseRequestComponent, canActivate: [authGuard]},
    {path : 'document/createPurchaseOrder',component : CreatePurchaseOrderComponent, canActivate: [authGuard]},
    {path : 'companies', component: CompaniesComponent, canActivate: [authGuard] },
    {path : '**' , component: HomeComponent}
];
