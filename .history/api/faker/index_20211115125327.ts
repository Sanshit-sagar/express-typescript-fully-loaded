import express, { Request, Response, NextFunction } from 'express'
import {
    createUser,
    createContact,
    createAddress,
    createHackerDetails
} from '../../lib/faker/user'

const router = express.Router();

// TODO: Locales
//TODO: check for do not include for req.params or req.query

function assignContactDetails(params): boolean {
    return params['phone'] || params['contact']
}

/*  /api/fake/user */ 
router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = createUser();
    next(); 
});

/* /api/fake/homer  */ 
router.use(function(req: Request, res: Response, next: NextFunction) {
    res.locals.user.address = createAddress() 
    next('route');
});

/* /api/fake/phoney */
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(req.locals.skip['phone'] !== true) {
        res.locals.user.contact = createContact(res.locals.user.userName)
    }
    next(); 
});

/*  /api/fake/anon */
router.use(function(req: Request, res: Response, next: NextFunction) {
    res.locals.user.hacker = createHackerDetails(res.locals.user.userName) 
    next(); 
});

router.use(function (req: Request, res: Response, next: NextFunction) {
    if(!req.query.save) {
        res.status(200).json({ ...res.locals.user  });
    } else {
        next();
    }
});

export default router; 

