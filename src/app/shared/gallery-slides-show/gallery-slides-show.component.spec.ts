import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GallerySlidesShowComponent } from './gallery-slides-show.component';
import { GalleryPhoto } from '@shared/gallery-slides-show/gallery-photo';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('GallerySlidesShowComponent', () => {
  let component: GallerySlidesShowComponent;
  let fixture: ComponentFixture<GallerySlidesShowComponent>;

  const photos: GalleryPhoto[] = [
    { url: 'http://localhost/1.jpg' },
    { url: 'http://localhost/2.jpg' },
    { url: 'http://localhost/3.jpg' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallerySlidesShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GallerySlidesShowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('photos', photos);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of slides', () => {
    const liElems: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));

    expect(liElems.length).toEqual(photos.length);
  });

  it('should auto select first photo', () => {
    expect(component.activePhoto()).toBeTruthy();
    expect(component.activePhoto()).toBe(photos[0]);
  });
});
