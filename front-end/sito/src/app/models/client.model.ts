import { Policy } from "./policy.model";

// models/client.model.ts
export interface Client {
  _id?: string; // Opzionale, può essere aggiunto dal back-end
  name: string;
  surname: string;
  fiscalCode: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  clientNotes?: string; // Opzionale
  policies?: Policy[]; // Opzionale
  createdAt?: Date; // Opzionale, viene aggiunto dal back-end
}
