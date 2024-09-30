import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private _user: any = null

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  initial(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (!this.authService.isLoggedIn) {
        resolve(true)
      } else {
        this.reload().then((res) => {
          resolve(res)
        });
      }
    })
  }

  reload(): Promise<boolean> {
    return new Promise(async (resolve) => {
      this.apiService.initial().subscribe({
        next: (res) => {
          this.user = res.user
          resolve(true)
        },
        error: () => {
          this.authService.clearToken()
          resolve(true)
        },
        complete: () => {
          resolve(true)
        }
      })
    })
  }

  set user(data: any) {
    this._user = data
  }

  get user() {
    return this._user
  }
}
