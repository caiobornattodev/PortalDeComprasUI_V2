import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { NgIf } from '@angular/common';
import { UserRegister } from '../../models/userRegister';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from '../../services/portal.service';
import { Requester } from '../../models/requester';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RequestersModalComponent } from '../modals/requesters-modal/requesters-modal.component';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  accountService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);
  modalService = inject(BsModalService)
  portalService = inject(PortalService);

  registerForm: FormGroup = new FormGroup({});
  typeOptions = [
    { key: 'Comprador', value: 0 },
    { key: 'Aprovador', value: 1 },
    { key: 'Ambos', value: 2 },
  ];
  requesters: Requester[] = [];
  bsModalRef: BsModalRef<RequestersModalComponent> = new BsModalRef<RequestersModalComponent>();

  //Vai ficar com dados fixos por enquanto
  companies = [
    { companyId: 1, companyName: 'Acme Inc.' },
    { companyId: 2, companyName: 'Luthor Corp' }
  ]

  showPassword = false;
  showConfirmPassword = false;
  showSapPasword = false;

  ngOnInit(): void {
    this.initializeForm();
    this.getRequesters();
  }

  //TODO: sapUser e sapPassword obrigatórios qnd não for comprador
  //TODO : Arrumar validações

  initializeForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required,this.machValues('password')]),
      sapUser: new FormControl(''),
      sapPassword: new FormControl(''),
      companyId: new FormControl(1),
      employeeName: new FormControl('', Validators.required),
      employeeId: new FormControl(0, Validators.required),
      userType: new FormControl(0),
    });
    
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  getRequesters() {
    this.portalService.getRequesters().subscribe({
      next: (colaborators) => {
        this.requesters = colaborators
      },
      error: error => this.toastr.error(error)
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
    this.bsModalRef = this.modalService.show(RequestersModalComponent, initialState);

    this.bsModalRef.onHide?.subscribe({
      next: () => this.setSelectedRequester(this.bsModalRef)
    })
  }

  setSelectedRequester(bsModalRef: BsModalRef<RequestersModalComponent>) {
    if (bsModalRef.content && bsModalRef.content.selectedRequester) {
      const selectedRequester = bsModalRef.content.selectedRequester;
      this.registerForm.controls['employeeId'].setValue(Number(selectedRequester.empId));
      this.registerForm.controls['employeeName'].setValue(`${selectedRequester.firstName} ${selectedRequester.lastName}`);
    }
  }

  machValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  register() {
    const userRegister = this.registerForm.value as UserRegister;
    console.log(userRegister);
    this.accountService.register(userRegister).subscribe({
      next: _ => {
        this.router.navigateByUrl('/purchaseRequests');
      },
      error: error => {
        this.toastr.error(error);
      }
    });
  }

  toggleShowPassord(passwordComponent: string) {
    switch (passwordComponent) {
      case 'password':
        this.showPassword = !this.showPassword;
        break;

      case 'confirmPassword':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;

      case 'sapPassword':
        this.showSapPasword = !this.showSapPasword;
        break;
    }
  }

  isComprador(): boolean {
    let isComprador = this.registerForm.controls['userType'].value == 0;

    return isComprador
  }
}