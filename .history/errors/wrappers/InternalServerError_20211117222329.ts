import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    message?: string; 
};

class DuplicateKeyError extends ExtendedError {
    message: string;

    constructor(props: InternalServerProps) {
        super(409, "DuplicateKeyError", "Conflict"); 
        this.message = {
            ...fieldMap
        }; 
    }
}

export default DuplicateKeyError;