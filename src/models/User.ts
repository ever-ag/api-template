import filterFunctionFactory from '../helpers/modelFilterFactory';

export interface User {
    id: number;
    username: string;
    password: string;
}

export default class UserModel {
    /** Get a user by ID */
    public static find(id: number) {
        return this.users.find(user => user.id === id);
    }

    /** Get a user by a filter */
    public static findBy(filter: Partial<User>) {
        const filterFunction = filterFunctionFactory(filter);
        return this.users.find(filterFunction);
    }

    private static users: User[] = [
        {
            id: 1,
            username: 'user1',
            password: 'password',
        },
        {
            id: 2,
            username: 'user2',
            password: 'password',
        },
    ];
}
