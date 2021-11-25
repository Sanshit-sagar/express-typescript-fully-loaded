import express, { Request, Response, NextFunction } from 'express'

import signup from '../api/users/signup'

const router = express.Router();


router.get('/signup', signup);