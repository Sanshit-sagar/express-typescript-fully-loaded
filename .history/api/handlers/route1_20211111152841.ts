import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/route1', (req: Request, res: Response) => {
    res.status(200).json({ ...route1Data(req) });
});