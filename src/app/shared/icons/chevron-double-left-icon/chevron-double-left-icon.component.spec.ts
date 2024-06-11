import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevronDoubleLeftIconComponent } from './chevron-double-left-icon.component';

describe('ChevronDoubleLeftComponent', () => {
  let component: ChevronDoubleLeftIconComponent;
  let fixture: ComponentFixture<ChevronDoubleLeftIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChevronDoubleLeftIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChevronDoubleLeftIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
