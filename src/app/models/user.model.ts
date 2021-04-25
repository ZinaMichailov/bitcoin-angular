import { Move } from './move.model'
export interface User {

    name: string, email: string, password: string, coins: number, moves: Move[]

}