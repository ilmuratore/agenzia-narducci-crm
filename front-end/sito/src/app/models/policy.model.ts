// models/policy.model.ts

import { Client } from './client.model';
import { Invoice } from './invoice.model';


export interface Policy {
    [key: string]: any;
    _id?: string; 
    client?: Client;
    policyNumber: number;
    type: PolicyType;
    startDate: Date;
    endDate: Date;
    premiumAmount: number;
    invoiceAmount: number;
    status: PolicyStatus;
    contributor: Contributor;
    paymentMethod: PaymentMethod;
    splitType: SplitType;
    Invoice?: Invoice; 
    policyNotes?: string;
    pdfUrl: string;
    createdAt?: Date; 
}

// Enum per il tipo di polizza
export enum PolicyType {
    RCAuto = 'rc_auto',
    Danni = 'danni',
    Vita = 'vita',
    TCM = 'tcm',
    Altro = 'altro'
  }
  
  // Enum per lo stato della polizza
  export enum PolicyStatus {
    Attiva = 'attiva',
    Scaduta = 'scaduta',
    Sospesa = 'sospesa',
    DisdettaCliente = 'disdetta_cliente',
    DisdettaDirezione = 'disdetta_direzione'
  }
  
  // Enum per il collaboratore
  export enum Contributor {
    Valerio = 'valerio',
    DAmbrosio = "d'ambrosio",
    Tiziana = 'tiziana',
    Prisco = 'prisco',
    Luciano = 'luciano',
    Agenzia = 'agenzia'
  }
  
  // Enum per il metodo di pagamento
  export enum PaymentMethod {
    Bonifico = 'bonifico',
    Contanti = 'contanti',
    POS = 'pos',
    Finanziamento = 'finanziamento'
  }
  
  // Enum per il frazionamento del pagamento
  export enum SplitType {
    Semestrale = 'semestrale',
    Annuale = 'annuale'
  }


