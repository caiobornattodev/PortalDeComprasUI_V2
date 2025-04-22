import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/ennvironment';
import { HttpClient } from '@angular/common/http';
import { Requester } from '../models/requester';
import { SapDocument } from '../models/document';
import { BusinessPlace } from '../models/businessPlace';
import { Departament } from '../models/department';
import { Item } from '../models/item';
import { CostCenter } from '../models/costCenter';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getPurchaseRequests(startDate: string, endDate: string) {
    return this.http.get<SapDocument[]>(this.baseUrl + `PurchaseRequests/GetAll?startDate=${startDate}&endDate=${endDate}`);
  }

  getPurchaseOrders(startDate: string, endDate: string) {
    return this.http.get<SapDocument[]>(this.baseUrl + `PurchaseOrders/GetAll?startDate=${startDate}&endDate=${endDate}`);
  }

  getPurchaseRequestByDocEntry(docEntry: number) {
    return this.http.get<SapDocument>(this.baseUrl + `PurchaseRequests/Get/${docEntry}`);
  }

  getPurchaseOrderByDocEntry(docEntry: number) {
    return this.http.get<SapDocument>(this.baseUrl + `PurchaseOrders/Get/${docEntry}`);
  }

  //Solicitantes/Colaboradores
  getRequesters() {
    return this.http.get<Requester[]>(this.baseUrl + 'SapUser/GetAllColaboradores');
  }

  //Itens
  getItems() {
    return this.http.get<Item[]>(this.baseUrl + 'Itens/GetAll');
  }

  //Filiais
  getBusinessPlaces() {
    return this.http.get<BusinessPlace[]>(this.baseUrl + 'BusinessPlace/GetAll');
  }

  //Departamentos
  getDepartments() {
    return this.http.get<Departament[]>(this.baseUrl + 'Departament/GetAll');
  }

  //Fornecedores
  getBusinessPartners() {

  }

  //Centros de custo
  getCostCenters() {
    return this.http.get<CostCenter[]>(this.baseUrl + 'CostCenter/GetAll');
  }

  getProjects(){
    return this.http.get<Project[]>(this.baseUrl + 'Project/GetAll');
  }

  //Empresas
  getCompanies() {
    //TODO : tornar companies[] dinamico quando endpoint estiver disponivel
  }

  cancelDocument(document: SapDocument) {
    return this.http.post(this.baseUrl + 'PurchaseRequests/Cancel', document);
  }

  createPurchaseRequest(document: SapDocument) {
    return this.http.post(this.baseUrl + 'PurchaseRequests/Add', document)
  }

  createPurchaseOrder(document: SapDocument) {
    return this.http.post(this.baseUrl + 'PurchaseOrders/Add', document)
  }
}
