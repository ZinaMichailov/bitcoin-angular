import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';

const USERS = [
    {
        name: 'Puki Ben David',
        coins: 100,
        moves: []
    }
]

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _usersDb: User[] = USERS;

    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    public query(): void {
        let users = this._usersDb;
        this._users$.next(users);
    }
}