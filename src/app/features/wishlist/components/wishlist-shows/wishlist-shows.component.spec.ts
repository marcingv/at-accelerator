import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistShowsComponent } from './wishlist-shows.component';
import { WishlistShowsService } from '@features/wishlist/data-access/services';
import { TvShowDetailsFactory } from '@testing/factories';
import { signal } from '@angular/core';
import { provideTranslationsTestingModule } from '@testing/translations';
import { provideRouter } from '@angular/router';
import { TvShowsFavouritesService } from '@features/favorites/data-access/services';

describe('WishlistShowsComponent', () => {
  let component: WishlistShowsComponent;
  let fixture: ComponentFixture<WishlistShowsComponent>;
  let wishListService: jasmine.SpyObj<WishlistShowsService>;
  let favoritesService: jasmine.SpyObj<TvShowsFavouritesService>;

  beforeEach(async () => {
    wishListService = jasmine.createSpyObj<WishlistShowsService>(['shows']);
    wishListService.shows.and.returnValue([
      TvShowDetailsFactory.createInstance(),
      TvShowDetailsFactory.createInstance(),
    ]);

    favoritesService = jasmine.createSpyObj<TvShowsFavouritesService>([
      'isFavourite',
    ]);
    favoritesService.isFavourite.and.returnValue(signal<boolean>(false));

    await TestBed.configureTestingModule({
      imports: [WishlistShowsComponent],
      providers: [
        provideRouter([]),
        provideTranslationsTestingModule(),
        { provide: WishlistShowsService, useValue: wishListService },
        {
          provide: TvShowsFavouritesService,
          useValue: favoritesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistShowsComponent);
    fixture.componentRef.setInput('shows', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
