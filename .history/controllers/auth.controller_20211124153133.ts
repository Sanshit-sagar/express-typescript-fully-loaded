import { Request, Response, NextFunction } from 'express';

import catchAsync from '../lib/catchAsync'

import signup from '../api/users/signup';
import login from '../api/users/login';
import setAuthenticationCookie from "../api/users/setAuthenticationCookie";

const signUserUp = catchAsync((req: Request, res: Response) => {
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

const logUserIn = catchAsync((req: Request, res: Response) => {
    const { email, password } = req.body;

    return login({
        email, password
    }).then(({ user, token, tokenExpiresAt }) => {
        setAuthenticationCookie(res, {
            token,
            tokenExpiresAt
        }); 
        return user; 
    });
}); 

const recoverUserPassword = catchAsync((req: Request, res: Response) => {

});

const resetUserPassword = catchAsync((req: Request, res: Response) => {

}); 

const logUserOut = catchAsync((req: Request, res: Response) => {

})

export {
    signUserUp,
    logUserIn,
    recoverUserPassword,
    resetUserPassword,
    logUserOut
};

