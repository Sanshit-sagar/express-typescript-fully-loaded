import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    message?: string; 
};

class DuplicateKeyError extends ExtendedError {
    message: string;

    constructor(props: InternalServerProps) {
        super(409, "", "Conflict"); 
        this.message = props.message; 
    }
}

export default DuplicateKeyError;