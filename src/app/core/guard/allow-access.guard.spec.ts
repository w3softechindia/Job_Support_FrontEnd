import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allowAccessGuard } from './allow-access.guard';

describe('allowAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allowAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
