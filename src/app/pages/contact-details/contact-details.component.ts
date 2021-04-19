import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  contact: Contact
  subscription: Subscription

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.route.data);
    this.subscription = this.route.data.subscribe(data => {
      
      this.contact = data.contact
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
