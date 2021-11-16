import express, { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'
import logger from '../lib/logger'

const router = express.Router

export default async (app: Express) => {
    app.use('/api/fake/user', router);

    app.use('/route1', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route1',
            method: req.method
        });
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.info(`Error on ${req.path}`)
        logger.error(error)

        res.status(500).send(error)  
    }); 
}