import { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'
import logger from '../lib/logger'
import jobs from './jobs/index'

const isSetToTrue = (query): boolean => query?.save?.toString()?.toLowerCase() === 'true' ?? false

export default async (app: Express) => {
    app.use('/api/fake/user*', router);


    app.use('*', (req: Request, res: Response, next: NextFunction) => {
        if(isSetToTrue(req?.query ?? null)) {
            res.locals.jobType = "instantJob"; 
            next(); 
        } else {
            res.status(200).json({ ...res.locals.user });
        }
    });

    app.use('/api/fake/user*', router);

    // TODO: replace with more robust errorHandler -> npm? 
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.info(`Error on ${req.path}`)
        logger.error(error)

        res.status(500).send(error)  
    }); 
}