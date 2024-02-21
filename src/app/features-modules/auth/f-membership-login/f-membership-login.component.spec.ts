import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FMembershipLoginComponent } from './f-membership-login.component';

describe('FMembershipLoginComponent', () => {
  let component: FMembershipLoginComponent;
  let fixture: ComponentFixture<FMembershipLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FMembershipLoginComponent]
    });
    fixture = TestBed.createComponent(FMembershipLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
