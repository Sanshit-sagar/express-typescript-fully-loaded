import ExtendedError from './ExtendedError'

type ValidationErrorItem =  {
    message: string;
    path: string; 
};

export type ValidationErrorProps = {
    errors: ValidationErrorItem[];
};


class ValidationError extends ExtendedError {
    errors: ValidationErrorItem[]; 

    constructor(props: ValidationErrorProps) {
        super(422, 'Validation Error - Unprocessable Entity');
        this.errors = props.errors; 
    }
}

export default ValidationError; 


getMessages = () => this.errors.map((error: ValidationErrorItem) => 
error.message
).join(', ');

getFields = () => this.errors.map((error: ValidationErrorItem) => 
error.path
).join(', '); 