import { TestBed } from '@angular/core/testing';

import { ScanServicesService } from './scan-services.service';

describe('ScanServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanServicesService = TestBed.get(ScanServicesService);
    expect(service).toBeTruthy();
  });
});
