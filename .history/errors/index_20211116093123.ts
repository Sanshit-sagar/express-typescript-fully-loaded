

type ClientErrorPrefix = `4`;
type ServerErrorPrefix = `5`;
type HttpErrorPrefix = ClientErrorPrefix | ServerErrorPrefix
type HttpErrorSuffix = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type HttpErrorCode = `${HttpErrorPrefix}${'0' | '1' | '2'}${HttpErrorSuffix}`;

type ErrorType = ''

const ErrorCategories = {
    '100': {},
    '200': {},
    '300': {},
    '400': {},
    '500': {},
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