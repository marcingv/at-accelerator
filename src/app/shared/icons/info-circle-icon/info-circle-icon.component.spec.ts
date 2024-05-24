import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCircleIconComponent } from './info-circle-icon.component';

describe('InfoCircleIconComponent', () => {
  let component: InfoCircleIconComponent;
  let fixture: ComponentFixture<InfoCircleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCircleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCircleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
