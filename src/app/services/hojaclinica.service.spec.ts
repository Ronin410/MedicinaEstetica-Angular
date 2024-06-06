import { TestBed } from '@angular/core/testing';

import { HojaclinicaService } from './hojaclinica.service';

describe('HojaclinicaService', () => {
  let service: HojaclinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HojaclinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
