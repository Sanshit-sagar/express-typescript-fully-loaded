import express, { Express, Request, Response } from 'express';

const router = express.Router();

const route1Data = (req: Request) => {
    return {
        message: 'still a success!',
        path: '/api/route1',
        method: req.method
    };
};



app.delete('/api/route2', (req: Request, res: Response) => {
    res.status(200).json({ ...route1Data(req) });
});

app.all('/api/route3', (req: Request, res: Response) => {
    res.status(200).json({ ...route1Data(req) });
})

export default async (app: Express) => {

    app.use('/api/route1', routeOneHandler);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}