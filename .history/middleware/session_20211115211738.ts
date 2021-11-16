import { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo' 
import settings from '../../lib/settings'

export default (req: Request, res: Response, next: NextFunction) => {
    return session({
        resave: true,
        saveUninitialized: true,
        secret: settings.session.secret,
        store: new MongoStore({
            mongoUrl: settings.databases.mongodb.uri,
            mongoOptions: {

            }
        })
    });
    nex
}