import { Express, Request, Response } from 'express';


const route1Data = (req: Request) => {
    return {
        message: 'still a success!',
        path: '/api/route1',
        method: req.method
    };
};

const routeOneHandler = async (req: Request, res: Response)

export default async (app: Express) => {

    app.use('/api/route1', routeOneHandler);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}