import express, { Express, Request, Response } from 'express';
import 

export default async (app: Express) => {

    app.use('/api/route1', routeOneHandler);
    app.use('/api/route2', routeTwoHandler);
    app.use('/api/route3', routeThreeHandler);
}