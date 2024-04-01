import { TestBed } from '@angular/core/testing';

import { EmployerProjectIdsForViewProjectService } from './employer-project-ids-for-view-project-service.service';

describe('EmployerProjectIdsForViewProjectServiceService', () => {
  let service: EmployerProjectIdsForViewProjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerProjectIdsForViewProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
