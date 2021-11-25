import { Express } from 'express';

import roleRouter from '../routes/role.route';
import userRouter from '../routes/user.route'; 
import poserRouter from '../routes/poser.route';
import authRouter from '../routes/auth.route'; 


export default async (app: Express) => {
    app.use('/api/v1/auth', authRouter); 
    app.use('/api/v1/roles', roleRouter);
    app.use('/api/v1/users', userRouter); 
    app.use('/api/v1/posers', poserRouter);

};