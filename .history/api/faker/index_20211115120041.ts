import express, { Request, Response, NextFunction } from 'express'
import {
    createUser,
    createContact,
    createAddress,
    createHackerDetails
} from '../../lib/faker/user'

const router = express.Router();

/* /api/fake/
doe/{joe/jane/xxx} */
router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = createUser();
    next(); 
});

/* /api/fake/{homer/homey}  */
router.get('/homer', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user.address = createAddress() 
    next();
});

/* /api/fake/{phoney} */
router.get('/phoney', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user.contact = createContact(res.locals.user.userName)
    next(); 
});

/*  /api/fake/{anon/v} */
router.get('/anon', (req: Request, res: Response, next: NextFunction) => {
    res.locals.user.hacker = createHackerDetails(res.locals.user.userName) 
    next(); 
});

router.use(function (req: Request, res: Response) {
    res.status(200).json({
        ...res.locals.user 
    });
});

export default router; 

