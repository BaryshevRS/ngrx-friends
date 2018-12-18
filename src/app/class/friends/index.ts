export class Friend {

    rating?: number;
    bookmark?: number;

    constructor(
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public gender?: string,
        public ip_address?: string,
        public city?: string,
        public id?: string
    ) {}
}
