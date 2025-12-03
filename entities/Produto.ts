export class Produto {
    constructor(
        public id: number,
        public nome: string,
        public quantidade: number,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}