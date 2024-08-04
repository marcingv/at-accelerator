import { OpenTvShowGalleryDirective } from './open-tv-show-gallery.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { TvShowId } from '@core/models';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowGalleryService } from '@features/tv-shows/components/tv-show-gallery-dialog';
import { By } from '@angular/platform-browser';
import { provideTranslationsTestingModule } from '@testing/translations';
import createSpyObj = jasmine.createSpyObj;

@Component({
  selector: 'app-host',
  standalone: true,
  template: ` <a [appOpenTvShowGallery]="tvShowId">Open gallery</a> `,
  imports: [OpenTvShowGalleryDirective],
})
class HostComponent {
  public tvShowId: TvShowId = 123;

  @ViewChild(OpenTvShowGalleryDirective, { static: true })
  public directive!: OpenTvShowGalleryDirective;
}

describe('OpenTvShowGalleryDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let tvShowGalleryService: jasmine.SpyObj<TvShowGalleryService>;

  beforeEach(async () => {
    tvShowGalleryService = createSpyObj<TvShowGalleryService>(['showDialog']);

    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideTranslationsTestingModule(),
        { provide: TvShowGalleryService, useValue: tvShowGalleryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(component.directive).toBeTruthy();
  });

  it('should open gallery dialog on click', () => {
    const aEl: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(aEl).toBeTruthy();

    aEl.triggerEventHandler('click');
    expect(tvShowGalleryService.showDialog).toHaveBeenCalledWith(
      component.tvShowId,
    );
  });
});
