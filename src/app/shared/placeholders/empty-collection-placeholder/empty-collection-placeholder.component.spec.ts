import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyCollectionPlaceholderComponent } from './empty-collection-placeholder.component';

describe('EmptyCollectionPlaceholderComponent', () => {
  let component: EmptyCollectionPlaceholderComponent;
  let fixture: ComponentFixture<EmptyCollectionPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCollectionPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyCollectionPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
