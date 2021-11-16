import { Request, Response, NextFunction} from 'express'
import passportLocal from "passport-local";
import passport from "passport";
import { find } from "lodash"; 

import { User, UserDocument } from '../models/Users'
import { NativeError } from 'mongoose'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((req: Request, user: UserDocument, done) => {
    done(undefined, user); 
}); 

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user)); 
}); 

passport.use(new LocalStrategy({ 
    usernameField: "email" 
}, (email, password, done) => {
    
    User.findOne({ 
        email: email.toLowerCase() 
    }, (err: NativeError, user: UserDocument) => {

        if(err) return done(err);

        if(!user) {
            return done(undefined, false, { 
                message: `Email ${email} not found.` 
            });
        }

        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if(err)  return done(err); 
            if(isMatch) return done(undefined, user); 
            return done(undefined, false, {
                message: 'Invalid email or password'
            }); 
        });
    });
}));

/**
 * Login Required middleware.
 */
 export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    const user = req.user as UserDocument;

    if (find(user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};