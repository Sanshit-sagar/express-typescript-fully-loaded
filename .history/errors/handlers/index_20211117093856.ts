import { Request, Response, NextFunction } from 'express'
import duplicateKeyError from "./duplicateKeyError";
import validationError from "./validationError";

export default ((error, req: Request, res: Response, next: NextFunction) => {

    try {
        switch(error.name) {
            case 'ValidationError'
        }
    }
})