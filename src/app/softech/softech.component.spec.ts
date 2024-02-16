import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftechComponent } from './softech.component';

describe('SoftechComponent', () => {
  let component: SoftechComponent;
  let fixture: ComponentFixture<SoftechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftechComponent]
    });
    fixture = TestBed.createComponent(SoftechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
