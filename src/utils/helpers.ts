import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY, MISSING_AUTHORIZATION_TOKEN } from './constants';

export const encodeJWT = (data: any) => {
    try {
        return jwt.sign(data, JWT_PRIVATE_KEY);
    } catch (error) {
        throw new Error('JWT Error');
    }
}

export const decodeJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_PRIVATE_KEY);
    } catch (error) {
        throw new Error('Bad JWT');
    }
}

export const getTokenFromRequest = (req: Request) => {
    try {
        if (!req.headers['authorization']) throw new Error(MISSING_AUTHORIZATION_TOKEN)
        return (req.headers['authorization'] as string).split(' ')[1];
    } catch (error) {
        throw new Error('Bad JWT');
    }
}

export const validateBearerToken = (bearerToken: string) => {
    try {
        console.log('validateBearerToken')
        const jwtToken = bearerToken.split(' ')[1]
        return jwt.verify(jwtToken, JWT_PRIVATE_KEY);
    } catch (error) {
        throw new Error('Bad JWT');
    }
}