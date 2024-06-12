import { ToggleFavoriteTvShowDirective } from './toggle-favorite-tv-show.directive';
import { Component, DebugElement, signal } from '@angular/core';
import { TvShow } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowsFavouritesService } from '@features/data-access';
import { By } from '@angular/platform-browser';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

@Component({
  selector: 'app-host',
  standalone: true,
  template: ` <button [appToggleFavoriteTvShow]="tvShow"></button> `,
  imports: [ToggleFavoriteTvShowDirective],
})
class HostComponent {
  public readonly tvShow: TvShow = TvShowDetailsFactory.createInstance();
}

describe('ToggleFavoriteTvShowDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  let favoritesService: SpyObj<TvShowsFavouritesService>;

  beforeEach(() => {
    favoritesService = createSpyObj<TvShowsFavouritesService>([
      'toggle',
      'isFavourite',
    ]);
    favoritesService.isFavourite.and.returnValue(signal<boolean>(false));

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        { provide: TvShowsFavouritesService, useValue: favoritesService },
      ],
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const directive: DebugElement = fixture.debugElement.query(
      By.directive(ToggleFavoriteTvShowDirective),
    );

    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should toggle favorite tv show on click', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();

    button.triggerEventHandler('click');
    expect(favoritesService.toggle).toHaveBeenCalled();
  });
});
