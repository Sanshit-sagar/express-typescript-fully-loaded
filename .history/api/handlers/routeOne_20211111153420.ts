import express, { Request, Response } from 'express';

const routeOneHandler = express.Router();

routeOneHandler.get('/api/route1', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'still a success!',
        path: '/api/route1',
        method: req.method
    });
});

module.exports = routeOneHandler;