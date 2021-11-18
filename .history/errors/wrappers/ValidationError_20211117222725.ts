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

    getMessages = () => {
        const messageArr = this.errors.map((error: ValidationErrorItem) => {
            return error.message; 
        });
        return messageArr.join(', ');
    }

    getFields = () => {
        const fieldsArr = this.errors.map((error: ValidationErrorItem) =>  error.path;
        });
        return fieldsArr.join(', '); 
    }
}

export default ValidationError; 