import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  users$: Observable<User[]>
  user: User

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.query()
    this.users$ = this.userService.users$
    // this.user = 
  }

}
