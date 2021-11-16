import { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'
import logger from '../lib/logger'
import jobs from './jobs/index'

export default async (app: Express) => {

    app.use('/api/fake/user*', router);

    // should run for all requests except /api/route1
    app.use('*', (req: Request, res: Response) => {
        if(req.query.save) {
            logger.info(`Saving after checking query: ${req.query.save}`);
        }
        
        res.status(200).json({ 
            ...res.locals.user  
        });
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.info(`Error on ${req.path}`)
        logger.error(error)

        res.status(500).send(error)  
    }); 
}