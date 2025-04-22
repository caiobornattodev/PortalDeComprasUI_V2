import { Component, inject, OnInit } from '@angular/core';
import { PortalService } from '../../../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Requester } from '../../../models/requester';
import { RequestersModalComponent } from '../../modals/requesters-modal/requesters-modal.component';
import { HelperService } from '../../../services/helper.service';
import { Departament } from '../../../models/department';
import { BusinessPlace } from '../../../models/businessPlace';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DocumentLine } from '../../../models/documentLine';
import { SapDocument } from '../../../models/document';
import { ItemsModalComponent } from '../../modals/items-modal/items-modal.component';
import { Item } from '../../../models/item';
import { CostCenter } from '../../../models/costCenter';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-create-purchase-request',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BsDatepickerModule,
    NgIf
  ],
  templateUrl: './create-purchase-request.component.html',
  styleUrl: './create-purchase-request.component.css'
})
export class CreatePurchaseRequestComponent implements OnInit {

  portalService = inject(PortalService)
  toastr = inject(ToastrService)
  modalService = inject(BsModalService)
  helperService = inject(HelperService);

  private currentDate = new Date()
  docTypes = [
    {key : 'Item' , value : 0},
    {key : 'Serviço' , value : 1}
  ]

  form: FormGroup = new FormGroup({});
  requestersModal: BsModalRef<RequestersModalComponent> = new BsModalRef<RequestersModalComponent>();
  itemsModal: BsModalRef<ItemsModalComponent> = new BsModalRef<ItemsModalComponent>();
  requesters: Requester[] = [];
  items: Item[] = [];
  departments: Departament[] = [];
  businessPlaces: BusinessPlace[] = [];
  costCenters: CostCenter[] = [];
  projects: Project[] = [];
  documentLines : DocumentLine[] = [];

  ngOnInit(): void {
    this.helperService.headertTitle = 'Nova soliçitação de compra';
    this.getRequesters();
    this.initializeForm();
    this.getItems();
    this.getDataForComboBoxes();
  }

  initializeForm() {
    this.form = new FormGroup({
      reqName: new FormControl(''),
      requester : new FormControl(''),
      email : new FormControl(''),
      branch: new FormControl(''),
      department: new FormControl(''),
      docType: new FormControl('0'),
      coments: new FormControl(''),
      docDate: new FormControl(this.currentDate),
      docDueDate: new FormControl(this.currentDate),
      taxDate: new FormControl(this.currentDate),
      reqDate: new FormControl(this.currentDate),
      documentLines: new FormControl([] as Array<DocumentLine>)
    });
  }

  getRequesters() {
    this.portalService.getRequesters().subscribe({
      next: (colaborators) => {
        this.requesters = colaborators
      },
      error: _ => this.toastr.error('Não foi possivel buscar os solicitantes')
    })
  }

  getItems(){
    this.portalService.getItems().subscribe({
      next : items => this.items = items,
      error: _ => this.toastr.error('Não foi possivel')
    })
  }

  openRequesterModal() {
    const initialState: ModalOptions = {
      class: 'modal-xl',
      initialState: {
        requesters: this.requesters,
        selectedRequester: null
      }
    }
    this.requestersModal = this.modalService.show(RequestersModalComponent, initialState);

    this.requestersModal.onHide?.subscribe({
      next: () => this.setSelectedRequester(this.requestersModal)
    })
  }

  openItemsModal(){
    const initialState: ModalOptions = {
      class: 'modal-xl',
      initialState: {
        items: this.items,
        filteredItems: this.items
      }
    }

    this.itemsModal = this.modalService.show(ItemsModalComponent,initialState)

    this.itemsModal.content?.onItemsSelected.subscribe((selectedItems: Item[]) => {
      this.addItemsToDocumentLines(selectedItems);
    });
  }

  addItemsToDocumentLines(selectedItems: Item[]) {
    selectedItems.forEach(item => {
      this.documentLines.push({
        itemCode: item.itemCode,
        itemName: item.itemName,
        reqDate : this.currentDate,
        quantity: 1, // Default quantity
        price: 0 
      } as DocumentLine);
    });
  }

  addDocumentLine(){
    this.documentLines.unshift({
      itemName : '', 
      reqDate: this.currentDate
    } as DocumentLine);
  }

  wipeDocumentLines(){
    if(this.documentLines.length > 0){
      this.documentLines = [];
    }
  }

  setSelectedRequester(bsModalRef: BsModalRef<RequestersModalComponent>) {
    if (bsModalRef.content && bsModalRef.content.selectedRequester) {
      const selectedRequester = bsModalRef.content.selectedRequester;
      this.form.controls['reqName'].setValue(`${selectedRequester.firstName} ${selectedRequester.lastName}`);
      this.form.controls['requester'].setValue(selectedRequester.empId);   
    }    
  }

  getDataForComboBoxes() {
    
    //Busca as filiais
    this.portalService.getBusinessPlaces().subscribe({
      next: businessPlaces => { 
        this.businessPlaces = businessPlaces
        this.form.controls['branch'].patchValue(this.businessPlaces[0].bplId) 
      },
      error: _ => this.toastr.error('Não foi possivel buscar as filiais')
    });

    //Busca os departamentos
    this.portalService.getDepartments().subscribe({
      next: departments => {
        this.departments = departments
        this.form.controls['department'].patchValue(this.departments[0].code) 
      },
      error: _ => this.toastr.error('Não foi possivel buscar os departamentos')
    });

    //Busca os centros de custo
    this.portalService.getCostCenters().subscribe({
      next: costCenters => this.costCenters = costCenters,
      error: _ => this.toastr.error('Não foi possivel buscar os centros de custo')
    });

    //Busca os projetos
    this.portalService.getProjects().subscribe({
      next: projects => this.projects = projects,
      error: _ => this.toastr.error('Não foi possivel buscar os projetos')
    });

    //Busca fornecedores
   

  }

  createPurchaseRequest() {
    let document : SapDocument = this.form.value as SapDocument;
    console.log(document)
  }



  removeDocumentLine(index : number){
    this.documentLines.splice(index,1)
  }

  isItem() : boolean {
    return this.form.controls['docType'].value === '0';
  }
}