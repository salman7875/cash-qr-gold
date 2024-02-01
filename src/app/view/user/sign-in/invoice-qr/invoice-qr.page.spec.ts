import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceQrPage } from './invoice-qr.page';

describe('InvoiceQrPage', () => {
  let component: InvoiceQrPage;
  let fixture: ComponentFixture<InvoiceQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvoiceQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
