import { TestBed } from '@angular/core/testing';

import { FrameworkProviderService } from './framework-provider.service';

describe('FrameworkProviderService', () => {
  let service: FrameworkProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameworkProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
