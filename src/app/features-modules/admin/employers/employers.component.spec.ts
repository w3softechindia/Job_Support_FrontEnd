import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersComponent } from './employers.component';

describe('EmployersComponent', () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployersComponent]
    });
    fixture = TestBed.createComponent(EmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
