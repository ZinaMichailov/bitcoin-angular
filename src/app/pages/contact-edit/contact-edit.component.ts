import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  contact
  subscription: Subscription

  constructor(
    private contactService: ContactService, 
    private route: ActivatedRoute,  
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (!Object.keys(data).length) {
        this.contact = this.contactService.getEmptyContact()
      } else {
        this.contact = data.contact
      }
    })
  }

  async onSaveContact() {
    await this.contactService.save(this.contact)
    this.router.navigateByUrl('/contact')
  }

  async onRemoveContact() {
    await this.contactService.remove(this.contact._id)
    this.router.navigateByUrl('/contact')
  }
}
