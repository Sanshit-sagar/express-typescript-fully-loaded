import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    message?: string; 
};

class DuplicateKeyError extends ExtendedError {
    message: string;

    constructor(message: DuplicateKeyErrorProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.keyValue = {
            ...fieldMap
        }; 
    }
}

export default DuplicateKeyError;