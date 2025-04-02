import { Component, inject, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  helperService = inject(HelperService)
  
  ngOnInit(): void {
     this.helperService.headertTitle = 'Portal de compras'
  }

}
