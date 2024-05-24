import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowTableComponent } from './tv-show-table.component';
import { TvShow } from '@core/models';
import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TvShowTableComponent', () => {
  let component: TvShowTableComponent;
  let fixture: ComponentFixture<TvShowTableComponent>;

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

  beforeEach(() => {
    TestBed.overrideComponent(TvShowTableComponent, {
      set: {
        imports: [DatePipe],
        schemas: [NO_ERRORS_SCHEMA],
      },
    }).configureTestingModule({
      imports: [TvShowTableComponent],
    });
    fixture = TestBed.createComponent(TvShowTableComponent);
    component = fixture.componentInstance;
    component.shows = [tvShow];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
