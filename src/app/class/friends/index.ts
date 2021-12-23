export class Friend {
    rating: number = 0;
    bookmark: number = 0;

    constructor(
        public id: string = '',
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
        public gender: string = '',
        public city: string = '',
    ) {}
}
