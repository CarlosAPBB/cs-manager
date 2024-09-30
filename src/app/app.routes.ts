import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { UploadContractComponent } from './components/contract/upload-contract/upload-contract.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { SignContractComponent } from './components/contract/sign-contract/sign-contract.component';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: SigninComponent
  },
  {
    path: "protected",
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "contract-form",
        component: UploadContractComponent
      },
      {
        path: "contract-signing/:id",
        component: SignContractComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "protected" }
];
