import { Request, Response, NextFunction } from 'express'

export default ((error, req: Request, res: Response, next: NextFunction) => {
     let errors = Object.values(error.errors).map((el) => el.message);
     let fields = Object.values(error.errors).map((el) => el.path);
     let code = 400;


} 