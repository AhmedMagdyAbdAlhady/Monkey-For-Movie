import { TestBed } from '@angular/core/testing';

import { DashbordServiceService } from './dashbord-service.service';

describe('DashbordServiceService', () => {
  let service: DashbordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashbordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
