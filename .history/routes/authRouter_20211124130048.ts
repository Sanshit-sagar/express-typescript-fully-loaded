import express, { Request, Response, NextFunction } from 'express'

import {
    login,
    signup,
    token,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    generatePasswordResetToken,
    resetPassword,
    sendEmail,
    settings
} from '../api/users/index'

const router = express.Router();


router.get('/:id', )