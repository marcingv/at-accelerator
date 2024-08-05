import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSigningComponent } from './user-signing.component';

describe('UserSigningComponent', () => {
  let component: UserSigningComponent;
  let fixture: ComponentFixture<UserSigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSigningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
