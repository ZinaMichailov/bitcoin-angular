import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  loggedinUser: User
  contact
  movesForContact
  subscription: Subscription

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact
    })

    this.loggedinUser = this.userService.getLoggedInUser()
    if (!this.loggedinUser) return this.movesForContact = null
    this.movesForContact = this.loggedinUser.moves.filter(move => move.toId === this.route.snapshot.params.id)
  }

  async onTransfer(ev) {
    await this.userService.addMove(this.contact, ev.target.amount.value)
    ev.target.amount.value = null
    this.router.navigateByUrl('/')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
