import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsListComponent } from './tv-shows-list.component';
import { provideTranslationsTestingModule } from '@testing/translations';

describe('TvShowsListComponent', () => {
  let component: TvShowsListComponent;
  let fixture: ComponentFixture<TvShowsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsListComponent],
      providers: [provideTranslationsTestingModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowsListComponent);
    fixture.componentRef.setInput('shows', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
