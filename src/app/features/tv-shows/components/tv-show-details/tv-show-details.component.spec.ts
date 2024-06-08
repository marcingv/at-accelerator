import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowDetailsComponent } from './tv-show-details.component';
import { TvShowDetails } from '@core/models';
import { TvShowDetailsFactory } from '../../../../testing';

describe('TvShowDetailsComponent', () => {
  let component: TvShowDetailsComponent;
  let fixture: ComponentFixture<TvShowDetailsComponent>;

  const details: TvShowDetails = TvShowDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowDetailsComponent);
    component = fixture.componentInstance;
    component.details = details;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
