import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { wishlistLoadedGuard } from './wishlist-loaded.guard';

describe('wishlistLoadedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => wishlistLoadedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
