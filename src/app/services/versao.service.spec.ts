import { TestBed } from '@angular/core/testing';

import { VersaoService } from './versao.service';

describe('VersaoService', () => {
  let service: VersaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
