import express, { Request, Response, NextFunction } from 'express'

import {
    login,
    signup,
    token,
    resetPasswrod,
    encryptLoginToken,
    decryptLoginToken,
    validateLoginToken,
    generateResetToken,
    getExistingUserByEmail,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    getExistingUserByEmailPassword
} from '../api/users/index'

const router = express.Router();


router.get('/:id', )