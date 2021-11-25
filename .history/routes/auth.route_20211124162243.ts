import resetPassword from 'api/users/resetPassword';
import express from 'express'

import {
    signUserUp,
    logUserIn,
    resetUserPassword,
    logUserOut
} from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.get('/signup', signUserUp);

authRouter.get('/login', logUserIn); 

authRouter.get('/reset', resetUserPassword)


export default authRouter; 