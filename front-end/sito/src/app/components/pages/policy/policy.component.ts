// components/policies.component.ts
import { Component, OnInit } from '@angular/core';
import { Policy, PolicyType, PolicyStatus, Contributor, PaymentMethod, SplitType } from '../../../models/policy.model';
import { PolicyService } from '../../../services/api/policy/policy.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  policies: Policy[] = [];
  policy: Partial<Policy> = {};
  errorMessage: string = '';
  pdfFile!: File;

  // Enum options per i dropdown
  policyTypes = Object.values(PolicyType);
  policyStatuses = Object.values(PolicyStatus);
  contributors = Object.values(Contributor);
  paymentMethods = Object.values(PaymentMethod);
  splitTypes = Object.values(SplitType);

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies(): void {
    this.policyService.getPolicies().subscribe({
      next: (data) => this.policies = data,
      error: (err) => this.errorMessage = err.message
    });
  }

  onSubmit(): void {
    if (this.policy._id) {
      this.policyService.updatePolicy(this.policy._id, this.policy as Policy).subscribe({
        next: () => this.getPolicies(),
        error: (err) => this.errorMessage = err.message
      });
    } else {
      this.policyService.createPolicy(this.policy as Policy).subscribe({
        next: () => this.getPolicies(),
        error: (err) => this.errorMessage = err.message
      });
    }
    this.resetForm();
  }

  onFileChange(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  uploadPdf(policyId: string): void {
    if (this.pdfFile) {
      this.policyService.uploadPdf(policyId, this.pdfFile).subscribe({
        next: () => this.getPolicies(),
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  editPolicy(policy: Policy): void {
    this.policy = { ...policy };
  }

  deletePolicy(id: string): void {
    this.policyService.deletePolicy(id).subscribe({
      next: () => this.getPolicies(),
      error: (err) => this.errorMessage = err.message
    });
  }

  resetForm(): void {
    this.policy = {};
    this.pdfFile = undefined!;
  }
}
