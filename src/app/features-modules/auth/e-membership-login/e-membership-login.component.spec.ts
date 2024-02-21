import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMembershipLoginComponent } from './e-membership-login.component';

describe('EMembershipLoginComponent', () => {
  let component: EMembershipLoginComponent;
  let fixture: ComponentFixture<EMembershipLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EMembershipLoginComponent]
    });
    fixture = TestBed.createComponent(EMembershipLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
