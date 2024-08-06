import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowSearchFormComponent } from './tv-show-search-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TvShowSearchFormComponent', () => {
  let component: TvShowSearchFormComponent;
  let fixture: ComponentFixture<TvShowSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowSearchFormComponent],
    })
      .overrideComponent(TvShowSearchFormComponent, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TvShowSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
