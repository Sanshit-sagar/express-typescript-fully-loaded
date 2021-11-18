import ExtendedError from './'

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
}