import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerMembershipComponent } from './freelancer-membership.component';

describe('FreelancerMembershipComponent', () => {
  let component: FreelancerMembershipComponent;
  let fixture: ComponentFixture<FreelancerMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreelancerMembershipComponent]
    });
    fixture = TestBed.createComponent(FreelancerMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
