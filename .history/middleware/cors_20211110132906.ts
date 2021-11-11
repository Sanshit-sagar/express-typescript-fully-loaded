import { Request, Response, NextFunction } from "express";
import settings from '../lib/settings';
import cors from 'cors';

type Configuration = {
    credentials: boolean;
    origin: (origin: any, callback: any) => void; 
}

const urlsAllowedToAccess = Object.entries(settings.urls || {}).map(([key, value]) => value) || [];

export const configuration: Configuration = {
    credentials: true,
    origin: function (origin: any, callback:) {
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