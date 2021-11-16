import { NativeError } from 'mongoose'


const ErrorCategories = {
    '100': { 
        'cateogry': '', 
        'validCodes': {

        },
        'cause': ''
    },
    '200': { 
        'cateogry': '', 
        'validCodes': {}, 
        'cause': ''
    },
    '300': { 
        'cateogry': '', 
        'validCodes': {}, 
        'cause': ''
    },
    '400': { 
        'cateogry': 'Client Errors', 
        'validCodes': {
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '409': 'Conflict',
            '418': 'I am a teapot' 
        }, 
        'cause': ''
    },
    '500': { 
        'cateogry': 'Server Errors',
        'validCodes': {
            '500': 'Internal Server Error',
        }, 
        'cause': ''
    }
}; 

class ExtendedError extends Error {
    constructor(type, resource_id, content, code: HttpErrorCode) {
        super();
        this.name = this.constructor.name; 

        this.message = errorDetails[code];
        this.statusCode = code; 
    }
}

export default CharacterCountExceeded

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