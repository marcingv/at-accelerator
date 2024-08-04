import { ToggleWishlistDirective } from './toggle-wishlist.directive';
import { Component, viewChild } from '@angular/core';
import { TvShow } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideTranslationsTestingModule } from '@testing/translations';
import { fromWishlist } from '@features/wishlist/data-access/+state';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [ToggleWishlistDirective],
  template: '<button [appToggleWishlist]="tvShow"></button>',
})
class HostComponent {
  public tvShow: TvShow = TvShowDetailsFactory.createInstance();
  public directive = viewChild.required(ToggleWishlistDirective);
}

describe('ToggleWishlistDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let store: MockStore;

  const INITIAL_STATE: {
    [fromWishlist.wishlistFeatureKey]: fromWishlist.State;
  } = {
    wishlist: fromWishlist.initialState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideTranslationsTestingModule(), provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.setState(INITIAL_STATE);

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.directive()).toBeTruthy();
    expect(component.directive()).toBeInstanceOf(ToggleWishlistDirective);
  });
});
