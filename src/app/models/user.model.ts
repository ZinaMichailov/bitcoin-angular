export class User {

    constructor(public name: string = '', public email: string, public password: string, public coins: number = null) {
        // public moves: {public toId: string = '', public to: string = '', public at: number = null, public amount: number = null}[] = null
    }
}