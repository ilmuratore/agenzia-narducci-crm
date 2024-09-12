export interface Client {
  _id?: string; // Opzionale, può essere aggiunto dal back-end
  name: string;
  surname: string;
  fiscalCode: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  notes?: string; // Opzionale
  createdAt?: Date; // Opzionale, può essere aggiunto dal back-end
}
