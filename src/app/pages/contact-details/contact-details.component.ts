import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() selectedContactId: string
  @Output() onBack = new EventEmitter()

  contact: Contact
  subscription: Subscription

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.getById(this.selectedContactId).subscribe(contact => {
      this.contact = contact
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
