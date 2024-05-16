import { TestBed } from '@angular/core/testing';

import { ColorStateServiceService } from './color-state-service.service';

describe('ColorStateServiceService', () => {
  let service: ColorStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
