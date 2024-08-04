import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistPageComponent } from './wishlist-page.component';
import { signal } from '@angular/core';
import { WishlistShowsService } from '@features/wishlist/data-access/services';
import { TvShowsFavouritesService } from '@features/tv-shows/data-access';
import { TvShowDetailsFactory } from '@testing/factories';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';

describe('WishlistPageComponent', () => {
  let component: WishlistPageComponent;
  let fixture: ComponentFixture<WishlistPageComponent>;
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
      imports: [WishlistPageComponent],
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

    fixture = TestBed.createComponent(WishlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
