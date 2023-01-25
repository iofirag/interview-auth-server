import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../containerTypes';
import { ROLE_LOWER_THAN_API_NEEDS, WRONG_CREDENTIALS } from '../../utils/constants';
import { encodeJWT } from '../../utils/helpers';

@injectable()
export default class UserLogic {
    @inject(TYPES.UserData) private _archive: any;

    register(data: { username: string; password: string; role: number }) {
        try {
            const { username, password, role } = data;
            if (this._archive.getUser(username)) throw new Error(`User Exist`);
            this._archive.addUser(username, password, role);
        } catch (error) {
            throw error;
        }
    }

    login(data: { username: string; password: string }) {
        try {
            const { username, password } = data;
            const userObj = this._archive.getUser(username);
            if (userObj.password !== password) throw new Error(WRONG_CREDENTIALS);
            return encodeJWT({ username, role: userObj.role })
        } catch (error) {
            throw error;
        }
    }

    f1() {
        try {
            return this._archive.getPublicData();
        } catch (error) {
            throw error;
        }
    }

    f2() {
        try {
            return this._archive.getPrivateData();
        } catch (error) {
            throw error
        }
    }

    f3(decodedJWT) {
        try {
            if (decodedJWT.role < 5) throw new Error(ROLE_LOWER_THAN_API_NEEDS);
            return this._archive.getPrivateRoledData();
        } catch (error) {
            throw error;
        }
    }
}
