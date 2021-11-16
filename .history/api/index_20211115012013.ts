import { Express, Request, Response } from 'express';
import router from './faker/index'

export default async (app: Express) => {
    app.use()
    app.use('/api/route1', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route1',
            method: req.method
        });
    });
}