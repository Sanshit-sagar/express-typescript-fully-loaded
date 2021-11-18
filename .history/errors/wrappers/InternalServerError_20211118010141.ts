import ExtendedError from './ExtendedError'

export type InternalServerProps = {
    message?: string; 
};

class InternalServerError extends ExtendedError {
    message: string;

    constructor(props: InternalServerProps) {
        super(500, "Internal Server Error"); 
        this.message = props.message || "Unknown"; 
    }
}

export default InternalServerError;