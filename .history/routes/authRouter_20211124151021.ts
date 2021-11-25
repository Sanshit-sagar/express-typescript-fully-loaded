import express from 'express'

import signup from '../api/users/signup';
import login from '../api/users/login';

const router = express.Router();


router.get('/signup', signup);

router.get('/login', login); 