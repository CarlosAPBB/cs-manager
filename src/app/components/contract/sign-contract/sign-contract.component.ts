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
    TranslateModule
  ],
  templateUrl: './sign-contract.component.html',
  styleUrl: './sign-contract.component.scss'
})
export class SignContractComponent implements OnInit, AfterViewInit {
  signForm: FormGroup;
  contractId = 0;
  contract: any;
  dynamicFields: any[] = [];
  canvas: HTMLCanvasElement | null = null;

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

  ngAfterViewInit(): void {
    this.initializeCanvas();
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

  initializeCanvas() {
    this.canvas = document.getElementById('signatureCanvas') as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');

    let drawing = false;

    if (ctx) {
      this.canvas.addEventListener('mousedown', () => {
        if (!this.canvas) { return }

        drawing = true;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      });

      this.canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
      });

      this.canvas.addEventListener('mousemove', (event) => {
        if (!this.canvas) { return }

        if (drawing) {
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'black';
          ctx.lineTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(event.clientX - this.canvas.offsetLeft, event.clientY - this.canvas.offsetTop);
        }
      });
    }
  }

  saveSignature() {
    if (this.canvas) {
      this.signForm.patchValue({
        signature: this.canvas.toDataURL('image/png')
      })
    }
  }

  downloadContract() {
    this.contractService.downloadContract(this.contractId)
  }

  onSubmit() {
    if (this.signForm.valid) {
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
        }
      });
    }
  }
}
