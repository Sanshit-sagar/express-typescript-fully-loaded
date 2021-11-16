import { NativeError } from 'mongoose'


type HttpErrorCode = (
    `${'1' | '2' | '3' | '4' | '5'}${'0' | '1' | '2'}${ '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}`
);
type Error = '100' | '200' | '300' | '400' | '500'; 


const ErrorCategories = {
    '100': { 
        'cateogry': '', 
        'validCodes': [
            
        ], 
        'cause': '',
        'defaultHandler': 
    },
    '200': { 
        'cateogry': '', 
        'validCodes': [], 
        'cause': '',
        'defaultHandler': 
    },
    '300': { 
        'cateogry': '', 
        'validCodes': [], 
        'cause': '',
        'defaultHandler': 
    },
    '400': { 
        'cateogry': '', 
        'validCodes': {
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '409': 'Conflict',
            '418': 'I am a teapot' 
        }, 
        'cause': '',
    },
    '500': { 
        'cateogry': '', 
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