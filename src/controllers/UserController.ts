import { container } from '../containerConfig';
import { TYPES } from '../containerTypes';

const userService: any = container.get(TYPES.UserService);

export const register = userService.register.bind(userService);
export const login = userService.login.bind(userService);
export const f1 = userService.f1.bind(userService);
export const f2 = userService.f2.bind(userService);
export const f3 = userService.f3.bind(userService);
