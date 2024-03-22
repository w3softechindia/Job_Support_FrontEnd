import { TestBed } from '@angular/core/testing';

import { EmployerProjectIdsForViewProjectService } from './employer-project-ids-for-view-project.service';

describe('EmployerProjectIdsForViewProjectService', () => {
  let service: EmployerProjectIdsForViewProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerProjectIdsForViewProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
