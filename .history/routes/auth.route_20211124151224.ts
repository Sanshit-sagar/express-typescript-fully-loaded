import express from 'express'

import signup from '../api/users/signup';
import login from '../api/users/login';

const authRouter = express.Router();



authRouter.get('/signup', signup);

authRouter.get('/login', login); 



export default authRouter; 