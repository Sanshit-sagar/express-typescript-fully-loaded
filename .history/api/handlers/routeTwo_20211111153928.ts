import express, { Request, Response } from 'express';

const routeTwoHandler = express.Router();

routeTwoHandler.post('/api/route2', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'addition was a success!',
        path: '/api/route2',
        method: req.method
    });
});

export default routeTwoHandler;