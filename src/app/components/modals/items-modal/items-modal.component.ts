import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Item } from '../../../models/item';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-modal',
  imports: [],
  templateUrl: './items-modal.component.html',
  styleUrl: './items-modal.component.css'
})
export class ItemsModalComponent implements OnInit {

  @Output() onItemsSelected = new EventEmitter<Item[]>();

  modalService = inject(BsModalService)
  toastr = inject(ToastrService)

  items: Item[] = []
  filteredItems: Item[] = [];
  private selectedItems: Item[] = [];

  ngOnInit(): void {
    this.filteredItems = this.items
  }

  addSlectedItems() {
    if (this.selectedItems.length <= 0) {
      this.toastr.error('Nenhum item selecionado!');
      return;
    }

    this.onItemsSelected.emit(this.selectedItems); // Emit the selected items
    this.modalService.hide(); // Close the modal
  }

  selectDiselectItems(event: any, item: Item) {
    if (event.target.checked) {
      this.selectedItems.push(item);
    } else {
      let itemIndex = this.selectedItems.indexOf(item)
      this.selectedItems.splice(itemIndex, 1)
    }
  }

  search(event: any) {
    let searchValue = String(event.target.value).trim();

    if (searchValue == '') {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.filteredItems.filter(item => item.itemCode.includes(searchValue) ||
      item.itemName.toLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
