import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMembershipComponent } from './employer-membership.component';

describe('EmployerMembershipComponent', () => {
  let component: EmployerMembershipComponent;
  let fixture: ComponentFixture<EmployerMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerMembershipComponent]
    });
    fixture = TestBed.createComponent(EmployerMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
