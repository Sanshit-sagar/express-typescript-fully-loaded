import express, { Request, Response, NextFunction } from 'express';
import logger from '../../lib/logger';


const SLUG_DELIMITTERS = /[_,-,.]/;

const timestamp = (): string => dayjs().format('DD/MM/YYYY HH:mm:ss');

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${timestamp()}`);
    res.locals.user = getUser();
    next(); 
});

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
});

router.get('/homeowner', (req: Request, res: Response, next: NextFunction) => {
    res.locals.address = getAddress();
    res.status(200).json(res.locals);
});

router.get('/hacker', (req: Request, res: Response) => {
    res.locals.hacker = getHackerDetails();
    res.status(200).json(res.locals);
});

export default router; 

