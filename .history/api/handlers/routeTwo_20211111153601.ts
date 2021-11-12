import express, { Request, Response } from 'express';

const routeThreeHandler = express.Router();

router.get('/api/route2', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'still a success!',
        path: '/api/route2',
        method: req.method
    });
});

module.exports = router;