import { Request,  NextFunction } from "express";


export const configuration = {
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