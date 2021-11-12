import { Express, Request, Response } from 'express';


export default async (app: Express) => {
    app.use('/api/route1', routes)
    app.get('/api/route2', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route2',
            method: req.method
        });
    });
}