import express from 'express'

import {
    signUserUp,
    logUserIn,
    resetUserPassword,
    logUserOut
} from '../controllers/auth.controller'

const authRouter = express.Router();

authRouter.get('/signup', signup);

authRouter.get('/login', login); 


export default authRouter; 