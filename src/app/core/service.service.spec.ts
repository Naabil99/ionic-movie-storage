import { TestBed } from '@angular/core/testing';

import { entrenamientodbserviceService } from  './entrenamientobservice.service'

describe('entrenamientodbserviceService', () => {
  let service: entrenamientodbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(entrenamientodbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
