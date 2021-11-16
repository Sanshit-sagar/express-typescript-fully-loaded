import { NativeError } from 'mongoose'


export class BadRequestError extends Error {
    constructor(error) {
        super(error.message);
    
        this.data = { error };
        this.statusCode = 400;
    }
}


// app.use(function handleAssertionError(error, req, res, next) {
//     if (error instanceof AssertionError) {
//       return res.status(400).json({
//         type: 'AssertionError',
//         message: error.message
//       });
//     }
//     next(error);
//   });
  
//   app.use(function handleDatabaseError(error, req, res, next) {
//     if (error instanceof MongoError) {
//       return res.status(503).json({
//         type: 'MongoError',
//         message: error.message
//       });
//     }
//     next(error);
//   });