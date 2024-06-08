import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowRowActionsComponent } from './tv-show-row-actions.component';
import { TvShow } from '@core/models';
import { TvShowsFavouritesService } from 'src/app/features/data-access';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('TvShowRowActionsComponent', () => {
  let component: TvShowRowActionsComponent;
  let fixture: ComponentFixture<TvShowRowActionsComponent>;
  let favouritesService: jasmine.SpyObj<TvShowsFavouritesService>;

  let isFavoriteSignal: WritableSignal<boolean>;

  const tvShow: TvShow = {
    id: 1,
    status: 'Running',
    start_date: '2024-01-01',
    country: 'UK',
    name: 'Show 1',
    network: 'Network',
    permalink: 'http://localhost',
    image_thumbnail_path: 'http://localhost',
  };

  beforeEach(async () => {
    isFavoriteSignal = signal<boolean>(false);

    favouritesService = createSpyObj<TvShowsFavouritesService>([
      'toggle',
      'isFavourite',
    ]);
    favouritesService.isFavourite.and.returnValue(isFavoriteSignal);

    await TestBed.configureTestingModule({
      imports: [TvShowRowActionsComponent],
      providers: [
        provideRouter([]),
        { provide: TvShowsFavouritesService, useValue: favouritesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowRowActionsComponent);
    component = fixture.componentInstance;
    component.tvShow = tvShow;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add tv show to favourites', () => {
    const bookmarkAction = fixture.debugElement.query(
      By.css(`[data-test-id="action-bookmark-${tvShow.id}"]`),
    );
    expect(bookmarkAction).toBeTruthy();

    bookmarkAction.triggerEventHandler('click');
    expect(favouritesService.toggle).toHaveBeenCalled();
  });

  it('should remove tv show to favourites', () => {
    isFavoriteSignal.set(true);
    fixture.detectChanges();

    const bookmarkAction = fixture.debugElement.query(
      By.css(`[data-test-id="action-bookmark-${tvShow.id}"]`),
    );
    expect(bookmarkAction).toBeTruthy();

    bookmarkAction.triggerEventHandler('click');
    expect(favouritesService.toggle).toHaveBeenCalled();
  });
});
