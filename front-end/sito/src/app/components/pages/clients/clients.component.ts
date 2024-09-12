// src/app/components/pages/clients/clients.component.ts

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalComponent } from '../../client-modal/client-modal.component';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/api/client/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientsService: ClientsService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  openModal(client?: Client): void {
    const modalRef = this.modalService.open(ClientModalComponent);
    modalRef.componentInstance.client = client || {};
    modalRef.result.then(() => this.loadClients(), () => {});
  }
}
