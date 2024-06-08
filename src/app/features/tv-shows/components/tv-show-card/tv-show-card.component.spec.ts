import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowCardComponent } from './tv-show-card.component';
import { TvShow } from '@core/models';
import { TvShowDetailsFactory } from '../../../../testing';
import { provideRouter } from '@angular/router';

describe('TvShowCardComponent', () => {
  let component: TvShowCardComponent;
  let fixture: ComponentFixture<TvShowCardComponent>;

  const tvShow: TvShow = TvShowDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tvShow', tvShow);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
