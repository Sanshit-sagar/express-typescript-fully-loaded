import ExtendedError from './ExtendedError'

type DuplicateKeyValueItem =  {
    [key: string]: string
};

export type DuplicateKeyErrorProps = {
    keyValue:
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