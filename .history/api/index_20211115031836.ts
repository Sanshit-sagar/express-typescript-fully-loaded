import { Express, NextFunction, Request, Response } from 'express';
import router from './faker/index'

export default async (app: Express) => {
    app.use('/fakes', router);

    app.use('/route1', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route1',
            method: req.method
        });
    });


    app.use((error: (status, err) => void, req: Request, res: Response, next: NextFunction) => {
        console.log(`Error Handling Middleware called from ${req.path}`)
        console.error('Error: ', error)

      
        res.status(500).send(error)
        
    })
}