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
        super(422, 'ValidationError', 'UnprocessableEntity');
        this.errors = [...props.errors]; 
    }

    getMessages = () => this.errors.map((error: ValidationErrorItem) => error.message).join(', ')
    getMessages = () => this.errors.map((error: ValidationErrorItem) => error.message).join(', ')

    getFields = () => {
        const fieldsArr = this.errors.map((error: ValidationErrorItem) =>  
            error.path
        );

        return fieldsArr.join(', '); 
    }
}

export default ValidationError; 