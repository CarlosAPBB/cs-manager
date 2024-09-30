import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../../service/api.service';
import { ToastService } from '../../../service/toast.service';
import { Router } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from '../../../service/global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-contract',
  standalone: true,
  imports: [
    FileUploadModule,
    ReactiveFormsModule,
    InputTextModule,
    NgIf,
    NgFor,
    NgClass,
    ScrollPanelModule,
    TranslateModule
  ],
  templateUrl: './upload-contract.component.html',
  styleUrl: './upload-contract.component.scss'
})
export class UploadContractComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      file: [null, Validators.required],
      dynamicFields: this.fb.array([]),
    });
  }

  get dynamicFields(): FormArray {
    return this.form.get('dynamicFields') as FormArray;
  }

  addDynamicField(): void {
    const field = this.fb.group({ label: ['', Validators.required] });
    this.dynamicFields.push(field);
  }

  removeDynamicField(index: number): void {
    this.dynamicFields.removeAt(index);
  }

  onFileChange(event: any): void {
    const file = event.currentFiles[0];

    this.form.patchValue({ file: file });
  }

  clearFile() {
    this.form.patchValue({ file: null });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.globalService.setLoadingState(true)

      const formData = new FormData();
      formData.append('email', this.form.get('email')?.value);
      formData.append('name', this.form.get('name')?.value);
      formData.append('file', this.form.get('file')?.value);
      formData.append('dynamic_fields', JSON.stringify(this.form.get('dynamicFields')?.value));

      this.apiService.uploadContract(formData).subscribe({
        next: () => this.handleUploadSuccess(),
        error: (err: HttpErrorResponse) => this.handleUploadError(err),
        complete: () => this.handleUploadComplete()
      });
    }
  }

  handleUploadSuccess() {
    this.toastService.success("Contrato subido exitosamente.", "tr");
    this.router.navigate(['/protected']);
  }

  handleUploadError(err: HttpErrorResponse) {
    this.globalService.setLoadingState(false)

    const errors: any = {
      invited_user_not_found: "Usuario no encontrado",
      cant_invite_yourself: "No puedes invitarte a ti mismo"
    }

    let error = errors[err.error.error]

    if (!error) {
      this.toastService.error()
    } else {
      this.toastService.error(error, "tr")
    }
  }

  handleUploadComplete() {
    this.globalService.setLoadingState(false)
  }
}
