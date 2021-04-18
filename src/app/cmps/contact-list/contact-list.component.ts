import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[]
  @Output() onSelectContact = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(contact: Contact) {
    return contact._id
  }

}
