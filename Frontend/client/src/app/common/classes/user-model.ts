
export class User {
    id: string;
    username: string;
    name?: string;
    lastName?: string;

    constructor() {
        this.username = "";
        this.name = "";
        this.lastName = "";
    }
};