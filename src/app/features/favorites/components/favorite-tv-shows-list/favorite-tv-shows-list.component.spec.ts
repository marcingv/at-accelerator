import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteTvShowsListComponent } from './favorite-tv-shows-list.component';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';

describe('FavoriteTvShowsListComponent', () => {
  let component: FavoriteTvShowsListComponent;
  let fixture: ComponentFixture<FavoriteTvShowsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteTvShowsListComponent],
      providers: [provideRouter([]), provideTranslationsTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteTvShowsListComponent);
    fixture.componentRef.setInput('favorites', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
