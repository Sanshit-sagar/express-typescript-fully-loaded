import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    keyValue: {
        [key: string]: string
    }; 
};

class DuplicateKeyError extends ExtendedError {
    keyValue: DuplicateKeyErrorProps;

    constructor(fieldMap: DuplicateKeyErrorProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.keyValue = {
            ...fieldMap
        }; 
    }
}

export default DuplicateKeyError;