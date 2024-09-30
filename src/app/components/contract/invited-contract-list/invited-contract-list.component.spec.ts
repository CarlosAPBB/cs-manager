import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedContractListComponent } from './invited-contract-list.component';

describe('InvitedContractListComponent', () => {
  let component: InvitedContractListComponent;
  let fixture: ComponentFixture<InvitedContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitedContractListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitedContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
