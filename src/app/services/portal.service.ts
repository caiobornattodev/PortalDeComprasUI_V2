import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/ennvironment';
import { HttpClient } from '@angular/common/http';
import { Requester } from '../models/requester';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getPurchaseRequests(){
    return this.http.get<Document[]>(this.baseUrl + 'PurchaseRequests/GetAll')
  }

  getRequesters() {
    return this.http.get<Requester[]>(this.baseUrl + 'SapUser/GetAllColaboradores');
  }

  getCompanies() {
    //TODO : tornar companies[] dinamico quando endpoint estiver disponivel
  }
}
