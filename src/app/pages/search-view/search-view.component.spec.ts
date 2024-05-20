import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchViewComponent } from './search-view.component';
import { TvShowsListProviderService } from "@features/tv-shows-data-access";
import { Signal, signal } from "@angular/core";
import { TvShow } from "@core/models";
import createSpyObj = jasmine.createSpyObj;

describe('SearchViewComponent', () => {
  let component: SearchViewComponent;
  let fixture: ComponentFixture<SearchViewComponent>;
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
      }
    });

    TestBed.configureTestingModule({
      imports: [SearchViewComponent],
      providers: [
        { provide: TvShowsListProviderService, useValue: listProvider },
      ],
    });
    fixture = TestBed.createComponent(SearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
