import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../services/api/policy/policy.service';
import { Policy } from '../../../models/policy.model';
import { PolicyType } from '../../../models/policyType.model';
import { PolicyStatus } from '../../../models/policyStatus.model';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  policy: Policy = {} as Policy;
  errorMessage: string | null = null;

   // Opzioni per le select
   policyTypes = Object.values(PolicyType);
   policyStatuses = Object.values(PolicyStatus);
   
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
    if (this.policy._id) {
      this.policyService.updatePolicy(this.policy._id, this.policy).subscribe({
        next: () => {
          this.loadPolicies();
          this.resetForm();
        },
        error: () => this.showError('Errore durante l\'aggiornamento della polizza.'),
      });
    } else {
      this.policyService.createPolicy(this.policy).subscribe({
        next: () => {
          this.loadPolicies();
          this.resetForm();
        },
        error: () => this.showError('Errore durante la creazione della polizza.'),
      });
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
    this.errorMessage = null;
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = null), 5000); 
  }
}
