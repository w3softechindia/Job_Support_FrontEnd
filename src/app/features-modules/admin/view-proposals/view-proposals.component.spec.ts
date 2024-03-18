import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposalsComponent } from './view-proposals.component';

describe('ViewProposalsComponent', () => {
  let component: ViewProposalsComponent;
  let fixture: ComponentFixture<ViewProposalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProposalsComponent]
    });
    fixture = TestBed.createComponent(ViewProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
