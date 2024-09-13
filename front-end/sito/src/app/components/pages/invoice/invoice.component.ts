import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../models/invoice.model';
import { Policy } from '../../../models/policy.model';
import { InvoiceService } from '../../../services/api/invoice/invoice.service';
import { PolicyService } from '../../../services/api/policy/policy.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices: Invoice[] = [];
  currentInvoice: Invoice = {} as Invoice;
  policies: Policy[] = [];
  errorMessage: string | null = null;
  isEditing: boolean = false;
  

  constructor(
    private invoiceService: InvoiceService,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.loadPolicies();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: () => this.showError('Errore nel caricamento delle fatture.')
    });
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data) => this.policies = data,
      error: () => this.showError('Errore nel caricamento delle polizze.')
    });
  }

  startAddingInvoice(): void {
    this.resetForm();
    this.isEditing = false;
  }

  addInvoice(form: any): void {
    if (form.valid) {
      const invoiceToCreate = { ...this.currentInvoice };
      delete invoiceToCreate._id;
  
      this.invoiceService.createInvoice(invoiceToCreate).subscribe({
        next: () => {
          this.loadInvoices();
          this.resetForm();
        },
        error: () => this.showError('Errore durante la creazione della fattura.')
      });
    }
  }

  updateInvoice(form: any): void {
    if (form.valid && this.currentInvoice._id) {
      this.invoiceService.updateInvoice(this.currentInvoice._id, this.currentInvoice).subscribe({
        next: () => {
          this.loadInvoices();
          this.resetForm();
        },
        error: () => this.showError('Errore durante l\'aggiornamento della fattura.')
      });
    }
  }

  deleteInvoice(id: string): void {
    this.invoiceService.deleteInvoice(id).subscribe({
      next: () => this.loadInvoices(),
      error: () => this.showError('Errore durante l\'eliminazione della fattura.')
    });
  }

  editInvoice(invoice: Invoice): void {
    this.currentInvoice = { ...invoice };
    this.isEditing = true;
  }

  resetForm(form?: any): void {
    if (form) {
      form.reset();
    }
    this.currentInvoice = {} as Invoice;
    this.errorMessage = null;
    this.isEditing = false;
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000);
  }

  getPolicyNumber(policy: Policy): number {
    return policy.policyNumber;
  }
  
}
