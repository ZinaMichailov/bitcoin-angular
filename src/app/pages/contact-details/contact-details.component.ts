import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  loggedinUser: User
  contact: Contact
  movesForContact: any
  subscription: Subscription

  constructor(private contactService: ContactService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.subscription = this.route.data.subscribe(data => {
    //   this.contact = data.contact
    // })

    this.subscription = this.route.params.pipe(
      mergeMap(params => this.contactService.getById(params.id))
    ).subscribe(contact => {
      this.contact = contact
    })

    this.loggedinUser = this.userService.getLoggedInUser()
    if (!this.loggedinUser) return this.movesForContact = null
    this.movesForContact = this.loggedinUser.moves.filter(move => move.toId === this.route.snapshot.params.id)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
