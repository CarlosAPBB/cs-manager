import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { GlobalService } from '../../../service/global.service';
import { ToastService } from '../../../service/toast.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CardModule } from 'primeng/card';
import { ContractUtilsService } from '../../../service/contract-utils.service';
import { TranslateModule } from '@ngx-translate/core';
import { DrawingCanvasComponent } from "../../shared/drawing-canvas/drawing-canvas.component";

@Component({
  selector: 'app-sign-contract',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ScrollPanelModule,
    ReactiveFormsModule,
    CardModule,
    NgFor,
    NgIf,
    TranslateModule,
    DrawingCanvasComponent
  ],
  templateUrl: './sign-contract.component.html',
  styleUrl: './sign-contract.component.scss'
})
export class SignContractComponent implements OnInit {
  signForm: FormGroup;
  contractId = 0;
  contract: any;
  dynamicFields: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private globalService: GlobalService,
    private contractService: ContractUtilsService,
    private router: Router
  ) {
    this.signForm = this.fb.group({
      dynamicFields: this.fb.group([]),
      signature: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.paramMap.get('id')!;
    this.getContractDetails();
  }

  getContractDetails() {
    this.globalService.setLoadingState(true)

    this.apiService.getContractForSigning(this.contractId).subscribe({
      next: (res: any) => {
        this.contract = res.contract;
        this.dynamicFields = JSON.parse(this.contract.dynamic_fields);
        this.addDynamicFields();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error()
        this.globalService.setLoadingState(false)
      },
      complete: () => {
        this.globalService.setLoadingState(false)
      }
    });
  }

  addDynamicFields() {
    this.dynamicFields.forEach(field => {
      (this.signForm.get("dynamicFields") as FormGroup)
        .addControl(field.label, this.fb.control('', Validators.required));
    });
  }

  saveSignature(base64: string) {
    this.signForm.patchValue({
      signature: base64
    })
  }

  clearSignature() {
    this.signForm.patchValue({
      signature: null
    })
  }

  downloadContract() {
    this.contractService.downloadContract(this.contractId)
  }

  onSubmit() {
    if (this.signForm.valid) {
      this.globalService.setLoadingState(true)

      const formData = {
        dynamic_fields: JSON.stringify(this.signForm.get("dynamicFields")?.value),
        signature: this.signForm.get("signature")?.value,
        contract_id: this.contractId
      };

      this.apiService.signContract(this.contractId, formData).subscribe({
        next: (res: any) => {
          this.toastService.success('Contrato firmado exitosamente', 'tr')
          this.router.navigate(['/protected'])
          console.log('Contrato firmado exitosamente:', res);
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.error()
          this.globalService.setLoadingState(false)
        },
        complete: () => {
          this.globalService.setLoadingState(false)
        }
      });
    }
  }
}
