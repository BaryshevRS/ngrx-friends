export class Friend {

    rating?: number;
    bookmark?: number;

    constructor(
        public id?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public gender?: string,
        public city?: string,
    ) {}
}
