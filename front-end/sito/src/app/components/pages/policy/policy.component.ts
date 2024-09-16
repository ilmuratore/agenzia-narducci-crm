import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../services/api/policy/policy.service';
import { Policy } from '../../../models/policy.model';
import { PolicyType } from '../../../models/policyType.model';
import { PolicyStatus } from '../../../models/policyStatus.model';
import { PolicyContributor } from '../../../models/policyContributor.model';
import { PaymentMethod } from '../../../models/paymentMethod.model';
import { SplitType } from '../../../models/splitType.model';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  policy: Policy = {} as Policy;
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  // Opzioni per le select
  policyTypes = Object.values(PolicyType);
  policyStatuses = Object.values(PolicyStatus);
  contributor = Object.values(PolicyContributor);
  paymentMethods = Object.values(PaymentMethod);
  splitTypes = Object.values(SplitType);
  
  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data) => (this.policies = data),
      error: () => this.showError('Errore nel caricamento delle polizze.'),
    });
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.showError('Il file PDF è obbligatorio.');
      return;
    }  
    const formData = new FormData();
    for (const key in this.policy) {
      if (this.policy.hasOwnProperty(key)) {
        formData.append(key, this.policy[key]);
      }
    }
    formData.append('pdfFile', this.selectedFile);
    if (this.policy._id) {
      this.policyService.updatePolicy(this.policy._id, formData).subscribe({
        next: () => {
          this.loadPolicies();
          this.resetForm();
        },
        error: () => this.showError('Errore durante l\'aggiornamento della polizza.'),
      });
    } else {
      this.policyService.createPolicy(formData).subscribe({
        next: () => {
          this.loadPolicies();
          this.resetForm();
        },
        error: () => this.showError('Errore durante la creazione della polizza.'),
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  deletePolicy(id: string): void {
    this.policyService.deletePolicy(id).subscribe({
      next: () => this.loadPolicies(),
      error: () => this.showError('Errore durante l\'eliminazione della polizza.'),
    });
  }

  editPolicy(policy: Policy): void {
    this.policy = { ...policy };
  }

  resetForm(): void {
    this.policy = {} as Policy;
    this.selectedFile = null;
    this.errorMessage = null;
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = null), 5000); 
  }
}
