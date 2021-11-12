import express, { Express, Request, Response } from 'express';

import routeOneHandler from './handlers/routeOne'
import routeTwoHandler from './handlers/routeTwo'
import router from './handlers/routeThree'

export default async (app: Express) => {

    app.use('/api/route1', router);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}