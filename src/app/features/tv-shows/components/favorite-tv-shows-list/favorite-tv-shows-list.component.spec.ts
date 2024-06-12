import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FavoriteTvShowsListComponent } from './favorite-tv-shows-list.component';
import { TvShowsFavouritesService } from 'src/app/features/data-access';
import { TvShowDetailsService } from '@features/data-access/services/tv-show-details.service';
import { TvShowId } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { of } from 'rxjs';
import { DebugElement, signal } from '@angular/core';
import SpyObj = jasmine.SpyObj;
import { By } from '@angular/platform-browser';
import { TvShowCardComponent } from '@features/tv-shows/components/tv-show-card';
import { provideRouter } from '@angular/router';

describe('FavoriteTvShowsListComponent', () => {
  let component: FavoriteTvShowsListComponent;
  let fixture: ComponentFixture<FavoriteTvShowsListComponent>;

  let favoritesService: SpyObj<TvShowsFavouritesService>;
  let detailsService: SpyObj<TvShowDetailsService>;

  const FAVORITES_IDS: TvShowId[] = [1, 2];
  const favoritesIdsSignal = signal<TvShowId[]>(FAVORITES_IDS);

  beforeEach(async () => {
    favoritesService = jasmine.createSpyObj<TvShowsFavouritesService>([
      'idsSignal',
      'isFavourite',
    ]);
    favoritesService.idsSignal.and.returnValue(favoritesIdsSignal());
    favoritesService.isFavourite.and.returnValue(signal<boolean>(true));

    detailsService = jasmine.createSpyObj<TvShowDetailsService>(['getDetails']);
    detailsService.getDetails.and.callFake((tvShowId: TvShowId) => {
      return of(TvShowDetailsFactory.createInstance({ id: tvShowId }));
    });

    await TestBed.configureTestingModule({
      imports: [FavoriteTvShowsListComponent],
      providers: [
        provideRouter([]),
        { provide: TvShowsFavouritesService, useValue: favoritesService },
        { provide: TvShowDetailsService, useValue: detailsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteTvShowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially load favorites and display them', fakeAsync(() => {
    TestBed.flushEffects();

    expect(detailsService.getDetails).toHaveBeenCalledTimes(
      FAVORITES_IDS.length,
    );

    TestBed.flushEffects();
    fixture.detectChanges();

    const cards: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(TvShowCardComponent),
    );

    expect(cards.length).toEqual(FAVORITES_IDS.length);
  }));
});
