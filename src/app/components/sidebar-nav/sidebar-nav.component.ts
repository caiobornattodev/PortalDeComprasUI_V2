import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css'
})
export class SidebarNavComponent {
  sidebarColapsed = true;
  
  menuItems = [
    { label: 'Empresas', icon : 'fa fa-building me-2' , navLink: 'companies' },
    { label: 'Pedidos de Compra', icon : 'fa-solid fa-file-invoice-dollar  me-2', navLink: 'purchaseRequests' },
    { label: 'Solicitações de Compra', icon : 'fa-solid fa-file-invoice-dollar me-2', navLink: 'purchaseOrders' },
    { label: 'Alçadas de aprovação', icon : 'fa fa-check me-2', navLink: '' },
  ]
    
  toggleColapse(){
    this.sidebarColapsed = !this.sidebarColapsed;
  }
}
