import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideThumbComponent } from './slide-thumb.component';
import { GalleryPhoto } from '@shared/gallery-slides-show';

describe('GallerySlideComponent', () => {
  let component: SlideThumbComponent;
  let fixture: ComponentFixture<SlideThumbComponent>;

  const photo: GalleryPhoto = { url: 'http://localhost/1.jpg' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideThumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideThumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('photo', photo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
