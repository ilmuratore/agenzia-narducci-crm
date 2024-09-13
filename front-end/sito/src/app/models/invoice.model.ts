// models/invoice.model.ts

import { Policy } from './policy.model';

export interface Invoice {
    _id?: string; // Opzionale
    policyId: Policy;
    amount: number;
    date: Date;
}
