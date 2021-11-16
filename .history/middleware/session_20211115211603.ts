import { Request, Response, NextFunction } from 'express'
import session from 'session'

export default (req: Request, res: Response, next: NextFunction) => {
    app.use(session({
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