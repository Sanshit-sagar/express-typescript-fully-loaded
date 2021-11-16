


type HttpErrorCode = `${'1' | '2' | '3' | '4' | '5'}${'0' | '1' | '2'}${HttpErrorSuffix}`;


const ErrorCategories = {
    '100': { 
        'cateogry': '', 
        'validCodes': [], 
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
        'validCodes': [], 
        'cause': '',
        'defaultHandler': 
    },
    '500': { 
        'cateogry': '', 
        'validCodes': [], 
        'cause': '',
        'defaultHandler': 
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