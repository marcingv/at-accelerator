import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevronDoubleRightIconComponent } from './chevron-double-right-icon.component';

describe('ChevronDoubleRightIconComponent', () => {
  let component: ChevronDoubleRightIconComponent;
  let fixture: ComponentFixture<ChevronDoubleRightIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChevronDoubleRightIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChevronDoubleRightIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
