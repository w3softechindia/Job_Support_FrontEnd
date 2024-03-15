import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeActiveComponent } from './de-active.component';

describe('DeActiveComponent', () => {
  let component: DeActiveComponent;
  let fixture: ComponentFixture<DeActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeActiveComponent]
    });
    fixture = TestBed.createComponent(DeActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
