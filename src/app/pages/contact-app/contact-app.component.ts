import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-app',
  templateUrl: './contact-app.component.html',
  styleUrls: ['./contact-app.component.scss']
})
export class ContactAppComponent implements OnInit {

  contacts$: Observable<Contact[]>

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.query()
    this.contacts$ = this.contactService.contacts$
  }
}