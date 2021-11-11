import { Request, Response, NextFunction } from "express";
import settings from '../lib/settings';
import cors from 'cors';

type Configuration = {
    
}

const urlsAllowedToAccess = Object.entries(settings.urls || {}).map(([key, value]) => value) || [];

export const configuration: Configuration = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || urlsAllowedToAccess.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} not permitted by CORS policy.`));
        }
    },
};

export default (req: Request, res: Response, next: NextFunction) => {
    return cors(configuration)(req, res, next);
}