import express, { Express, Request, Response, NextFunction} from 'express';
import logger from '../../lib/logger'
import dayjs from 'dayjs'


const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method.toUpperCase()} ${req.path} @ ${getDatetime()}`  )
})