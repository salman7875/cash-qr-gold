import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninGoldPage } from './signin-gold.page';

describe('SigninGoldPage', () => {
  let component: SigninGoldPage;
  let fixture: ComponentFixture<SigninGoldPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SigninGoldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
