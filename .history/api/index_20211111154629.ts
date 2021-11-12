import { Express, Request, Response } from 'express';
const routes = require('./handlers/routeOne')
// import routeOneHandler from './handlers/routeOne'
// import routeTwoHandler from './handlers/routeTwo'
// import routeThreeHandler from './handlers/routeThree'

export default async (app: Express) => {
    app.get('/api/route1', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route1',
            method: req.method
        });
    });
}