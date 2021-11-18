import ExtendedError from './ExtendedError'

export type ValidationErrorProps = {
    message: string;
    path: string; 
}[];


class ValidationError extends ExtendedError {
    errors: ValidationErrorProps; 

    constructor(errors: ValidationErrorProps) {
        super(422, 'ValidationError', 'UnprocessableEntity');
        this.errors = [...errors]; 
    }

    getMessages = () => {
        const messageArr = this.errors.map((error: { message: string; path: string; }) => {
            return error.message; 
        });
    }

    get
}

export default ValidationError; 