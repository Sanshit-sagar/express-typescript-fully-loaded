import ExtendedError from './ExtendedError'

export type DuplicateKeyErrorProps = {
    keyValue: {
        [key: string]: string
    }; 
};

class DuplicateKeyError extends ExtendedError {
    keyValue: {
        [key: string]: string
    };
       
    constructor(props: DuplicateKeyErrorProps) {
        super(409, "Duplicate Key Error"); 
        this.keyValue = props.keyValue;
    }
}

export default DuplicateKeyError;