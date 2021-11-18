import { Express, NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';

// import jobsRouter from './jobs/index';
// import fakerRouter from './faker/index';

import roleRouter from '../routes/role.route';
import userRouter from '../routes/user.route'; 
import poserRouter from '../routes/poser.route';

// const isSetToTrue = (query): boolean => query?.save?.toString()?.toLowerCase() === 'true' ?? false

import errorHandler from '../errors/handlers/index'

export default async (app: Express) => {

    app.use('/api/roles', roleRouter);
    app.use('/api/users', userRouter); 
    app.use('/api/posers', poserRouter);

    // app.use('/api/faker*', fakerRouter);

    // app.use('*', (req: Request, res: Response, next: NextFunction) => {
    //     if(!isSetToTrue(req?.query ?? null)) {
    //         res.status(200).json({ ...res.locals.user });
    //     } else {
    //         res.locals.jobType = "instantJob"; 
    //         next(); 
    //     }
    // });

    // app.use('/api/fake/user*', jobsRouter);

    app.use(async (_req: Request, res: Response, _next: NextFunction) => {
        logger.info(`fallback return handler`);

        res.status(200).json({
            ...res.locals.output
        });
    });   

    app.use(errorHandler)
}

    // app.all('/error', (req: Request, res: Response) => {
    //     if(!res.locals.isErroneous) {
    //         res.send(404).json({ message: 'Invalid path, resource not found' })
    //     }

    //     logger.info(`Custom error handler`);
    //     res.status(418).json({ message: 'Custom error handler' })
    // })

    // TODO: replace with more robust errorHandler -> npm? 
    // app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    //     logger.info(`Error on  ${req.method} ${req.path}`)
    //     logger.error(error, `Error on  ${req.method} ${req.path}`)
    
    //     res.status(404).json({ message: 'Could not understand request' })
    // }); 
// }