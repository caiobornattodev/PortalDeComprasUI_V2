import { Component, inject, OnInit } from '@angular/core';
import { PortalService } from '../../../services/portal.service';
import { ToastrService } from 'ngx-toastr';
import { SapDocument } from '../../../models/document';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HelperService } from '../../../services/helper.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-document-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './document-details.component.html',
  styleUrl: './document-details.component.css'
})
export class DocumentDetailsComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }

  //Services
  portalService = inject(PortalService);
  toastr = inject(ToastrService);
  helperService = inject(HelperService);
  router = inject(Router)

  //Properties
  document: SapDocument = {} as SapDocument;
  documentType = '';
  docEntry = 0;

  //Methods
  ngOnInit(): void {
    this.documentType = this.route.snapshot.paramMap.get('documentType') ?? '';
    this.docEntry = Number(this.route.snapshot.paramMap.get('docEntry'))
    this.helperService.headertTitle = `Detalhes do documento N°${this.docEntry}`
    this.getDocument();
  }

  getDocument(){
    switch(this.documentType){
      case 'purchaseRequests':
        this.portalService.getPurchaseRequestByDocEntry(this.docEntry).subscribe({
          next: document => this.document = document,
          error: _ => this.toastr.error('Não foi possivel buscar o documento')
        });
        break;

      case 'purchaseOrders':
        this.portalService.getPurchaseOrderByDocEntry(this.docEntry).subscribe({
          next: document => this.document = document,
          error: _ => this.toastr.error('Não foi possivel buscar o documento')
        });
        break;
    }
  }

  cancelDocument(){
    this.portalService.cancelDocument(this.document).subscribe({
      next: _ => {
        this.toastr.success('Documento cancelado com successo!')
        this.router.navigateByUrl('/documents/' + this.documentType)
      },
      error: _ => this.toastr.error('Falha ao tentar cancelar o documento')
    })
  }
}