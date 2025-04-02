import { Component, OnInit, inject } from '@angular/core';
import { PortalService } from '../../../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { SapDocument } from '../../../models/document';
import { HelperService } from '../../../services/helper.service';
import { CommonModule, NgSwitch } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-documents',
  imports: [
    CommonModule,
    NgSwitch,
    BsDropdownModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    RouterLink
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  //Services
  portalService = inject(PortalService)
  toastr = inject(ToastrService);
  helperService = inject(HelperService);

  //Properties
  filterForm: FormGroup = new FormGroup({});
  documents: SapDocument[] = [];
  documentsFiltered: SapDocument[] = [];
  private currentDate = new Date()
  documentType = '';

  boStatus = [
    { label: 'Aberto', value: 'O' },
    { label: 'Fechado', value: 'C' },
    { label: 'Em Aprovção', value: 'W' },
    { label: 'Reprovado', value: 'N' },
  ]

  //Methods
  ngOnInit(): void {

    this.documentType = this.route.snapshot.url[1].path;

    this.helperService.headertTitle =
      this.documentType == 'purchaseRequests' ?
        'Solicitções de Compra' :
        'Pedidos de Compra'

    this.initializeForm();
    this.getDocuments(this.documentType);
  }

  initializeForm() {
    const dateMinus7Days = new Date(this.currentDate);
    dateMinus7Days.setDate(this.currentDate.getDate() - 7);

    this.filterForm = new FormGroup({
      globalFilter: new FormControl(''),
      searchStartDate: new FormControl(dateMinus7Days),
      searchEndDate: new FormControl(this.currentDate),
      statuses: new FormControl(['O', 'C', 'W', 'N'])
    });
  }

  searchBar(event: any) {
    let searchValue = String(event.target.value).trim();

    this.documentsFiltered = this.documents;

    this.documentsFiltered = this.documentsFiltered
      .filter(request => request.docNum.includes(searchValue) ||
        request.comments.includes(searchValue) ||
        request.docTotal.toString().includes(searchValue));
  }

  statusFilter() {
    const selectedStatuses: string[] = this.filterForm.value.statuses;

    if (selectedStatuses.length === 0) {
      this.documentsFiltered = this.documents;
      return;
    }

    this.documentsFiltered = this.documents.filter(document =>
      selectedStatuses.includes(document.docStatus)
    );
  }

  onStatusChange(event: any) {
    const selectedStatuses: string[] = this.filterForm.value.statuses;
    const status = event.target.value;

    if (event.target.checked) {
      // Add the status to the array
      selectedStatuses.push(status);
    } else {
      // Remove the status from the array
      const index = selectedStatuses.indexOf(status);
      if (index > -1) {
        selectedStatuses.splice(index, 1);
      }
    }

    // Update the FormControl value
    this.filterForm.controls['statuses'].setValue(selectedStatuses);

    // Apply the filter
    this.statusFilter();
  }

  getDocuments(documentType: string) {
    let dateStart = this.helperService.formatDateToISO(this.filterForm.value.searchStartDate);
    let dateEnd = this.helperService.formatDateToISO(this.filterForm.value.searchEndDate);

    switch (documentType) {
      case 'purchaseRequests':
        this.portalService.getPurchaseRequests(dateStart, dateEnd).subscribe({
          next: purchaseRequests => {
            this.documents = purchaseRequests
            this.documentsFiltered = purchaseRequests
          },
          error: _ => this.toastr.error('Não foi possivel buscar as solicitções')
        });
        break;

      case 'purchaseOrders':
        this.portalService.getPurchaseOrders(dateStart, dateEnd).subscribe({
          next: purchaseOrders => {
            this.documents = purchaseOrders
            this.documentsFiltered = purchaseOrders
          },
          error: _ => this.toastr.error('Não foi possivel buscar pedidos')
        });
        break;
    }
  }
}