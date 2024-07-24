import { TestBed } from '@angular/core/testing';

import { AlgafoodApiService } from './algafood-api.service';

describe('AlgafoodApiService', () => {
  let service: AlgafoodApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgafoodApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
