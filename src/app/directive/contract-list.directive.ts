import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';
import { ContractUtilsService } from '../service/contract-utils.service';

@Directive({
  selector: '[ContractListDirective]'
})
export class ContractListDirective {
  @Input() contracts: any[] = []
  @Input() serverLoading = false
  @Output() contractRejected = new EventEmitter()

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private contractService: ContractUtilsService,
    private router: Router
  ) { }

  signContract(contractId: number): void {
    console.log("click");

    this.router.navigate([`/protected/contract-signing`, contractId])
  }

  downloadContract(contractId: number) {
    this.contractService.downloadContract(contractId)
  }

  downloadSignedContract(contractId: number): void {
    this.contractService.downloadSignedContract(contractId)
  }

  downloadSignature(contractId: number): void {
    this.contractService.downloadSignature(contractId)
  }

  rejectContract(contractId: number): void {
    this.apiService.rejectContract(contractId).subscribe({
      next: () => {
        this.contractRejected.emit()
      },
      error: () => {
        this.toastService.error('Error al rechazar el contrato')
      }
    });
  }
}
