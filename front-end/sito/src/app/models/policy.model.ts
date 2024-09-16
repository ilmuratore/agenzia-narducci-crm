// models/policy.model.ts

import { Client } from './client.model';
import { Invoice } from './invoice.model';
import { PolicyType } from './policyType.model';
import { PolicyStatus } from './policyStatus.model';

export interface Policy {
   _id?: string; // Opzionale
   client: Client;
   policyNumber: number;
   type: PolicyType;
   startDate: Date;
   endDate: Date;
   premiumAmount: number;
   status: PolicyStatus;
   Invoice: Invoice;
   notes?: string; // Opzionale
   createdAt?: Date; // Opzionale    
}
