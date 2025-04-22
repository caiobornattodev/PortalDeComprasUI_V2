import { Component, inject, OnInit } from '@angular/core';
import { Requester } from '../../../models/requester';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-requesters-modal',
  imports: [],
  templateUrl: './requesters-modal.component.html',
  styleUrl: './requesters-modal.component.css'
})
export class RequestersModalComponent implements OnInit {


  bsModalRef = inject(BsModalRef);
  requesters: Requester[] = [];
  filteredRequesters: Requester[] = [];
  selectedRequester: Requester | null = null;

  ngOnInit() {
    this.filteredRequesters = this.requesters;
  }

  onSelectRequester(requester: Requester) {
    this.selectedRequester = requester;
    this.bsModalRef.hide();
  }

  search(event: any) {
    let searchValue = String(event.target.value).trim();

    if (searchValue == '') {
      this.filteredRequesters = this.requesters;
      return;
    }

    this.filteredRequesters = this.filteredRequesters.filter(requester =>
      requester.empId.includes(searchValue) ||
      requester.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      requester.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}

