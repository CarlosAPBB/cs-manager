import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../../../service/global.service';
import { passwordMatchValidator } from '../../../utils/validators';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
    TranslateModule,
    NgClass
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: ['', Validators.required],
      },
      { validators: [passwordMatchValidator] }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.globalService.setLoadingState(true)

      const {
        name,
        email,
        password,
        passwordConfirmation
      } = this.form.value;

      this.authService.register(
        name,
        email,
        password,
        passwordConfirmation
      ).subscribe({
        next: () => this.handleSignInSuccess(),
        error: (err: HttpErrorResponse) => this.handleSignInError(err),
        complete: () => this.handleSignInComplete()
      });
    }
  }

  handleSignInSuccess() {
    this.router.navigate(['/login']);
  }

  handleSignInError(err: HttpErrorResponse) {

    if ('email' in err.error.errors) {
      this.toastService.error("El email que ha ingresado ya se encuentra en uso", "bc")
    } else {
      this.toastService.error()
    }

    this.globalService.setLoadingState(false);
  }

  handleSignInComplete() {
    this.globalService.setLoadingState(false)
  }
}
