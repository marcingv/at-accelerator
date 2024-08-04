import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowCardComponent } from './tv-show-card.component';
import { TvShow } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { provideRouter } from '@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CardComponent } from '@shared/cards';
import { NextEpisodeCountdownPipe } from '@features/tv-shows/pipes';
import { By } from '@angular/platform-browser';

describe('TvShowCardComponent', () => {
  let component: TvShowCardComponent;
  let fixture: ComponentFixture<TvShowCardComponent>;

  const tvShow: TvShow = TvShowDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowCardComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(TvShowCardComponent, {
        set: {
          imports: [CardComponent, NextEpisodeCountdownPipe],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TvShowCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tvShow', tvShow);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display show title in a header', () => {
    const h2Element: DebugElement = fixture.debugElement.query(By.css('h2'));

    expect(h2Element).toBeTruthy();
    expect(h2Element.nativeElement.textContent).toContain(tvShow.name);
  });
});
