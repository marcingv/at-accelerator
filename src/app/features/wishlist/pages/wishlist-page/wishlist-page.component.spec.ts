import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistPageComponent } from './wishlist-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WishlistPageComponent', () => {
  let component: WishlistPageComponent;
  let fixture: ComponentFixture<WishlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistPageComponent],
    })
      .overrideComponent(WishlistPageComponent, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
