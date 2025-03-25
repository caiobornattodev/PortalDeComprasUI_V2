import { Component, EventEmitter, inject, OnInit, output } from '@angular/core';
import { Requester } from '../../../models/requester';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-requesters-modal',
  imports: [],
  templateUrl: './requesters-modal.component.html',
  styleUrl: './requesters-modal.component.css'
})
export class RequestersModalComponent  {


  bsModalRef = inject(BsModalRef);
  requesters : Requester[] = [];
  selectedRequester: Requester | null = null;

  onSelectRequester(requester: Requester){
    this.selectedRequester = requester;
    this.bsModalRef.hide();
  }
}
