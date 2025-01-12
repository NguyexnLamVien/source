import { DataStoredInToken } from './../../modules/auth/auth.interface';
import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as DataStoredInToken;
        if (!req.user) {
            req.user = {id: ''};
        }
        req.user.id = user.id;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });    
    }
};

export default authMiddleware