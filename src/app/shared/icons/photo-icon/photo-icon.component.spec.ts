import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoIconComponent } from './photo-icon.component';

describe('PhotoIconComponent', () => {
  let component: PhotoIconComponent;
  let fixture: ComponentFixture<PhotoIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
