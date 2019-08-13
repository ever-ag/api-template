import UserModel from '../models/User';

export default class UserService {
    public static findByUsername(username: string) {
        return UserModel.findBy({ username });
    }
}
