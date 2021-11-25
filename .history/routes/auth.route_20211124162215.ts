import express from 'express'

import {
    signUserUp,
    logUserIn,
    resetUserPassword,
    logUserOut
} from '../controllers/auth'

const authRouter = express.Router();

authRouter.get('/signup', signup);
authRouter.get('/login', login); 


export default authRouter; 