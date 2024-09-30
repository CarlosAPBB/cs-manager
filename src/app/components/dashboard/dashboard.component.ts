import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ToastService } from '../../service/toast.service';
import { ContractListComponent } from "../contract/contract-list/contract-list.component";
import { DividerModule } from 'primeng/divider';
import { InvitedContractListComponent } from '../contract/invited-contract-list/invited-contract-list.component';
import { GlobalService } from '../../service/global.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    TagModule,
    ContractListComponent,
    InvitedContractListComponent,
    DividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  contracts: any[] = [];
  invitedContracts: any[] = [];
  serverLoading = false

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.loadContracts();
  }

  loadContracts(): void {
    this.serverLoading = true
    this.globalService.setLoadingState(true)

    this.apiService.getContracts().subscribe(
      {
        next: (res: any) => this.handleLoadSuccess(res),
        error: (err: HttpErrorResponse) => this.handleLoadError(err),
        complete: () => this.handleLoadComplete()
      }
    );
  }

  handleLoadSuccess(res: any) {
    this.contracts = res.sentContracts;
    this.invitedContracts = res.invitedContracts;
  }

  handleLoadError(err: HttpErrorResponse) {
    this.globalService.setLoadingState(false)
    this.toastService.error()
    console.error('Error al cargar contratos', err);
  }

  handleLoadComplete() {
    this.globalService.setLoadingState(false)
    this.serverLoading = false
  }
}
