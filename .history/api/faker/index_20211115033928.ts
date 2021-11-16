import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';
import {
    getUser,
    getAddress,
    getHackerDetails
} from '../../lib/faker/user'

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = getUser();
    next(); 
});

router.get('/homeowner', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = { 
        ...res.locals.user, 
        ...getAddress() 
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
        user: {
            ...res.locals.user
        },
        date: 
    })
});

export default router; 
