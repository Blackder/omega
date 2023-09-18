import { TestBed } from '@angular/core/testing';

import { ComponentPropertyService } from '../component-generation-tab/component-property.service';

describe('ComponentPropertyService', () => {
  let service: ComponentPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
