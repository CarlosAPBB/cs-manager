import { TableModule } from 'primeng/table';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ContractListDirective } from '../../../directive/contract-list.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    TagModule,
    NgIf,
    TranslateModule
  ],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss'
})
export class ContractListComponent extends ContractListDirective {
}
