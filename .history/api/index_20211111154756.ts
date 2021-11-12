import { Express, Request, Response } from 'express';

const routes = require('./handlers/routeOne');
// import routeOneHandler from './handlers/routeOne'
// import routeTwoHandler from './handlers/routeTwo'
// import routeThreeHandler from './handlers/routeThree'

export default async (app: Express) => {
    app.use(routes)
    app.get('/api/route2', (req: Request, res: Response) => {
        res.status(200).json({
            message: 'retreival was a success!',
            path: '/api/route2',
            method: req.method
        });
    });
}