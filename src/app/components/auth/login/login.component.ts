import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../../service/global.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AppConfigService } from '../../../service/app-config.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private appConfigService: AppConfigService,
    private toastService: ToastService
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    this.globalService.setLoadingState(true)

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: (response) => this.onLoginSuccess(response),
      error: (err: HttpErrorResponse) => this.onLoginError(err),
      complete: () => this.onLoginComplete()
    });
  }

  onLoginSuccess(response: any) {
    this.appConfigService.user = response.user;
    this.authService.saveToken(response.token);
    this.router.navigate(['/protected']);
  }

  onLoginError(err: HttpErrorResponse) {
    const errors: any = {
      invalid_credentials: "Usuario o contraseña incorrectos"
    }

    let error = errors[err.error.error]

    if (!error) {
      this.toastService.error()
    } else {
      this.toastService.error(error, "bc")
    }

    this.globalService.setLoadingState(false);
  }

  onLoginComplete() {
    this.globalService.setLoadingState(false)
  }
}
