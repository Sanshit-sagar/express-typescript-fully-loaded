import { Express, Request, Response } from 'express';


const route1Data = (req: Request) => {
    return {
        message: 'still a success!',
        path: '/api/route1',
        method: req.method
    };
};

export default async (app: Express) => {
    app.get('/api/route1', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    });
    
    app.delete('/api/route2', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    });

    app.all('/api/route3', (req: Request, res: Response) => {
        res.status(200).json({ ...route1Data(req) });
    })
}