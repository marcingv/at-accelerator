import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArrowTopRightOnSquareIconComponent } from './arrow-top-right-on-square-icon.component';

describe('ArrowTopRightOnSquareIconComponent', () => {
  let component: ArrowTopRightOnSquareIconComponent;
  let fixture: ComponentFixture<ArrowTopRightOnSquareIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowTopRightOnSquareIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowTopRightOnSquareIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
