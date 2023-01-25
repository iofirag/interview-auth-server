import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY, MISSING_AUTHORIZATION_TOKEN } from './constants';

export const encodeJWT = (data: any) => {
    try {
        return jwt.sign(data, JWT_PRIVATE_KEY);
    } catch (error) {
        throw new Error('JWT Error');
    }
};

export const decodeJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_PRIVATE_KEY);
    } catch (error) {
        throw new Error('Bad JWT');
    }
};

export const getTokenFromRequest = (req: Request) => {
    try {
        if (!req.headers['authorization']) throw new Error(MISSING_AUTHORIZATION_TOKEN);
        return (req.headers['authorization'] as string).split(' ')[1];
    } catch (error) {
        throw new Error('Bad JWT');
    }
};

export const bearerTokenValidationMiddleware = (req, res, next) => {
    try {
        const jwtToken = req.headers['authorization'].split(' ')[1];
        const decodedJWT = decodeJWT(jwtToken);
        if (!decodedJWT) next();
        req.decodedJWT = decodedJWT;
    } catch (error) {
        throw new Error('Bad JWT');
    }
};