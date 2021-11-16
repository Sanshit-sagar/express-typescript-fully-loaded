import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';
import {
    createUser,
    createAddress,
    createHackerDetails
} from '../../lib/faker/user'

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = getUser();
    next(); 
});

router.get('/homeowner', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = { 
        ...res.locals.user, 
        ...createAddress() 
    };
    next();
});

router.get('/hacker', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = { 
        ...res.locals.user, 
        ...getHackerDetails() 
    };
    next(); 
});

router.use(function (req: Request, res: Response) {
    res.status(200).json({
        ...res.locals.user 
    });
});

export default router; 
