import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';
import { FileUtils } from '../utils/file-utils';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ContractUtilsService {

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private globalService: GlobalService
  ) { }

  downloadContract(contractId: number) {
    this.globalService.setLoadingState(true)
    this.apiService.downloadContract(contractId).subscribe({
      next: (data) => {
        FileUtils.openFromBlobPDF(data, `contract_${contractId}.pdf`)
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error('Error al descargar el contrato')
        this.globalService.setLoadingState(false)
      },
      complete: () => {
        this.globalService.setLoadingState(false)
      }
    });
  }

  downloadSignedContract(contractId: number) {
    this.globalService.setLoadingState(true)
    this.apiService.downloadSignedContract(contractId).subscribe({
      next: (data) => {
        FileUtils.openFromBlobPDF(data, `signed_contract_${contractId}.pdf`)
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error('Error al descargar el contrato')
        this.globalService.setLoadingState(false)
      },
      complete: () => {
        this.globalService.setLoadingState(false)
      }
    });
  }

  downloadSignature(contractId: number) {
    this.globalService.setLoadingState(true)
    this.apiService.downloadContractSignature(contractId).subscribe({
      next: (data) => {
        FileUtils.openFromBlob(data, `signature_${contractId}.png`)
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error('Error al descargar el contrato')
        this.globalService.setLoadingState(false)
      },
      complete: () => {
        this.globalService.setLoadingState(false)
      }
    });
  }
}
