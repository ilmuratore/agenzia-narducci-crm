// models/policy.model.ts

import { Client } from './client.model';
import { Invoice } from './invoice.model';
import { PolicyType } from './policyType.model';
import { PolicyStatus } from './policyStatus.model';
import { PolicyContributor } from './policyContributor.model';
import { PaymentMethod } from './paymentMethod.model';
import { SplitType } from './splitType.model';

export interface Policy {
    [key: string]: any;
    _id?: string; // Opzionale
    client?: Client; // Opzionale, se il cliente è associato
    policyNumber: number;
    type: PolicyType;
    startDate: Date;
    endDate: Date;
    premiumAmount: number;
    invoiceAmount: number;
    status: PolicyStatus;
    contributor: PolicyContributor;
    paymentMethod: PaymentMethod;
    splitType: SplitType;
    Invoice?: Invoice; // Opzionale, se la fattura è associata
    policyNotes?: string; // Opzionale
    pdfUrl: string;
    createdAt?: Date; // Opzionale    
}
