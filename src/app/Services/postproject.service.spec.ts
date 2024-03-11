import { TestBed } from '@angular/core/testing';

import { PostprojectService } from './postproject.service';

describe('PostprojectService', () => {
  let service: PostprojectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostprojectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
