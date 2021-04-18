import { Component, OnInit, EventEmitter, Input, Output  } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  @Input() contacts: Contact[]
  @Output() onSelectContact = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

}
