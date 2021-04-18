import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  public filterBy
  private subscription: Subscription

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.filterBy$.subscribe(filterBy => {
      this.filterBy = filterBy
    })
  }

  onSetFilter() {
    this.contactService.setFilter(this.filterBy)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
