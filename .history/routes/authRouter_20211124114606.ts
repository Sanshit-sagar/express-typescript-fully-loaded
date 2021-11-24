import express, { Request, Response, NextFunction } from 'express'

import {
    login,
    signup,
    setAuthenticationCookie,
    unsetAuthenticationCookie,
    generatePasswordResetToken,
    
}

const router = express.Router();


router.get('/:id', )