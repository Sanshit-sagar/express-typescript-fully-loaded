import express, { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core';

import {
    createUser,
    createContact,
    createAddress,
    createHackerDetails,
    HackerDetails, BaseUser, Address, Contact
} from '../../lib/faker/user'

const router = express.Router();

// TODO: Locales

type UserExtensions = Partial<{
    hacker: HackerDetails;
    contact: Contact;
    address: Address;
}>
type SkipDictionary = Required<{ 
    [Property in keyof UserExtensions]: boolean; 
}>; 

const includeAddress = (query): boolean => query['address'] && query['address'] !== 'skip' 
const includeContact = (query): boolean => query['contact'] && query['contact'] === 'skip'
const includeHacker = (query): boolean => query['hacker'] && query['hacker'] === 'skip'

const sanitizeParams = (query): SkipDictionary => {
    const skipDict: SkipDictionary = {
        address: includeAddress(query),
        contact: includeContact(query),
        hacker: includeHacker(query)
    }
    return skipDict;
}

/*  /api/fake/user */ 
router.use(function (req: Request, res: Response, next: NextFunction) {
    console.log(`Incoming params: ${JSON.stringify(req.query)}`); 

    res.locals.user = createUser();
    res.locals.skip = sanitizeParams(req.query)
    console.log(JSON.stringify(res.locals)); 

    next(); 
});

/* /api/fake/homer  */ 
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['address']) {
        res.locals.user.address = createAddress() 
    }
    next('route');
});

/* /api/fake/phoney */
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['contact']) {
        res.locals.user.contact = createContact(res.locals.user.userName)
    }
    next(); 
});

/*  /api/fake/anon */
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.skip['hacker']) {
        res.locals.user.hacker = createHackerDetails(res.locals.user.userName) 
    }
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
