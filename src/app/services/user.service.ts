import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';
import { storageService } from './storage.service.js';

const USERS = [
    {
        name: 'Puki Ben David',
        email: 'puki@gmail.com',
        password: '1234',
        coins: 100,
        moves: [
            {
                toId: '5a56640269f443a5d64b32ca',
                to: 'Ochoa Hyde',
                at: 1618056214923,
                amount: 20
            },
            {
                amount: 5,
                at: 1619355164509,
                to: "Dominique Soto",
                toId: "5a566402abce24c6bfe4699d"
            },
            {
                amount: 10,
                at: 1619355991441,
                to: "Faulkner Flores",
                toId: "5a566402f90ae30e97f990db" 
            }
        ]
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
        const user = this._usersDb.find(user => user.email === loginCred.email && user.password === loginCred.password)
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
        let userIdx = this._usersDb.findIndex(user => user.email === loggedinUser.email)
        amount = parseInt(amount)

        if (loggedinUser.coins >= amount) {
            const move: Move = { toId: contact._id, to: contact.name, at: Date.now(), amount }
            this._usersDb[userIdx].moves = [...this._usersDb[userIdx].moves, move]
            this._usersDb[userIdx].coins -= amount
            storageService.store(USER_KEY, this._usersDb)
            this._users$.next(this._usersDb)
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