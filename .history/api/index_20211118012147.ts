import { Express, NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';

import roleRouter from '../routes/role.route';
import userRouter from '../routes/user.route'; 
import poserRouter from '../routes/poser.route';

import errorHandler from '../errors/handlers/index'

export default async (app: Express) => {

    app.use('/api/roles', roleRouter);
    app.use('/api/users', userRouter); 
    app.use('/api/posers', poserRouter);

    app.use(errorHandler)
};