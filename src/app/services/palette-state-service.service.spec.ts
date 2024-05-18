import { TestBed } from '@angular/core/testing';

import { PaletteStateServiceService } from './palette-state-service.service';

describe('PaletteStateServiceService', () => {
  let service: PaletteStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletteStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
