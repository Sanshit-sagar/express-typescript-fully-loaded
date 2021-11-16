import { Express, NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';

import jobsRouter from './jobs/index';
import usersRouter from './faker/index';

import roleRoutes from '../routes/role.route';
import userRouter from '../routes/user.route'; 

const isSetToTrue = (query): boolean => query?.save?.toString()?.toLowerCase() === 'true' ?? false

export default async (app: Express) => {

    app.use('/api', roleRouter);
    app.use('/api', userRouter); 

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
        logger.info(`Error on ${req.path}`)
        logger.error(error)

        res.status(500).send(error)  
    }); 
}