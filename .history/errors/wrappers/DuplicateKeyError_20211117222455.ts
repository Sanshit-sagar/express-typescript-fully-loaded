import ExtendedError from './ExtendedError'

export type DuplicateKeyErrorProps = {
    keyValue: {
        [key: string]: string
    }; 
};

class DuplicateKeyError extends ExtendedError {
    keyValue: {
        [key: string]: string
    };

    constructor(fieldMap: DuplicateKeyErrorProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.keyValue = props
    }
}

export default DuplicateKeyError;