import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceAmountPage } from './invoice-amount.page';

describe('InvoiceAmountPage', () => {
  let component: InvoiceAmountPage;
  let fixture: ComponentFixture<InvoiceAmountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvoiceAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
