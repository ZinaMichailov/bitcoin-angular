import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // users$: Observable<User[]>
  loggedinUser: User
  rate: any
  subscription: Subscription

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    // this.userService.query()
    // this.users$ = this.userService.users$
    // this.subscription = this.users$.subscribe(users => {
    //   this.user = users[0]
    // })
    this.loggedinUser = this.userService.getLoggedInUser()

    if (!this.loggedinUser) return
    
    const rate = await this.bitcoinService.getRate(this.loggedinUser.coins)
    this.rate = rate.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }
}
