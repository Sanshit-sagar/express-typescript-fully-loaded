import express, { Express, Request, Response } from 'express';
import { routeOne} from './handlers/routeOne'

export default async (app: Express) => {

    app.use('/api/route1', routeOne);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}