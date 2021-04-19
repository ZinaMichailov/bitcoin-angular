import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';
import { storageService } from './storage.service.js';

const USERS = [
    {
        name: 'Puki Ben David',
        email: 'puki@gmail.com',
        password: '1234',
        coins: 100,
        moves: []
    }
]

const USER_KEY = 'userDB'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _usersDb: User[] = USERS;

    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    public query(): void {
        let users = storageService.load(USER_KEY)
        if (!users || !users.length) users = storageService.store(USER_KEY, this._usersDb);
        // let users = this._usersDb;
        this._users$.next(users);
    }

    public login(loginCred) {
        const user = USERS.find(user => user.email === loginCred.email && user.password === loginCred.password)
        return this._saveLocalUser(user)
    }

    public logout(): void {
        sessionStorage.clear()
    }

    public signup(signupCred) {
        USERS.push(signupCred)
        storageService.store(USER_KEY, this._usersDb)
        return this._saveLocalUser(signupCred)
    }

    public getEmptySingUpCred() {
        return {
            name: '',
            email: '',
            password: '',
            coins: 100,
            moves: []
        }
    }

    public addMove(contact, amount) {
        const loggedinUser = this.getLoggedInUser();
        let userIdx = USERS.findIndex(user => user.email === loggedinUser.email)
        let move = this.getEmptyUserMove()
        move.toId = contact._id
        move.to = contact.name
        move.amount = amount
        USERS[userIdx].moves.push(move)
        USERS[userIdx].coins -= amount
        storageService.store(USER_KEY, this._usersDb)
        return USERS[userIdx]
    }

    public getEmptyUserMove() {
        return {
            toId: '',
            to: '',
            at: Date.now(),
            amount: ''
        }
    }

    public getLoggedInUser() {
        return JSON.parse(sessionStorage.getItem(('loggedinUser') || 'null'))
    }

    private _saveLocalUser(user) {
        sessionStorage.setItem('loggedinUser', JSON.stringify(user))
        return user
    }
}