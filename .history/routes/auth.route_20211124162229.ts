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


export default authRouter; 