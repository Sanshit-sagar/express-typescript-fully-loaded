import { Express, Request, Response } from 'express';

export default async (app: Express) => {
    app.get('/api/route1', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    });
    
    app.delete('/api/route1', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    });

    app.all('/api/route2', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    })
}