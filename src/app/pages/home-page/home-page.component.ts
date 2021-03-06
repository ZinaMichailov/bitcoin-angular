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
  loggedinUser: User
  rate$: Observable<string>
  subscription: Subscription

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    this.loggedinUser = this.userService.getLoggedInUser()
    if (this.loggedinUser) this.rate$ = await this.bitcoinService.getRate(this.loggedinUser.coins)    
  }
}
