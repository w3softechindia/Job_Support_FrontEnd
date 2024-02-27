import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsExpComponent } from './skills-exp.component';

describe('SkillsExpComponent', () => {
  let component: SkillsExpComponent;
  let fixture: ComponentFixture<SkillsExpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsExpComponent]
    });
    fixture = TestBed.createComponent(SkillsExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
