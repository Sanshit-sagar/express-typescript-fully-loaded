import { Express } from 'express';

import routeOneHandler from './handlers/routeOne'
import routeTwoHandler from './handlers/routeTwo'
import routeThreeHandler from './handlers/routeThree'

export default async (app: Express) => {

    app.use('/api/route1', routeOneHandler);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}