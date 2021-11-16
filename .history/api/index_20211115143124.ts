import { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'
import logger from '../lib/logger'
import jobs from './jobs/index'

const isSetToTrue = (query): boolean => query?.save?.toString()?.toLowerCase() === 'true' ?? false

export default async (app: Express) => {

    jobs(app); 

    app.use('/api/fake/user*', router);

    // should run for all requests except /api/route1
    app.use('*', (req: Request, res: Response) => {
        if(isSetToTrue(req?.query ?? null)) {
            logger.info(`Saving ${JSON.stringify(res.locals.user)}`);
            res.redirect('/api/jobs');
        } else {
        
        res.status(200).json({  ...res.locals.user });
    });

    // TODO: replace with more robust errorHandler -> npm? 
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.info(`Error on ${req.path}`)
        logger.error(error)

        res.status(500).send(error)  
    }); 
}