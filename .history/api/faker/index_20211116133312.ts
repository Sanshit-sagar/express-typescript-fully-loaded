import express, { Request, Response, NextFunction } from 'express'

import {
    createUser,
    createContact,
    createAddress,
    createHackerDetails
} from '../../lib/faker/user'

import {
    SkipDictionary
} from './types'

const posersRouter = express.Router();

// TODO: Locales
// TODO: use query(sanitizeParams) in default pre middleware below

const shouldSkip = (query, prop: string): boolean => query[prop] && query[prop] === 'skip' 

const sanitizeParams = (query): SkipDictionary => {
    const skipDict: SkipDictionary = {
        address: shouldSkip(query, 'address'),
        contact: shouldSkip(query, 'contact'),
        hacker: shouldSkip(query, 'hacker')
    }
    return skipDict;
}

/*  /api/fake/user */ 
posersRouter.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('inside /api/fake')
    res.locals.user = createUser();
    res.locals.skip = sanitizeParams(req.query)
    res.locals.size
    next(); 
});

/* /api/fake/homer  */ 
posersRouter.use(function(_req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['address']) {
        res.locals.user.address = createAddress() 
    }
    next('route');
});

/* /api/fake/phoney */
posersRouter.use(function(_req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['contact']) {
        res.locals.user.contact = createContact(res.locals.user.userName)
    }
    next(); 
});

/*  /api/fake/anon */
posersRouter.use(function(_req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['hacker']) {
        res.locals.user.hacker = createHackerDetails(res.locals.user.userName) 
    }
    next(); 
});

posersRouter.use(function (req: Request, res: Response, next: NextFunction) {
    if(!req.query.save) {
        res.status(200).json({ ...res.locals.user  });
    } else {
        next();
    }
});

export default posersRouter; 

