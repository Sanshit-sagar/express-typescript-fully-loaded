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

const includeAddress = (params: ParamsDictionary): boolean => params['address'] && params['address'] !== 'skip' 
const includesContact = (params: ParamsDictionary): boolean => params['contact'] && params['contact'] !== 'skip'
const includesHacker = (params: ParamsDictionary): boolean => params['hacker'] && params['hacker'] !== 'skip'

const sanitizeParams = (params: ParamsDictionary): SkipDictionary => {
    const skipDict: SkipDictionary = {
        address: includeAddress(params),
        contact: includeContact(params),
        hacker: includeHacker(params)
    }
    return skipDict;
}

/*  /api/fake/user */ 
router.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = createUser();
    res.locals.skip = sanitizeParams(req.params)
    next(); 
});

/* /api/fake/homer  */ 
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(res.locals.skip['address'] !== true) {
        res.locals.user.address = createAddress() 
    }
    next('route');
});

/* /api/fake/phoney */
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(res.locals.skip['contact'] !== true) {
        res.locals.user.contact = createContact(res.locals.user.userName)
    }
    next(); 
});

/*  /api/fake/anon */
router.use(function(req: Request, res: Response, next: NextFunction) {
    if(res.locals.skip['hacker'] !== true) {
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

