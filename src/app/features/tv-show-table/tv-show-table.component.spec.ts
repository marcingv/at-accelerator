import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowTableComponent } from './tv-show-table.component';
import { TvShowsFavouritesService } from "@features/tv-shows-data-access";
import { TvShow } from "@core/models";
import { By } from "@angular/platform-browser";
import createSpyObj = jasmine.createSpyObj;
import { signal } from "@angular/core";

describe('TvShowTableComponent', () => {
  let component: TvShowTableComponent;
  let fixture: ComponentFixture<TvShowTableComponent>;
  let favouritesService: jasmine.SpyObj<TvShowsFavouritesService>;
  const tvShow: TvShow = {
    id: 1,
    status: "Running",
    start_date: '2024-01-01',
    country: 'UK',
    name: 'Show 1',
    network: 'Network',
    permalink: 'http://localhost',
    image_thumbnail_path: 'http://localhost'
  };

  beforeEach(() => {
    favouritesService = createSpyObj<TvShowsFavouritesService>(['add', 'remove', 'isFavourite']);
    favouritesService.isFavourite.and.returnValue(signal(false));

    TestBed.configureTestingModule({
      imports: [TvShowTableComponent],
      providers: [
        { provide: TvShowsFavouritesService, useValue: favouritesService },
      ],
    });
    fixture = TestBed.createComponent(TvShowTableComponent);
    component = fixture.componentInstance;
    component.shows = [tvShow];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add tv show to favourites', () => {
    const bookmarkAction = fixture.debugElement.query(By.css(`[data-test-id="action-bookmark-${ tvShow.id }"]`));
    expect(bookmarkAction).toBeTruthy();

    bookmarkAction.triggerEventHandler('click');

    expect(favouritesService.add).toHaveBeenCalled();
  });

  it('should remove tv show to favourites', () => {
    favouritesService.isFavourite.and.returnValue(signal<boolean>(true));
    fixture.detectChanges();

    const bookmarkAction = fixture.debugElement.query(By.css(`[data-test-id="action-bookmark-${ tvShow.id }"]`));
    expect(bookmarkAction).toBeTruthy();

    bookmarkAction.triggerEventHandler('click');

    expect(favouritesService.remove).toHaveBeenCalled();
  });
});
