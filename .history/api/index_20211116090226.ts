import { Express, NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';

import jobsRouter from './jobs/index';
import usersRouter from './faker/index';

import roleRouter from '../routes/role.route';
import userRouter from '../routes/user.route'; 

const isSetToTrue = (query): boolean => query?.save?.toString()?.toLowerCase() === 'true' ?? false

export default async (app: Express) => {

    app.use('/api/roles', roleRouter);
    app.use('/api/users', userRouter); 

    app.use('/api/fake/user*', usersRouter);

    app.use('*', (req: Request, res: Response, next: NextFunction) => {

        if(!isSetToTrue(req?.query ?? null)) {
            res.status(200).json({ ...res.locals.user });
        } else {
            res.locals.jobType = "instantJob"; 
            next(); 
        }
    });

    app.use('/api/fake/user*', jobsRouter);

    app.use(async (_req: Request, res: Response, _next: NextFunction) => {
        logger.info(`fallback return handler`);

        res.status(200).json({
            message: 'Success',
            data: { ...res.locals.user },
            saved: res.locals.save
        });
    });

    // TODO: replace with more robust errorHandler -> npm? 
    app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
        logger.info(`Error on  ${req.method} ${req.path}`)
        logger.error(error, `Error on  ${req.method} ${req.path}`)

        switch(error?.type) {
            case 'redirect':
                res.redirect('/error');
            case 'time-out':
                res.status(408).json({ message: 'Request timed out while waiting for response' });
            case 'conflict':
                res.status(409).json({ message: 'The provided details are in conflict with those of an existing resource'})
            case 'invalid-params':
                res.status(422).json({ message: 'Invalid params '})
        
        }

        res.status(500).send(error)  
    }); 
}