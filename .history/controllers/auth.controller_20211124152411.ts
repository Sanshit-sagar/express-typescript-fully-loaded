import express, { Request, Response, NextFunction } from 'express';
import { User, UserDocument } from '../models/user.model'

import signup from '../api/users/signup'
import setAuthenticationCookie from "../api/users/setAuthenticationCookie";

const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; 

    return signup({
        email, password
    }).then(({ user, token, tokenExpiresAt }) => {
        setAuthenticationCookie(res, {
            token,
            tokenExpiresAt
        }); 
        return user; 
    });
}

const 



