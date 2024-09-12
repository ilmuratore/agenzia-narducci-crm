import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../../services/api/client/clients.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent {
  @Input() client: Client = {
    name: '',
    surname: '',
    fiscalCode: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: new Date(),
  };
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal, private clientsService: ClientsService) {}

  onSubmit(form: any, modal: any): void {
    if (this.client._id) {
      this.clientsService.updateClient(this.client._id, this.client).subscribe(() => {
        this.save.emit();
        this.activeModal.close();
      });
    } else {
      this.clientsService.createClient(this.client).subscribe(() => {
        this.save.emit();
        this.activeModal.close();
      });
    }
  }
}
