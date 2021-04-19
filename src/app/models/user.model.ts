export class User {

    constructor(
        public name: string = '',
        public email: string,
        public password: string,
        public coins: number = null,
        public moves: Array<{ toId: string, to: string, at: number, amount: number }>
    ) { }
}