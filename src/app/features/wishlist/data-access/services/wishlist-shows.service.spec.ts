import { TestBed } from '@angular/core/testing';
import { WishlistShowsService } from './wishlist-shows.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('WishlistShowsService', () => {
  let service: WishlistShowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    service = TestBed.inject(WishlistShowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
