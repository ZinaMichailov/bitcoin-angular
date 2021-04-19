import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginCred: object
  singupCred: object
  loggedinUser: any

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loggedinUser = this.userService.getLoggedInUser()
    this.singupCred = this.userService.getEmptySingUpCred()
    this.loginCred = {email: '', password: ''}
  }

  onLogin() {
    this.userService.login(this.loginCred)
    this.router.navigateByUrl('/')
  }

  onSignup() {
    this.userService.signup(this.singupCred)
    this.router.navigateByUrl('/')
  }

  onLogout() {
    this.userService.logout()
    this.loggedinUser = null
  }

}
