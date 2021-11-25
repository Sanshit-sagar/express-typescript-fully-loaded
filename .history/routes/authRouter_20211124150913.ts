import express, { Request, Response, NextFunction } from 'express'

import signup from '../api/users/index'

const router = express.Router();


router.get('/signup', signup);