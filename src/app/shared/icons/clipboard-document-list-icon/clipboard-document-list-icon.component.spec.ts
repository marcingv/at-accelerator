import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipboardDocumentListIconComponent } from './clipboard-document-list-icon.component';

describe('ClipboardDocumentListIconComponent', () => {
  let component: ClipboardDocumentListIconComponent;
  let fixture: ComponentFixture<ClipboardDocumentListIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardDocumentListIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardDocumentListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
