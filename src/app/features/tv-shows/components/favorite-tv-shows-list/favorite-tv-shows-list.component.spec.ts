import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FavoriteTvShowsListComponent } from './favorite-tv-shows-list.component';
import { TvShowsFavouritesService } from 'src/app/features/data-access';
import { TvShowDetails, TvShowId } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';
import SpyObj = jasmine.SpyObj;

describe('FavoriteTvShowsListComponent', () => {
  let component: FavoriteTvShowsListComponent;
  let fixture: ComponentFixture<FavoriteTvShowsListComponent>;

  let favoritesService: SpyObj<TvShowsFavouritesService>;

  const FAVORITES_IDS: TvShowId[] = [1, 2];
  const favoritesSignal = signal<TvShowDetails[]>(
    FAVORITES_IDS.map((oneId) =>
      TvShowDetailsFactory.createInstance({ id: oneId }),
    ),
  );

  beforeEach(async () => {
    favoritesService = jasmine.createSpyObj<TvShowsFavouritesService>([
      'favorites',
      'isFavourite',
    ]);
    favoritesService.favorites.and.returnValue(favoritesSignal());
    favoritesService.isFavourite.and.callFake(() => signal(true));

    await TestBed.configureTestingModule({
      imports: [FavoriteTvShowsListComponent],
      providers: [
        provideRouter([]),
        provideTranslationsTestingModule(),
        { provide: TvShowsFavouritesService, useValue: favoritesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteTvShowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display favorites as cards list', fakeAsync(() => {
    const cards: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(TvShowCardComponent),
    );

    expect(cards.length).toEqual(FAVORITES_IDS.length);
  }));
});
