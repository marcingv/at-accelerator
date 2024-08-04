import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { Signal, signal } from '@angular/core';
import { TvShow } from '@core/models';
import { provideRouter } from '@angular/router';
import { TvShowsListProviderService } from '@features/tv-shows/data-access';
import createSpyObj = jasmine.createSpyObj;

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let listProvider;

  beforeEach(() => {
    listProvider = createSpyObj<TvShowsListProviderService>([], {
      get isLoading(): Signal<boolean> {
        return signal(false);
      },
      get filterQuery(): Signal<string | null> {
        return signal(null);
      },
      get tvShows(): Signal<TvShow[]> {
        return signal([]);
      },
      get currentPage(): Signal<number> {
        return signal(1);
      },
      get totalPages(): Signal<number> {
        return signal(10);
      },
    });

    TestBed.configureTestingModule({
      imports: [SearchPageComponent],
      providers: [
        provideRouter([]),
        { provide: TvShowsListProviderService, useValue: listProvider },
      ],
    });
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});