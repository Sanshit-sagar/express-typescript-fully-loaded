import { Request, Response, NextFunction } from 'express';

import catchAsync from '../lib/catchAsync'

import signup from '../api/users/signup'
import setAuthenticationCookie from "../api/users/setAuthenticationCookie";

const signUpUser = catchAsync((req: Request, res: Response, next: NextFunction) => {
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
}); 

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
}



