import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    message?: string; 
};

class Intern extends ExtendedError {
    message: string;

    constructor(props: InternalServerProps) {
        super(500, "Unknown", "InternalServerError"); 
        this.message = props.message || "Unknown"; 
    }
}

export default DuplicateKeyError;