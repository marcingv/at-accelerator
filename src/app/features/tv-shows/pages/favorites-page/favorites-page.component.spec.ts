import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';
import { provideRouter } from '@angular/router';
import { DebugElement, signal } from '@angular/core';
import { TvShowsFavouritesService } from '@features/tv-shows/data-access';
import { TvShowDetails, TvShowId } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { provideTranslationsTestingModule } from '@testing/translations';
import { By } from '@angular/platform-browser';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  let favoritesService: jasmine.SpyObj<TvShowsFavouritesService>;

  const FAVORITES_IDS: TvShowId[] = [1, 2];
  const favoritesSignal = signal<TvShowDetails[]>(
    FAVORITES_IDS.map((oneId) =>
      TvShowDetailsFactory.createInstance({ id: oneId }),
    ),
  );

  beforeEach(() => {
    favoritesService = jasmine.createSpyObj<TvShowsFavouritesService>([
      'favorites',
      'isFavourite',
    ]);
    favoritesService.favorites.and.returnValue(favoritesSignal());
    favoritesService.isFavourite.and.callFake(() => signal(true));

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideTranslationsTestingModule(),
        { provide: TvShowsFavouritesService, useValue: favoritesService },
      ],
    });

    fixture = TestBed.createComponent(FavoritesPageComponent);
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
