import express from 'express'

import {
    signUserUp,
    logUserIn,
    resetUserPassword,
    logUserOut
}

const authRouter = express.Router();

authRouter.get('/signup', signup);
authRouter.get('/login', login); 


export default authRouter; 