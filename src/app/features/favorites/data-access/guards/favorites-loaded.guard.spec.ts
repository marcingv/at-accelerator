import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { favoritesLoadedGuard } from './favorites-loaded.guard';

describe('favoritesLoadedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      favoritesLoadedGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
