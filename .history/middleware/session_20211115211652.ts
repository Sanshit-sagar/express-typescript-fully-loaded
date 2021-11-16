import { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo' 

export default (req: Request, res: Response, next: NextFunction) => {
    return session({
        resave: true,
        saveUninitialized: true,
        secret: settings.session.secret,
        store: new MongoStore({
            mongoUrl: MONGO_URL,
            mongoOptions: {

            }
        })
    }));
}