import ExtendedError from './ExtendedError'

type DuplicateKeyValueItem =  {
    [key: string]: string
};

export type DuplicateKeyErrorProps = {
    keyValue: DuplicateKeyValueItem[]; 
};

class DuplicateKeyError extends ExtendedError {
    keyValue: DuplicateKeyValueItem[] | []; 
       
    constructor(props: DuplicateKeyErrorProps) {
        super(409, "Duplicate Key Error"); 
        this.keyValue = props?.keyValue || [];
    }
}

export default DuplicateKeyError;