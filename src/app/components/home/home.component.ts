import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppConfigService } from '../../service/app-config.service';
import { NgIf } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    ScrollPanelModule,
    RouterModule,
    NgIf,
    DashboardComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('dashboard') dashboard!: DashboardComponent

  constructor(
    public appConfigService: AppConfigService
  ) { }

  refreshDashboard() {
    this.dashboard.loadContracts()
  }
}
