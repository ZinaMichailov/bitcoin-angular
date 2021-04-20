import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[]

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(contact: Contact) {
    return contact._id
  }

}
