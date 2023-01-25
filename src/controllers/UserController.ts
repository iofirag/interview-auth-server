import { container } from '../containerConfig';
import { TYPES } from '../containerTypes';
import { bearerTokenValidationMiddleware } from '../utils/helpers';

const userService: any = container.get(TYPES.UserService);

export const register = userService.register.bind(userService);
export const login = userService.login.bind(userService);
export const f1 = userService.f1.bind(userService);
export const f2 = (req, res, next) => {
    bearerTokenValidationMiddleware(req, res, next);
    return userService.f2(req, res);
};
export const f3 = (req, res, next) => {
    bearerTokenValidationMiddleware(req, res, next);
    return userService.f3(req, res);
};
