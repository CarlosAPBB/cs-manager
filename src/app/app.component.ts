import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf, UpperCasePipe } from '@angular/common';
import { GlobalService } from './service/global.service';
import { TranslationService } from './service/translation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ThemeService } from './service/theme.service';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from './service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConfigService } from './service/app-config.service';
import { ToastService } from './service/toast.service';
import { ContractUtilsService } from './service/contract-utils.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ToolbarModule,
    ProgressBarModule,
    ToastModule,
    NgIf,
    UpperCasePipe,
    ButtonModule,
    ScrollPanelModule,
    DropdownModule
  ],
  providers: [
    MessageService,
    ToastService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  user: any

  title = 'cs-manager';

  loading = false;

  lang = this.translationService.defaultLang;
  langsList: string[] = ['es', 'en'];

  isDarkMode: boolean = false;

  constructor(
    public globalService: GlobalService,
    public appConfigService: AppConfigService,
    public authService: AuthService,
    private translationService: TranslationService,
    private themeService: ThemeService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.globalService.loading$.subscribe((state) => {
      this.loading = state;
    });

    this.isDarkMode = this.themeService.isDarkMode();
  }

  changeLang(lang: string) {
    this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    this.translationService.changeLang(lang);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.switchTheme(this.isDarkMode)
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearToken()
        this.router.navigate(['/login'])
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}
