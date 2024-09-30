import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ContractListDirective } from '../../../directive/contract-list.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-invited-contract-list',
  standalone: true,
  imports: [ButtonModule,
    TableModule,
    TagModule,
    NgIf,
    TranslateModule
  ],
  templateUrl: './invited-contract-list.component.html',
  styleUrl: './invited-contract-list.component.scss'
})
export class InvitedContractListComponent extends ContractListDirective {

}
