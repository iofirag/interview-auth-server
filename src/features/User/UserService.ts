import { injectable, inject } from 'inversify';
import { TYPES } from '../../containerTypes';
import 'reflect-metadata';
import { MISSING_AUTHORIZATION_TOKEN, ROLE_LOWER_THAN_API_NEEDS, WRONG_CREDENTIALS } from '../../utils/constants';
import { getTokenFromRequest } from '../../utils/helpers';

@injectable()
export default class UserService {
    @inject(TYPES.UserLogic) private _handler: any;

    register(req, res) {
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            const { body } = req;
            this._handler.register(body);
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
        } finally {
            res.statusCode = logObj.isError ? 500 : 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(logObj.isError ? JSON.stringify(logObj) : JSON.stringify(''));
        }
    }

    login(req, res) {
        let result;
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            const { body } = req;
            const { username } = body;
            result = this._handler.login(body);
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
            if (error.message === WRONG_CREDENTIALS) res.statusCode = 401;
            else res.statusCode = 500;
        } finally {
            res.setHeader('Content-Type', 'application/json');
            res.end(logObj.isError ? JSON.stringify(logObj) : JSON.stringify(result));
        }
    }

    f1(req, res) {
        let result;
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            result = this._handler.f1();
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
        } finally {
            res.statusCode = logObj.isError ? 500 : 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(logObj.isError ? JSON.stringify(logObj) : JSON.stringify(result));
        }
    }

    f2(req, res) {
        let result;
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            const token = getTokenFromRequest(req);
            result = this._handler.f2(token);
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
            if (error.message === MISSING_AUTHORIZATION_TOKEN) res.statusCode = 403;
            else if (error.message === WRONG_CREDENTIALS) res.statusCode = 401;
            else res.statusCode = 500;
        } finally {
            res.setHeader('Content-Type', 'application/json');
            res.end(logObj.isError ? JSON.stringify(logObj) : JSON.stringify(result));
        }
    }

    f3(req, res) {
        let result;
        const logObj = {
            isError: false,
            msg: 'success',
        };
        try {
            const token = getTokenFromRequest(req);
            result = this._handler.f3(token);
        } catch (error) {
            logObj.isError = true;
            logObj.msg = error.message;
            if (error.message === ROLE_LOWER_THAN_API_NEEDS) res.statusCode = 401;
            else if (error.message === MISSING_AUTHORIZATION_TOKEN) res.statusCode = 403;
            else if (error.message === WRONG_CREDENTIALS) res.statusCode = 401;
            else res.statusCode = 500;
        } finally {
            res.setHeader('Content-Type', 'application/json');
            res.end(logObj.isError ? JSON.stringify(logObj) : JSON.stringify(result));
        }
    }
}
