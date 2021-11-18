import ExtendedError from './ExtendedError'

export type ValidationErrorProps = {
    errors: Va[];
};


class ValidationError extends ExtendedError {
    errors: ValidationErrorProps; 

    constructor(props: ValidationErrorProps) {
        super(422, 'ValidationError', 'UnprocessableEntity');
        this.errors = [...props.errors]; 
    }

    getMessages = () => {
        const messageArr = this.errors.map((error: { message: string; path: string; }) => {
            return error.message; 
        });
        return messageArr.join(', ');
    }

    getFields = () => {
        const fieldsArr = this.errors.map((error: { message: string; path: string; }) => {
            return error.path;
        });
        return fieldsArr.join(', '); 
    }
}

export default ValidationError; 