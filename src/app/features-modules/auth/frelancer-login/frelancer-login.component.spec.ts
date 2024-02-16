import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrelancerLoginComponent } from './frelancer-login.component';

describe('FrelancerLoginComponent', () => {
  let component: FrelancerLoginComponent;
  let fixture: ComponentFixture<FrelancerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrelancerLoginComponent]
    });
    fixture = TestBed.createComponent(FrelancerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
