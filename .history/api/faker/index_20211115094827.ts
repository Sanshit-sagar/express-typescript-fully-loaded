import express, { Request, Response, NextFunction } from 'express'
import {
    createUser,
    createAddress,
    createHackerDetails
} from '../../lib/faker/user'

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = createUser();
    next(); 
});

/* /api/fake/{homer/homey}  */
router.get('/homer', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = { 
        ...res.locals.user, 
        ...createAddress() 
    };
    next();
});

/*  /api/fake/{anonymous/v} */
router.get('/anon', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = { 
        ...res.locals.user, 
        ...createHackerDetails() 
    };
    next(); 
});

router.use(function (req: Request, res: Response) {
    res.status(200).json({
        ...res.locals.user 
    });
});

export default router; 
