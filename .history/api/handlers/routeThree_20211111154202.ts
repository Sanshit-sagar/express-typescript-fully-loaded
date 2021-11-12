import express, { Request, Response } from 'express';

const routeThreeHandler = express.Router();

routeThreeHandler.all('/api/route3', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'mutation was a success!',
        path: '/api/route3',
        method: req.method
    });
});

export default routeThreeHandler