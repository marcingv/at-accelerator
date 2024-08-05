import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';
import { TranslocoPipe } from '@jsverse/transloco';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideTranslationsTestingModule(), provideRouter([])],
    })
      .overrideComponent(MainLayoutComponent, {
        set: {
          imports: [RouterOutlet, RouterLinkActive, RouterLink, TranslocoPipe],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
