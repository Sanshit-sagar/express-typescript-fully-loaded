import { Request, Response } from 'express';


import login from '../api/users/login';
import signup from '../api/users/signup';
import resetPassword from '../api/users/resetPassword';
import setAuthenticationCookie from "../api/users/setAuthenticationCookie";
import unsetAuthenticationCookie from 'api/users/unsetAuthenticationCookie';

import catchAsync from '../lib/catchAsync'

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

    return resetPassword({
        ...req.body
    }).then(({ user, token, tokenExpiresAt }) => {
        setAuthenticationCookie(res, {
            token,
            tokenExpiresAt
        });
        return true; 
    })

}); 

const logUserOut = catchAsync((req: Request, res: Response) => {
    return unsetAuthenticationCookie(res); 
})

export {
    signUserUp,
    logUserIn,
    recoverUserPassword,
    resetUserPassword,
    logUserOut
};

