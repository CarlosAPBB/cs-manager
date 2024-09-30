import { TestBed } from '@angular/core/testing';

import { ContractUtilsService } from './contract-utils.service';

describe('ContractUtilsService', () => {
  let service: ContractUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
