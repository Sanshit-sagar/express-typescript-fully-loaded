import { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'
import logger from '../'

export default async (app: Express) => {
    app.use('/fake/user', router);

    app.use('/route1', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route1',
            method: req.method
        });
    });

    app.use((error: (status, err) => void, req: Request, res: Response, next: NextFunction) => {
        console.log(`Error on ${req.path}`)
        console.error('Error: ', error)

        res.status(500).send(error)  
    }); 
}