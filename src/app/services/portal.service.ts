import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/ennvironment';
import { HttpClient } from '@angular/common/http';
import { Requester } from '../models/requester';
import { SapDocument } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getPurchaseRequests(startDate : string, endDate: string){
    return this.http.get<SapDocument[]>(this.baseUrl + `PurchaseRequests/GetAll?startDate=${startDate}&endDate=${endDate}`)
  }

  getPurchaseOrders(startDate : string, endDate: string){
    return this.http.get<SapDocument[]>(this.baseUrl + `PurchaseOrders/GetAll?startDate=${startDate}&endDate=${endDate}`)
  }

  getPurchaseRequestByDocEntry(docEntry : number){
    return this.http.get<SapDocument>(this.baseUrl + `PurchaseRequests/Get/${docEntry}`);
  }

  getPurchaseOrderByDocEntry(docEntry : number){
    return this.http.get<SapDocument>(this.baseUrl + `PurchaseOrders/Get/${docEntry}`);
  }

  getRequesters() {
    return this.http.get<Requester[]>(this.baseUrl + 'SapUser/GetAllColaboradores');
  }

  cancelDocument(document : SapDocument){
    return this.http.post(this.baseUrl + 'PurchaseRequests/Cancel', document);
  }

  getCompanies() {
    //TODO : tornar companies[] dinamico quando endpoint estiver disponivel
  }
}
