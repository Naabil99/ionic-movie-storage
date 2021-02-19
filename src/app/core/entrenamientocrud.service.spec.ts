import { TestBed } from '@angular/core/testing';

import { EntrenamientocrudService } from './entrenamientocrud.service';

describe('EntrenamientocrudService', () => {
  let service: EntrenamientocrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenamientocrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
