import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkIconComponent } from './bookmark-icon.component';

describe('BookmarkIconComponent', () => {
  let component: BookmarkIconComponent;
  let fixture: ComponentFixture<BookmarkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
