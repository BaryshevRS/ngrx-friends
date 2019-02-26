export class Friend {

    rating?: number;
    bookmark?: number;
    loading?: false;

    constructor(
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public gender?: string,
        public city?: string,
        public id?: string
    ) {}
}
