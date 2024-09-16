import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/api/client/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  currentClient: Client = this.initializeClient();
  isEditing = false;
  errorMessage = '';

  constructor(private clientsService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  initializeClient(): Client {
    return {
      name: '',
      surname: '',
      fiscalCode: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: new Date(),
      clientNotes: '',
      policies: [],
    };
  }

  startAddingClient(): void {
    this.currentClient = this.initializeClient();
    this.isEditing = false;
  }

  addClient(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Compila tutti i campi obbligatori.';
      return;
    }

    this.clientsService.createClient(this.currentClient).subscribe(
      () => {
        this.loadClients();
        this.resetForm(form);
      },
      (error) => {
        this.errorMessage = 'Errore durante l\'aggiunta del cliente. Riprova.';
      }
    );
  }

  editClient(client: Client): void {
    this.currentClient = { ...client };
    this.isEditing = true;
  }

  updateClient(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Compila tutti i campi obbligatori.';
      return;
    }

    if (this.currentClient && this.currentClient._id) {
      this.clientsService.updateClient(this.currentClient._id, this.currentClient).subscribe(
        () => {
          this.loadClients();
          this.resetForm(form);
        },
        (error) => {
          this.errorMessage = 'Errore durante la modifica del cliente. Riprova.';
        }
      );
    }
  }

  deleteClient(id: string): void {
    this.clientsService.deleteClient(id).subscribe(() => {
      this.loadClients();
    });
  }

  resetForm(form: NgForm): void {
    this.currentClient = this.initializeClient();
    this.isEditing = false;
    this.errorMessage = '';
    form.resetForm();
  }
}
