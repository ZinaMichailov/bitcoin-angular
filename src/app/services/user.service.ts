import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';
import { httpService } from './http.service';

// const USERS = [
//     {
//         name: 'Puki Ben David',
//         email: 'puki@gmail.com',
//         password: '1234',
//         coins: 100,
//         moves: [
//             {
//                 toId: '5a56640269f443a5d64b32ca',
//                 to: 'Ochoa Hyde',
//                 at: 1618056214923,
//                 amount: 20
//             },
//             {
//                 amount: 5,
//                 at: 1619355164509,
//                 to: "Dominique Soto",
//                 toId: "5a566402abce24c6bfe4699d"
//             },
//             {
//                 amount: 10,
//                 at: 1619355991441,
//                 to: "Faulkner Flores",
//                 toId: "5a566402f90ae30e97f990db" 
//             }
//         ]
//     }
// ]

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    public async query(): Promise<void> {
        const users = await httpService.get(`user`);
        this._users$.next(users)
    }

    public async login(loginCred) {
        const user = await httpService.post('auth/login', loginCred)
        if (user) return this._saveLocalUser(user)
    }

    public async logout(): Promise<void> {
        sessionStorage.clear()
        return await httpService.post('auth/logout')
    }

    public async signup(signupCred) {
        const user = await httpService.post('auth/signup', signupCred)
        return this._saveLocalUser(user)
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

    public async addMove(contact, amount) {
        let user = {...this.getLoggedInUser()};
        amount = parseInt(amount)

        if (user.coins >= amount) {
            const move: Move = { toId: contact._id, to: contact.name, at: Date.now(), amount }
            user.moves = [...user.moves, move]
            user.coins -= amount
            user = await httpService.put(`user/${user._id}`, user)
            if (this.getLoggedInUser()._id === user._id) this._saveLocalUser(user)
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