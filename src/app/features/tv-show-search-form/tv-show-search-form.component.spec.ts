import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowSearchFormComponent } from './tv-show-search-form.component';

describe('TvShowSearchFormComponent', () => {
  let component: TvShowSearchFormComponent;
  let fixture: ComponentFixture<TvShowSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvShowSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
