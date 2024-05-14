import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeletionComponent } from './account-deletion.component';

describe('AccountDeletionComponent', () => {
  let component: AccountDeletionComponent;
  let fixture: ComponentFixture<AccountDeletionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDeletionComponent]
    });
    fixture = TestBed.createComponent(AccountDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
