import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionReportPage } from './transaction-report.page';

describe('TransactionReportPage', () => {
  let component: TransactionReportPage;
  let fixture: ComponentFixture<TransactionReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
